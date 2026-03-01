<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

// Gunakan useApi untuk fetching data List dengan SSR & Reactivity support
const { data: packages, pending: isLoading, refresh: refreshPackages } = await useApi('/api/packages')

const showModal = ref(false)
const isSubmitting = ref(false)
const modalMode = ref('add') // 'add' atau 'edit'

const form = ref({
  id: null,
  name: '',
  price: '',
  price_label: '',
  unit: '/kg',
  special_treatment: '',
  benefits: [''] // array 1 elemen kosong agar ada 1 input default
})

// Membuka modal untuk menambah paket baru
const openAddModal = () => {
  modalMode.value = 'add'
  form.value = {
    id: null,
    name: '',
    price: '',
    price_label: '',
    unit: '/kg',
    special_treatment: '',
    benefits: ['']
  }
  showModal.value = true
}

// Membuka modal untuk merubah paket (edit)
const openEditModal = (pkg) => {
  modalMode.value = 'edit'
  form.value = {
    id: pkg.id,
    name: pkg.name,
    price: pkg.price,
    price_label: pkg.price_label,
    unit: pkg.unit,
    special_treatment: pkg.special_treatment || '',
    benefits: pkg.benefits && pkg.benefits.length > 0 ? [...pkg.benefits] : ['']
  }
  showModal.value = true
}

// Handler baris manfaat (benefits)
const addBenefit = () => form.value.benefits.push('')
const removeBenefit = (index) => form.value.benefits.splice(index, 1)

