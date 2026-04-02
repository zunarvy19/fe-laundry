<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="$emit('cancel')"></div>
      
      <div 
        class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all z-10"
        role="dialog"
        aria-modal="true"
      >
        <div class="p-6">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4 text-red-600">
            <LucideAlertTriangle class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">{{ title }}</h3>
          <p class="text-slate-500 text-sm">
            {{ message }}
          </p>
        </div>
        
        <div class="px-6 py-4 bg-slate-50 flex items-center justify-end gap-3 rounded-b-2xl border-t border-slate-100">
          <button 
            type="button" 
            class="px-4 py-2 font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors text-sm"
            @click="$emit('cancel')"
            :disabled="isLoading"
          >
            Cancel
          </button>
          <button 
            type="button" 
            class="px-4 py-2 font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2 text-sm"
            @click="$emit('confirm')"
            :disabled="isLoading"
          >
            <LucideLoader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
            <LucideTrash2 v-else class="w-4 h-4" />
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Are you sure?'
  },
  message: {
    type: String,
    default: 'This action cannot be undone. This will permanently delete this data.'
  },
  confirmText: {
    type: String,
    default: 'Delete'
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['confirm', 'cancel'])
</script>
