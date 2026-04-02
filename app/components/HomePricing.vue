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
      <div v-else-if="!packages?.length" class="text-center my-12 text-slate-500">
        Belum ada paket tersedia.
      </div>
      
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
        <!-- Loop data paket -->
        <div 
          v-for="(pkg, index) in packages" 
          :key="pkg.id"
          class="bg-white rounded-2xl p-8 shadow-sm relative transition-all duration-300"
          :class="[
            index === 1 ? 'border-2 border-primary shadow-xl shadow-primary/10 transform md:-translate-y-4 z-10' : 'border border-slate-200 hover:shadow-md'
          ]"
        >
          <div v-if="index === 1" class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg">Most Chosen</div>
          
          <h3 class="text-xl font-bold mb-2" :class="index === 1 ? 'text-primary' : 'text-slate-900'">{{ pkg.name }}</h3>
          
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-4xl font-extrabold text-slate-900">{{ pkg.price_label || formatRupiah(pkg.price) }}</span>
            <span class="text-slate-500 font-medium">{{ pkg.unit }}</span>
          </div>
          
          <p v-if="pkg.special_treatment" class="text-sm mb-6 font-medium inline-block px-3 py-1 rounded-lg" :class="index === 1 ? 'text-primary bg-primary/10 font-bold' : 'text-slate-500 bg-slate-100'">
            {{ pkg.special_treatment }}
          </p>
          
          <ul class="space-y-4 mb-8">
            <li v-for="(benefit, j) in pkg.benefits" :key="j" class="flex items-center gap-3 text-slate-600 text-sm" :class="{'font-medium': index === 1}">
              <span class="material-symbols-outlined text-lg" :class="index === 1 ? 'text-primary' : 'text-green-500'">check_circle</span> 
              {{ benefit }}
            </li>
          </ul>
          
          <a :href="whatsappLink" class="block w-full text-center py-3 rounded-xl font-bold transition-colors"
            :class="index === 1 ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25' : 'border border-slate-200 text-slate-900 hover:bg-slate-50'">
            Pilih {{ pkg.name }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLandingData } from '~/composables/useLandingData'

const { data: packages, pending } = useApi<any[]>('/packages')
const { whatsappLink } = useLandingData()

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}
</script>