// Proses simpan (Tambah & Update)
const submitForm = async () => {
  isSubmitting.value = true
  
  // Bersihkan benefit yang dikosongi user dari form form
  const cleanBenefits = form.value.benefits.filter(b => b.trim() !== '')

  const payload = {
    name: form.value.name,
    price: Number(form.value.price),
    price_label: form.value.price_label,
    unit: form.value.unit,
    special_treatment: form.value.special_treatment,
    benefits: cleanBenefits
  }

  try {
    if (modalMode.value === 'add') {
      await $api('/api/packages', { method: 'POST', body: payload })
    } else {
      await $api(`/api/packages/${form.value.id}`, { method: 'PUT', body: payload })
    }
    showModal.value = false
    await refreshPackages() // Refresh data list
  } catch (error) {
    alert(error.data?.error || 'Gagal menyimpan paket. Pastikan backend menyala.')
    console.error('Failed to save package:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Proses Hapus
const deletePackage = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus paket ini? Tindakan ini tidak dapat dibatalkan.')) return
  
  try {
    await $api(`/api/packages/${id}`, { method: 'DELETE' })
    await refreshPackages()
  } catch (error) {
    alert('Gagal menghapus paket.')
    console.error('Failed to delete package:', error)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Area -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Kelola Paket Laundry</h1>
        <p class="text-sm text-slate-500 mt-1">Buat dan publikasikan penawaran harga layanan ke pelanggan.</p>
      </div>
      <button 
        @click="openAddModal"
        class="inline-flex items-center justify-center gap-2 bg-primary text-white py-2.5 px-5 rounded-xl font-bold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all text-sm active:scale-95"
      >
        <LucidePlus :size="18" />
        Tambah Paket Baru
      </button>
    </div>

    <!-- Data State: Loading -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <LucideLoader2 :size="40" class="text-primary animate-spin mb-4" />
      <p class="text-slate-500 font-medium">Memuat data paket...</p>
    </div>

    <!-- Data State: Empty -->
    <div v-else-if="!packages || packages.length === 0" class="bg-white border border-slate-100 rounded-2xl shadow-sm p-12 text-center">
      <div class="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-5">
        <LucidePackageOpen :size="40" />
      </div>
      <h2 class="text-xl font-bold text-slate-900 mb-2">Belum ada paket laundry</h2>
      <p class="text-slate-500 max-w-sm mx-auto mb-6">Mulai tambahkan layanan Express, Reguler, atau Setrika untuk ditampilkan pada aplikasi Anda.</p>
      <button @click="openAddModal" class="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
        <LucidePlusCircle :size="20" /> Buat Paket Pertama
      </button>
    </div>

    <!-- Data State: Listed (Cards Layout mirrors the pricing section) -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="pkg in packages" 
        :key="pkg.id"
        class="bg-white rounded-3xl border border-slate-200 p-8 hover:shadow-xl transition-shadow flex flex-col relative group overflow-hidden"
      >
        <!-- Card Actions Overlays -->
        <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
          <button @click="openEditModal(pkg)" class="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:text-primary hover:border-primary/30 hover:bg-primary/5 shadow-sm transition-all focus:outline-none" title="Edit">
            <LucideEdit2 :size="16" />
          </button>
          <button @click="deletePackage(pkg.id)" class="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:text-red-500 hover:border-red-200 hover:bg-red-50 shadow-sm transition-all focus:outline-none" title="Hapus">
            <LucideTrash2 :size="16" />
          </button>
        </div>

        <!-- Special Treatment Tag -->
        <div v-if="pkg.special_treatment" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold mb-6 self-start">
          <LucideZap :size="14" class="fill-primary" />
          {{ pkg.special_treatment }}
        </div>
        <div v-else class="h-9 mb-6"></div> <!-- Spacer jika tidak ada label -->

        <!-- Title & Price -->
        <h3 class="text-xl font-bold text-slate-900 mb-2">{{ pkg.name }}</h3>
        <div class="flex items-baseline gap-1 mb-8">
          <span class="text-4xl font-black text-slate-900 tracking-tight">{{ pkg.price_label }}</span>
          <span class="text-slate-500 font-medium">{{ pkg.unit }}</span>
        </div>

        <div class="h-px bg-slate-100 w-full mb-8"></div>

        <!-- Benefits List -->
        <ul class="space-y-4 mb-4 flex-1">
          <li v-for="(benefit, idx) in pkg.benefits" :key="idx" class="flex gap-3 text-slate-600">
            <div class="mt-0.5">
              <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <LucideCheck :size="12" class="text-green-600 font-bold" />
              </div>
            </div>
            <span class="text-sm font-medium leading-tight">{{ benefit }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>


  <!-- MODAL FORM (Menggunakan Teleport agar tidak terpotong Parent) -->
  <Teleport to="body">
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <!-- Backdrop -->
      <div 
        @click="showModal = false"
        class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      ></div>

      <!-- Modal Panel -->
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]">
        
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <LucidePackage :size="20" class="text-primary" />
            {{ modalMode === 'add' ? 'Tambah Paket Layanan Baru' : 'Edit Paket Layanan' }}
          </h2>
          <button @click="showModal = false" class="text-slate-400 hover:text-slate-700 bg-white shadow-sm p-1.5 rounded-full border border-slate-200">
            <LucideX :size="18" />
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
          <form @submit.prevent="submitForm" id="packageForm" class="space-y-6">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Name -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Nama Paket <span class="text-red-500">*</span></label>
                <input v-model="form.name" type="text" placeholder="Contoh: Express 24h" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
              </div>

              <!-- Price (Nominal Riil) -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Harga Dasar (Tanpa Titik/Koma) <span class="text-red-500">*</span></label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-medium">Rp</div>
                  <input v-model="form.price" type="number" placeholder="15000" required class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                </div>
                <p class="text-[11px] text-slate-500 mt-1">Hanya angka (mis: 15000) untuk kalkulasi sistem.</p>
              </div>

              <!-- Price Label (Tampilan) -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Label Harga Tampilan <span class="text-red-500">*</span></label>
                <input v-model="form.price_label" type="text" placeholder="Contoh: Rp 15k" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
              </div>

              <!-- Unit -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Satuan <span class="text-red-500">*</span></label>
                <input v-model="form.unit" type="text" placeholder="Contoh: /kg atau /pcs" required class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
              </div>

              <!-- Special Treatment -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Fitur Spesial (Badge)</label>
                <input v-model="form.special_treatment" type="text" placeholder="Contoh: Selesai Besok (24 Jam)" class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                <p class="text-[11px] text-slate-500 mt-1">Kosongkan jika paket ini tidak mendapat highlight/label.</p>
              </div>
            </div>

            <!-- Benefits -->
            <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <label class="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <LucideListChecks :size="18" class="text-primary" /> Daftar Manfaat (Benefits)
              </label>
              
              <div class="space-y-3 mb-4">
                <div v-for="(benefit, index) in form.benefits" :key="index" class="flex items-center gap-3">
                  <div class="flex-none w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">{{ index + 1 }}</div>
                  <input v-model="form.benefits[index]" type="text" placeholder="Contoh: Cuci Kering Setrika" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm" />
                  <button 
                    @click.prevent="removeBenefit(index)" 
                    :disabled="form.benefits.length === 1"
                    class="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LucideMinusCircle :size="20" />
                  </button>
                </div>
              </div>
              
              <button @click.prevent="addBenefit" type="button" class="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                <LucidePlusCircle :size="16" /> Tambah Poin Benefit
              </button>
            </div>

          </form>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-3xl">
          <button @click="showModal = false" type="button" class="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors focus:outline-none">
            Batal
          </button>
          <button 
            type="submit" 
            form="packageForm" 
            :disabled="isSubmitting"
            class="inline-flex items-center gap-2 bg-primary text-white py-2.5 px-6 rounded-xl font-bold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <LucideLoader2 v-if="isSubmitting" :size="16" class="animate-spin" />
            <LucideSave v-else :size="16" />
            {{ isSubmitting ? 'Menyimpan...' : 'Simpan Paket' }}
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Scrollbar khusus untuk modal panel */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>
