<template>
  <aside 
    class="fixed inset-y-0 left-0 z-50 w-64 bg-surface-light border-r border-slate-200 transition-transform duration-300 md:translate-x-0" 
    :class="{ '-translate-x-full': !isOpen }"
  >
    <div class="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white">
      <NuxtLink to="/admin" class="flex items-center gap-2 font-bold text-xl text-primary">
        <LucideWashingMachine class="w-6 h-6" />
        <span>Express</span>
      </NuxtLink>
      <button @click="$emit('close')" class="md:hidden text-slate-500 hover:text-slate-700">
        <LucideX class="w-5 h-5" />
      </button>
    </div>
    
    <div class="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)] bg-white">
      <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Main Menu</div>
      
      <NuxtLink 
        to="/admin"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="[route.path === '/admin' ? 'bg-soft-violet text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900']"
      >
        <LucideLayoutDashboard class="w-5 h-5" :class="route.path === '/admin' ? 'text-primary' : 'text-slate-400'" />
        Dashboard
      </NuxtLink>

      <NuxtLink 
        to="/admin/packages"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="[route.path === '/admin/packages' ? 'bg-soft-violet text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900']"
      >
        <LucidePackage class="w-5 h-5" :class="route.path === '/admin/packages' ? 'text-primary' : 'text-slate-400'" />
        Packages
      </NuxtLink>

      <NuxtLink 
        to="/admin/contacts"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="[route.path === '/admin/contacts' ? 'bg-soft-violet text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900']"
      >
        <LucideUsers class="w-5 h-5" :class="route.path === '/admin/contacts' ? 'text-primary' : 'text-slate-400'" />
        Contacts
      </NuxtLink>

      <NuxtLink 
        to="/admin/content"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="[route.path === '/admin/content' ? 'bg-soft-violet text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900']"
      >
        <LucideFileText class="w-5 h-5" :class="route.path === '/admin/content' ? 'text-primary' : 'text-slate-400'" />
        Web Content
      </NuxtLink>
      
      <NuxtLink 
        to="/admin/locations"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="[route.path === '/admin/locations' ? 'bg-soft-violet text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900']"
      >
        <LucideMapPin class="w-5 h-5" :class="route.path === '/admin/locations' ? 'text-primary' : 'text-slate-400'" />
        Locations
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

defineProps<{
  isOpen: boolean
}>()

defineEmits(['close'])

const route = useRoute()
</script>
