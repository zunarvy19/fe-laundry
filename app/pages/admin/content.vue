<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Web Content</h2>
        <p class="text-slate-500 text-sm mt-1">Manage website copy and general text content.</p>
      </div>
      <button @click="openModal()" class="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-soft flex items-center gap-2">
        <LucidePlus class="w-4 h-4" />
        Add Content
      </button>
    </div>

    <!-- Data Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-if="pending">
        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 animate-pulse">
          <div class="h-4 bg-slate-100 rounded w-1/3 mb-4"></div>
          <div class="space-y-2">
            <div class="h-3 bg-slate-50 rounded w-full"></div>
            <div class="h-3 bg-slate-50 rounded w-4/5"></div>
            <div class="h-3 bg-slate-50 rounded w-2/3"></div>
          </div>
        </div>
      </template>
      <div v-else-if="!content?.length" class="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
        <LucideFileText class="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 class="text-lg font-medium text-slate-900">No content found</h3>
        <p class="text-slate-500 text-sm">Create the first web content section</p>
      </div>
      <div v-else v-for="item in content" :key="item.id" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-bold text-lg text-slate-900">{{ item.title }}</h3>
          <div class="flex items-center gap-1 bg-slate-50 p-1 rounded-lg">
            <button @click="openModal(item)" class="p-1.5 text-slate-400 hover:text-primary hover:bg-white rounded-md transition-colors" title="Edit">
              <LucideEdit class="w-4 h-4" />
            </button>
            <button @click="confirmDelete(item)" class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-md transition-colors" title="Delete">
              <LucideTrash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div class="text-sm text-slate-600 line-clamp-4 flex-1 whitespace-pre-wrap">{{ item.content }}</div>
        <div class="mt-4 pt-4 border-t border-slate-100 flex items-end justify-end text-xs text-slate-400">
          <!-- <span class="font-mono bg-slate-50 px-2 py-1 rounded">ID: {{ item.id }}</span> -->
          <span class="">Last updated: {{ new Date(item.updated_at).toLocaleDateString() }}</span>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
          <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 class="text-lg font-bold text-slate-900">{{ form.id ? 'Edit Content Section' : 'New Content Section' }}</h3>
            <button @click="closeModal" class="text-slate-400 hover:text-slate-600">
              <LucideX class="w-5 h-5" />
            </button>
          </div>
          
          <div class="p-6 overflow-y-auto flex-1">
            <form @submit.prevent="submit" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
                <input v-model="form.title" type="text" required class="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-primary text-sm p-3 outline-none border transition-colors" placeholder="e.g. Hero Subtitle">
                <p class="text-xs text-slate-400 mt-1">Used to identify the content section.</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Content Text</label>
                <textarea v-model="form.content" rows="6" required class="w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-primary text-sm p-3 outline-none border transition-colors resize-y" placeholder="Enter the content text here..."></textarea>
              </div>
            </form>
          </div>
          
          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button @click="closeModal" type="button" class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors" :disabled="isSubmitting">Cancel</button>
            <button @click="submit" type="button" class="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2" :disabled="isSubmitting">
              <LucideLoader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
              Save Content
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <ConfirmDialog 
      :isOpen="isDeleteDialogOpen"
      title="Delete Content Section"
      :message="`Are you sure you want to delete '${itemToDelete?.title}'?`"
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

const { data: content, pending, refresh } = useApi('/webcontent')

// Modal Form State
const isModalOpen = ref(false)
const isSubmitting = ref(false)
const form = ref({
  id: 0,
  title: '',
  content: ''
})

const openModal = (item: any = null) => {
  if (item) {
    form.value = { ...item }
  } else {
    form.value = { id: 0, title: '', content: '' }
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
    
    if (payload.id) {
      await $api(`/webcontent/${payload.id}`, { method: 'PUT', body: payload })
    } else {
      await $api('/webcontent', { method: 'POST', body: payload })
    }
    
    await refresh()
    closeModal()
  } catch (error) {
    console.error(error)
    alert('Failed to save content')
  } finally {
    isSubmitting.value = false
  }
}

// Delete State
const isDeleteDialogOpen = ref(false)
const itemToDelete = ref<any>(null)
const isDeleting = ref(false)

const confirmDelete = (item: any) => {
  itemToDelete.value = item
  isDeleteDialogOpen.value = true
}

const handleDelete = async () => {
  if (!itemToDelete.value) return
  isDeleting.value = true
  try {
    // Note: controllers.go DeleteWebContent expects JSON
    // c.ShouldBindJSON(&webContent)
    await $api(`/webcontent/${itemToDelete.value.id}`, { 
      method: 'DELETE',
      body: itemToDelete.value 
    })
    await refresh()
    isDeleteDialogOpen.value = false
  } catch (error) {
    console.error(error)
    alert('Failed to delete content')
  } finally {
    isDeleting.value = false
  }
}
</script>
