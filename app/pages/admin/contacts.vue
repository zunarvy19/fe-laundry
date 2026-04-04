<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Contacts</h2>
        <p class="text-slate-500 text-sm mt-1">Manage whatsapp numbers for customer support.</p>
      </div>
      <button @click="openModal()" class="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-soft flex items-center gap-2">
        <LucidePlus class="w-4 h-4" />
        Add Contact
      </button>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600">
          <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th class="px-6 py-4">ID</th>
              <th class="px-6 py-4">Phone Number</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <template v-if="pending">
              <tr v-for="i in 3" :key="i">
                <td class="px-6 py-4" colspan="4">
                  <div class="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                </td>
              </tr>
            </template>
            <tr v-else-if="!contacts?.length">
              <td class="px-6 py-8 text-center" colspan="4">
                <div class="text-slate-400">No contacts found.</div>
              </td>
            </tr>
            <tr v-else v-for="contact in contacts" :key="contact.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">#{{ number++ }}</td>
              <td class="px-6 py-4 font-medium text-slate-900">
                +62{{ contact.phone_number }}
              </td>
              <td class="px-6 py-4">
                <span 
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="contact.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="contact.is_active ? 'bg-emerald-500' : 'bg-slate-400'"></span>
                  {{ contact.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-2">
                  <button @click="openModal(contact)" class="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors">
                    <LucideEdit class="w-4 h-4" />
                  </button>
                  <button @click="confirmDelete(contact)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden z-10">
          <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 class="text-lg font-bold text-slate-900">{{ form.id ? 'Edit Contact' : 'New Contact' }}</h3>
            <button @click="closeModal" class="text-slate-400 hover:text-slate-600">
              <LucideX class="w-5 h-5" />
            </button>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="submit" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">+62</span>
                  <input v-model.number="form.phone_number" type="number" required class="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-primary text-sm p-2.5 pl-10 outline-none border transition-colors" placeholder="8123456789">
                </div>
                <p class="text-xs text-slate-400 mt-1">Start without 0 or 62 (e.g., 812xxxx)</p>
              </div>

              <div class="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <input v-model="form.is_active" type="checkbox" id="isActive" class="w-4 h-4 text-primary bg-white border-slate-300 rounded focus:ring-primary focus:ring-2 checked:bg-primary">
                <label for="isActive" class="text-sm font-medium text-slate-700 cursor-pointer select-none">Set as active contact number</label>
              </div>
            </form>
          </div>
          
          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button @click="closeModal" type="button" class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors" :disabled="isSubmitting">Cancel</button>
            <button @click="submit" type="button" class="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2" :disabled="isSubmitting">
              <LucideLoader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
              Save Contact
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <ConfirmDialog 
      :isOpen="isDeleteDialogOpen"
      title="Delete Contact"
      :message="`Are you sure you want to delete +62${itemToDelete?.phone_number}?`"
      :isLoading="isDeleting"
      @confirm="handleDelete"
      @cancel="isDeleteDialogOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConfirmDialog from '~/components/admin/ConfirmDialog.vue'

const number = 1;

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { data: contacts, pending, refresh } = useApi('/contacts')

// Modal Form State
const isModalOpen = ref(false)
const isSubmitting = ref(false)
const form = ref({
  id: 0,
  phone_number: null as number | null,
  is_active: true
})

const openModal = (contact: any = null) => {
  if (contact) {
    form.value = { ...contact }
  } else {
    form.value = { id: 0, phone_number: null, is_active: true }
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const submit = async () => {
  if (!form.value.phone_number) return

  isSubmitting.value = true
  try {
    const payload = { ...form.value }
    
    // Note: Backend UpdateContact endpoint is weirdly defined as PUT /contacts/:id but uses ShouldBindJSON
    // Wait, let's just make the request
    if (payload.id) {
      await $api(`/contacts/${payload.id}`, { method: 'PUT', body: payload })
    } else {
      await $api('/contacts', { method: 'POST', body: payload })
    }
    
    await refresh()
    closeModal()
  } catch (error) {
    console.error(error)
    alert('Failed to save contact')
  } finally {
    isSubmitting.value = false
  }
}

// Delete State
const isDeleteDialogOpen = ref(false)
const itemToDelete = ref<any>(null)
const isDeleting = ref(false)

const confirmDelete = (contact: any) => {
  itemToDelete.value = contact
  isDeleteDialogOpen.value = true
}

const handleDelete = async () => {
  if (!itemToDelete.value) return
  isDeleting.value = true
  try {
    // Delete contact endpoint expects JSON body based on controllers.go!
    // -> c.ShouldBindJSON(&contact); if err:=config.DB.Delete(&contact)
    await $api(`/contacts/${itemToDelete.value.id}`, { 
      method: 'DELETE',
      body: itemToDelete.value 
    })
    await refresh()
    isDeleteDialogOpen.value = false
  } catch (error) {
    console.error(error)
    alert('Failed to delete contact')
  } finally {
    isDeleting.value = false
  }
}
</script>
