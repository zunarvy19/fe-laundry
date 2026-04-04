<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Lokasi / Cabang</h2>
        <p class="text-slate-500 text-sm mt-1">Kelola lokasi toko cabang Anda beserta titik koordinat peta.</p>
      </div>
      <button @click="openModal()" class="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-soft flex items-center gap-2">
        <LucidePlus class="w-4 h-4" />
        Tambah Lokasi
      </button>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600">
          <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th class="px-6 py-4 w-12">ID</th>
              <th class="px-6 py-4">Nama & Alamat</th>
              <th class="px-6 py-4">Koordinat (Lat, Lng)</th>
              <th class="px-6 py-4 w-32">Status</th>
              <th class="px-6 py-4 text-right w-32">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <template v-if="pending">
              <tr v-for="i in 3" :key="i">
                <td class="px-6 py-4" colspan="5">
                  <div class="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                </td>
              </tr>
            </template>
            <tr v-else-if="!locations?.length">
              <td class="px-6 py-8 text-center" colspan="5">
                <div class="text-slate-400">Belum ada lokasi tersimpan.</div>
              </td>
            </tr>
            <tr v-else v-for="loc in locations" :key="loc.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">#{{ loc.id }}</td>
              <td class="px-6 py-4">
                <div class="font-bold text-slate-900">{{ loc.name }}</div>
                <div class="text-xs text-slate-500 mt-1 max-w-xs truncate" :title="loc.address">{{ loc.address }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="font-mono text-xs text-slate-600 mb-1">{{ loc.latitude.toFixed(6) }}</div>
                <div class="font-mono text-xs text-slate-600">{{ loc.longitude.toFixed(6) }}</div>
              </td>
              <td class="px-6 py-4">
                <span 
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="loc.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="loc.is_active ? 'bg-emerald-500' : 'bg-slate-400'"></span>
                  {{ loc.is_active ? 'Aktif' : 'Nonaktif' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button @click="openModal(loc)" class="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
                    <LucideEdit class="w-4 h-4" />
                  </button>
                  <button @click="confirmDelete(loc)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <LucideTrash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden z-10 flex flex-col max-h-[90vh]">
          <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
              <LucideMapPin class="w-5 h-5 text-primary" />
              {{ form.id ? 'Edit Lokasi' : 'Tambah Lokasi Baru' }}
            </h3>
            <button @click="closeModal" class="text-slate-400 hover:text-slate-600">
              <LucideX class="w-5 h-5" />
            </button>
          </div>
          
          <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
            <form @submit.prevent="submit" id="locationForm" class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Nama Tempat / Cabang</label>
                <input v-model="form.name" type="text" required class="w-full rounded-xl border border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all" placeholder="Misalnya: Express Laundry - Pusat">
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Alamat Lengkap</label>
                <textarea v-model="form.address" required rows="3" class="w-full rounded-xl border border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all" placeholder="Tuliskan nama jalan dan detail gedung..."></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-1">Latitude</label>
                  <input v-model.number="form.latitude" step="any" type="number" required class="w-full rounded-xl border border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all" placeholder="-6.2088">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-1">Longitude</label>
                  <input v-model.number="form.longitude" step="any" type="number" required class="w-full rounded-xl border border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all" placeholder="106.8456">
                </div>
              </div>

              <div class="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2">
                <input v-model="form.is_active" type="checkbox" id="locIsActive" class="w-5 h-5 text-primary bg-white border-slate-300 rounded focus:ring-primary focus:ring-2 cursor-pointer checked:bg-primary">
                <label for="locIsActive" class="text-sm font-medium text-slate-700 cursor-pointer select-none">Tampilkan lokasi ini di halaman depan</label>
              </div>
            </form>
          </div>
          
          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-2xl">
            <button @click="closeModal" type="button" class="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors" :disabled="isSubmitting">Batal</button>
            <button type="submit" form="locationForm" class="px-5 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 rounded-xl transition-colors flex items-center gap-2" :disabled="isSubmitting">
              <LucideLoader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
              {{ isSubmitting ? 'Menyimpan...' : 'Simpan Lokasi' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <ConfirmDialog 
      :isOpen="isDeleteDialogOpen"
      title="Hapus Lokasi"
      :message="`Anda yakin ingin menghapus lokasi '${itemToDelete?.name}'? Tindakan ini tidak bisa dibatalkan.`"
      :isLoading="isDeleting"
      @confirm="handleDelete"
      @cancel="isDeleteDialogOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConfirmDialog from '~/components/admin/ConfirmDialog.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { data: locations, pending, refresh } = useApi('/locations')

// Modal Form State
const isModalOpen = ref(false)
const isSubmitting = ref(false)
const form = ref({
  id: 0,
  name: '',
  address: '',
  latitude: null as number | null,
  longitude: null as number | null,
  is_active: false
})

const openModal = (location: any = null) => {
  if (location) {
    form.value = { ...location }
  } else {
    form.value = { id: 0, name: '', address: '', latitude: null, longitude: null, is_active: true }
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const submit = async () => {
  if (!form.value.name || form.value.latitude === null || form.value.longitude === null) return

  isSubmitting.value = true
  try {
    const payload = { ...form.value }
    
    if (payload.id) {
      await $api(`/locations/${payload.id}`, { method: 'PUT', body: payload })
    } else {
      await $api('/locations', { method: 'POST', body: payload })
    }
    
    await refresh()
    closeModal()
  } catch (error) {
    console.error(error)
    alert('Failed to save location')
  } finally {
    isSubmitting.value = false
  }
}

// Delete State
const isDeleteDialogOpen = ref(false)
const itemToDelete = ref<any>(null)
const isDeleting = ref(false)

const confirmDelete = (location: any) => {
  itemToDelete.value = location
  isDeleteDialogOpen.value = true
}

const handleDelete = async () => {
  if (!itemToDelete.value) return
  isDeleting.value = true
  try {
    await $api(`/locations/${itemToDelete.value.id}`, { 
      method: 'DELETE',
      body: itemToDelete.value 
    })
    await refresh()
    isDeleteDialogOpen.value = false
  } catch (error) {
    console.error(error)
    alert('Failed to delete location')
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
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
