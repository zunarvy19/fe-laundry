<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Packages</h2>
        <p class="text-slate-500 text-sm mt-1">Manage laundry packages and their features.</p>
      </div>
      <button @click="openModal()" class="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-soft flex items-center gap-2">
        <LucidePlus class="w-4 h-4" />
        Add Package
      </button>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600">
          <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th class="px-6 py-4">Name</th>
              <th class="px-6 py-4">Price</th>
              <th class="px-6 py-4">Treatment</th>
              <th class="px-6 py-4">Benefits</th>
              <th class="px-6 py-4 text-right">Actions</th>
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
            <tr v-else-if="!packages?.length">
              <td class="px-6 py-8 text-center" colspan="5">
                <div class="text-slate-400">No packages found.</div>
              </td>
            </tr>
            <tr v-else v-for="pkg in packages" :key="pkg.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 font-medium text-slate-900">{{ pkg.name }}</td>
              <td class="px-6 py-4">
                <div class="font-medium text-slate-900">{{ formatRupiah(pkg.price) }}</div>
                <div class="text-xs text-slate-400">{{ pkg.price_label }} {{ pkg.unit }}</div>
              </td>
              <td class="px-6 py-4">{{ pkg.special_treatment || '-' }}</td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span v-for="(benefit, i) in pkg.benefits" :key="i" class="inline-block px-2 py-1 bg-soft-violet text-primary rounded text-xs">
                    {{ benefit }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button @click="openModal(pkg)" class="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
                    <LucideEdit class="w-4 h-4" />
                  </button>
                  <button @click="confirmDelete(pkg)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden z-10 max-h-[90vh] flex flex-col">
          <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 class="text-lg font-bold text-slate-900">{{ form.id ? 'Edit Package' : 'New Package' }}</h3>
            <button @click="closeModal" class="text-slate-400 hover:text-slate-600">
              <LucideX class="w-5 h-5" />
            </button>
          </div>
          
          <div class="p-6 overflow-y-auto flex-1">
            <form @submit.prevent="submit" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Package Name</label>
                <input v-model="form.name" type="text" required class="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-primary text-sm p-2.5 outline-none border transition-colors" placeholder="e.g. Express Cuci Kering">
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Price</label>
                  <input v-model.number="form.price" type="number" required class="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-primary text-sm p-2.5 outline-none border transition-colors">
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Price Label (Display)</label>
                  <input v-model="form.price_label" type="text" placeholder="e.g. Rp 15k" class="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-primary text-sm p-2.5 outline-none border transition-colors">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                  <input v-model="form.unit" type="text" placeholder="e.g. /kg" class="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-primary text-sm p-2.5 outline-none border transition-colors">
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-1">Special Treatment</label>
                  <input v-model="form.special_treatment" type="text" placeholder="e.g. Selesai Besok (24 Jam)" class="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-primary text-sm p-2.5 outline-none border transition-colors">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Benefits (Comma separated)</label>
                <textarea v-model="benefitsString" rows="3" class="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-primary text-sm p-2.5 outline-none border transition-colors" placeholder="e.g. Cuci komplit, Setrika uap, Parfum premium"></textarea>
                <p class="text-xs text-slate-400 mt-1">Separate each benefit with a comma.</p>
              </div>
            </form>
          </div>
          
          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button @click="closeModal" type="button" class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors" :disabled="isSubmitting">Cancel</button>
            <button @click="submit" type="button" class="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2" :disabled="isSubmitting">
              <LucideLoader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
              Save Package
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <ConfirmDialog 
      :isOpen="isDeleteDialogOpen"
      title="Delete Package"
      :message="`Are you sure you want to delete ${itemToDelete?.name}? This action cannot be undone.`"
      :isLoading="isDeleting"
      @confirm="handleDelete"
      @cancel="isDeleteDialogOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ConfirmDialog from '~/components/admin/ConfirmDialog.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { data: packages, pending, refresh } = useApi('/packages')

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}

// Modal Form State
const isModalOpen = ref(false)
const isSubmitting = ref(false)
const form = ref({
  id: 0,
  name: '',
  price: 0,
  price_label: '',
  unit: '',
  special_treatment: '',
  benefits: [] as string[]
})
const benefitsString = ref('')

const openModal = (pkg: any = null) => {
  if (pkg) {
    form.value = { ...pkg }
    benefitsString.value = pkg.benefits?.join(', ') || ''
  } else {
    form.value = { id: 0, name: '', price: 0, price_label: '', unit: '', special_treatment: '', benefits: [] }
    benefitsString.value = ''
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const submit = async () => {
  isSubmitting.value = true
  try {
    const payload = { ...form.value }
    payload.benefits = benefitsString.value.split(',').map(s => s.trim()).filter(Boolean)
    
    if (payload.id) {
      await $api(`/packages/${payload.id}`, { method: 'PUT', body: payload })
    } else {
      await $api('/packages', { method: 'POST', body: payload })
    }
    
    await refresh()
    closeModal()
  } catch (error) {
    console.error(error)
    alert('Failed to save package')
  } finally {
    isSubmitting.value = false
  }
}

// Delete State
const isDeleteDialogOpen = ref(false)
const itemToDelete = ref<any>(null)
const isDeleting = ref(false)

const confirmDelete = (pkg: any) => {
  itemToDelete.value = pkg
  isDeleteDialogOpen.value = true
}

const handleDelete = async () => {
  if (!itemToDelete.value) return
  isDeleting.value = true
  try {
    await $api(`/packages/${itemToDelete.value.id}`, { method: 'DELETE' })
    await refresh()
    isDeleteDialogOpen.value = false
  } catch (error) {
    console.error(error)
    alert('Failed to delete package')
  } finally {
    isDeleting.value = false
  }
}
</script>
