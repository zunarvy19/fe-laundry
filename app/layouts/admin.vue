<template>
  <div class="flex h-screen overflow-hidden bg-background-light text-slate-900 font-sans">
    <!-- Overlay for mobile sidebar -->
    <div 
      v-if="isSidebarOpen" 
      class="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <AdminSidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Main Content wrapper -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden md:pl-64 transition-all duration-300">
      <AdminNavbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      
      <!-- Main view area -->
      <main class="flex-1 overflow-y-auto overflow-x-hidden bg-background-light p-4 md:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto space-y-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminSidebar from '~/components/admin/Sidebar.vue'
import AdminNavbar from '~/components/admin/Navbar.vue'

const isSidebarOpen = ref(false)
</script>
