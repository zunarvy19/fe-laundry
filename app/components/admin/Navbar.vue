<template>
  <header class="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6">
    <div class="flex items-center gap-4 border-r pr-6 border-slate-200 h-full">
      <button @click="$emit('toggle-sidebar')" class="md:hidden text-slate-500 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-50 transition-colors">
        <LucideMenu class="w-5 h-5" />
      </button>
      
      <h1 class="text-xl font-bold text-slate-800 hidden sm:block">
        Laundry Admin
      </h1>
    </div>

    <div class="flex items-center gap-4">
      <div class="relative">
        <button @click="isProfileOpen = !isProfileOpen" class="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
          <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
            {{ userInitial }}
          </div>
          <span class="text-sm font-medium text-slate-700 hidden sm:block">{{ authStore.user?.name || 'Administrator' }}</span>
          <LucideChevronDown class="w-4 h-4 text-slate-400" />
        </button>

        <!-- Dropdown Menu -->
        <div v-if="isProfileOpen" class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-soft border border-slate-100 py-1" @click.away="isProfileOpen = false">
          <div class="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <p class="text-sm font-bold text-slate-900">{{ authStore.user?.name || 'Admin User' }}</p>
            <p class="text-xs text-slate-500 truncate mt-0.5">{{ authStore.user?.email || 'admin@laundry.local' }}</p>
          </div>
          <button @click="handleLogout" class="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium transition-colors">
            <LucideLogOut class="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

defineEmits(['toggle-sidebar'])

const authStore = useAuthStore()
const router = useRouter()
const isProfileOpen = ref(false)

const userInitial = computed(() => {
  const name = authStore.user?.name || 'A'
  return name.charAt(0).toUpperCase()
})

const handleLogout = () => {
  authStore.logout()
  router.push('/admin/login')
}
</script>
