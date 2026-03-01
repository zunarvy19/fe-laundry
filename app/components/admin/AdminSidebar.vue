<script setup>
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard-admin', icon: 'LucideLayoutDashboard' },
  { name: 'Paket Laundry', path: '/admin/packages', icon: 'LucidePackage' },
  { name: 'Kontak Pesanan', path: '/admin/contacts', icon: 'LucideMessageSquare' },
  { name: 'Konten Web', path: '/admin/webcontent', icon: 'LucideGlobe' },
]
</script>

<template>
  <aside class="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col transition-all duration-300">
    <!-- Sidebar Header (Logo) -->
    <div class="h-20 flex items-center px-6 border-b border-slate-100">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
          <LucideDroplets :size="24" />
        </div>
        <div>
          <h2 class="font-bold text-slate-900 leading-tight">Admin<span class="text-primary">Panel</span></h2>
          <p class="text-xs text-slate-500">Express Laundry</p>
        </div>
      </div>
    </div>

    <!-- Sidebar Menus -->
    <div class="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
      <p class="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu Utama</p>
      
      <NuxtLink 
        v-for="item in menuItems" 
        :key="item.path" 
        :to="item.path"
        class="flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-200 group"
        active-class="bg-primary/10 text-primary font-medium"
        :class="$route.path === item.path ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
      >
        <component :is="item.icon" :size="20" :class="$route.path === item.path ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'" />
        <span>{{ item.name }}</span>
      </NuxtLink>
    </div>

    <!-- Sidebar Footer -->
    <div class="p-4 border-t border-slate-100">
      <button 
        @click="auth.logout()"
        class="flex items-center w-full gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200"
      >
        <LucideLogOut :size="20" class="text-red-500" />
        <span class="font-medium">Logout</span>
      </button>
    </div>
  </aside>
</template>
