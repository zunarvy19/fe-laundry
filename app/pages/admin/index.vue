<template>
  <div>
    <h2 class="text-2xl font-bold text-slate-800 mb-6">Dashboard Overview</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Status Cards -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <LucidePackage class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500">Total Packages</p>
          <p class="text-2xl font-bold text-slate-900">{{ packages?.length || 0 }}</p>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
          <LucideUsers class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500">Active Contacts</p>
          <p class="text-2xl font-bold text-slate-900">{{ activeContactsCount }}</p>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
          <LucideFileText class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500">Web Content Sections</p>
          <p class="text-2xl font-bold text-slate-900">{{ content?.length || 0 }}</p>
        </div>
      </div>
    </div>
    
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 class="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
        <div class="space-y-3">
          <NuxtLink to="/admin/packages" class="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-primary hover:bg-primary/5 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-white flex items-center justify-center">
                <LucidePlus class="w-4 h-4 text-slate-600 group-hover:text-primary" />
              </div>
              <span class="font-medium text-sm text-slate-700">Add New Package</span>
            </div>
            <LucideArrowRight class="w-4 h-4 text-slate-400 group-hover:text-primary" />
          </NuxtLink>
          
          <NuxtLink to="/admin/contacts" class="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-primary hover:bg-primary/5 transition-colors group">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-white flex items-center justify-center">
                <LucidePhone class="w-4 h-4 text-slate-600 group-hover:text-primary" />
              </div>
              <span class="font-medium text-sm text-slate-700">Manage Contacts</span>
            </div>
            <LucideArrowRight class="w-4 h-4 text-slate-400 group-hover:text-primary" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { data: packages } = useApi('/packages')
const { data: contacts } = useApi('/contacts')
const { data: content } = useApi('/webcontent')

const activeContactsCount = computed(() => {
  if (!contacts.value || !Array.isArray(contacts.value)) return 0
  return contacts.value.filter((c: any) => c.is_active).length
})
</script>
