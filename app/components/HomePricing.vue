<template>
  <section class="py-24 px-6 bg-soft-violet/30 relative" id="pricing">
    <div class="max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Paket Laundry Pilihan</h2>
        <p class="text-slate-600 text-lg">Pilih paket yang sesuai dengan kebutuhan dan urgency kamu.</p>
      </div>

      <div v-if="pending" class="flex justify-center my-12 text-slate-400">
        Memuat paket...
      </div>
      
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
        <!-- Loop data paket -->
        <div 
          v-for="(pkg, index) in displayPackages" 
          :key="pkg.id"
          class="bg-white rounded-2xl p-8 shadow-sm relative transition-all duration-300"
          :class="[
            pkg.is_most_chosen ? 'border-2 border-primary shadow-xl shadow-primary/10 transform md:-translate-y-4 z-10' : 'border border-slate-200 hover:shadow-md'
          ]"
        >
          <div v-if="pkg.is_most_chosen" class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg">Most Chosen</div>
          
          <h3 class="text-xl font-bold mb-2" :class="pkg.is_most_chosen ? 'text-primary' : 'text-slate-900'">{{ pkg.name }}</h3>
          
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-4xl font-extrabold text-slate-900">{{ pkg.price_label || formatRupiah(pkg.price) }}</span>
            <span class="text-slate-500 font-medium">{{ pkg.unit }}</span>
          </div>
          
          <p v-if="pkg.special_treatment" class="text-sm mb-6 font-medium inline-block px-3 py-1 rounded-lg" :class="pkg.is_most_chosen ? 'text-primary bg-primary/10 font-bold' : 'text-slate-500 bg-slate-100'">
            {{ pkg.special_treatment }}
          </p>
          
          <ul class="space-y-4 mb-8">
            <li v-for="(benefit, j) in pkg.benefits" :key="j" class="flex items-center gap-3 text-slate-600 text-sm" :class="{'font-medium': pkg.is_most_chosen}">
              <span class="material-symbols-outlined text-lg" :class="pkg.is_most_chosen ? 'text-primary' : 'text-green-500'">check_circle</span> 
              {{ benefit }}
            </li>
          </ul>
          
          <a :href="whatsappLink" class="block w-full text-center py-3 rounded-xl font-bold transition-colors"
            :class="pkg.is_most_chosen ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25' : 'border border-slate-200 text-slate-900 hover:bg-slate-50'">
            Pilih {{ pkg.name }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLandingData } from '~/composables/useLandingData'

const { data: packages, pending } = useApi<any[]>('/packages')
const { whatsappLink } = useLandingData()

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}

const defaultPackages = [
  {
    id: 'default-1',
    name: 'Reguler',
    price: 8000,
    price_label: 'Rp8.000',
    unit: '/ kg',
    special_treatment: 'Cuci & Setrika',
    benefits: [
      'Selesai 2 - 3 Hari',
      'Pakaian dicuci terpisah',
      'Disetrika rapi & pewangi'
    ]
  },
  {
    id: 'default-2',
    name: 'Express',
    price: 15000,
    price_label: 'Rp15.000',
    unit: '/ kg',
    special_treatment: 'Prioritas Utama',
    is_most_chosen: true,
    benefits: [
      'Selesai 24 Jam',
      'Pakaian dicuci terpisah',
      'Gratis jemput jemput & antar'
    ]
  },
  {
    id: 'default-3',
    name: 'Satuan',
    price: 25000,
    price_label: 'Mulai Rp25.000',
    unit: '/ pcs',
    special_treatment: 'Perawatan Khusus',
    benefits: [
      'Selesai 2 - 3 Hari',
      'Penanganan khusus per item',
      'Cocok untuk jas, kebaya, sepatu'
    ]
  }
]

const displayPackages = computed(() => {
  if (packages.value && packages.value.length > 0) {
    return packages.value
  }
  return defaultPackages
})
</script>