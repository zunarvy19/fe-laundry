<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden py-10 px-6">
    <!-- Background Decor -->
    <div class="absolute top-0 left-0 -z-10 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4"></div>
    <div class="absolute bottom-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/4"></div>

    <div class="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 z-10 transition-transform duration-300 hover:shadow-2xl">
      <div class="p-8 sm:p-10">
        <!-- Back to Home -->
        <NuxtLink to="/login" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-6 group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left mr-1 group-hover:-translate-x-1 transition-transform"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Kembali ke Login
        </NuxtLink>

        <!-- Logo or Icon -->
        <div class="flex justify-center mb-5">
          <div class="w-14 h-14 bg-sky-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          </div>
        </div>

        <div class="text-center mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Daftar Akun Baru</h1>
          <p class="text-slate-500 mt-2 text-sm">Buat akun untuk mengelola laundry Anda</p>
        </div>

        <div v-if="errorMessage" class="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mt-0.5 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>

        <div v-if="successMessage" class="mb-5 p-3 rounded-xl bg-green-50 border border-green-100 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <p class="text-sm text-green-600">{{ successMessage }}</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <input 
                id="username" 
                v-model="form.username"
                type="text" 
                placeholder="johndoe" 
                required
                class="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all duration-200 placeholder:text-slate-400"
              />
            </div>
          </div>

      

          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <input 
                id="password" 
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••" 
                required
                class="block w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all duration-200 placeholder:text-slate-400"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                title="Tampilkan Password"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              </button>
            </div>
          </div>

          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md shadow-sky-500/20 text-sm font-bold text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2 active:scale-[0.98]"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else>Daftar Sekarang</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { $api } from '~/composables/useApi'

definePageMeta({
  layout: false 
})

const router = useRouter()
const isLoading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  username: '',
  password: '',
})

const handleRegister = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const response = await $api('/register', {
      method: 'POST',
      body: {
        username: form.username,
        password: form.password,
      }
    })
    
    successMessage.value = 'Registrasi berhasil! Mengalihkan ke halaman login...'
    
    // Redirect ke login setelah delay singkat agar user sempat melihat pesan sukses
    setTimeout(() => {
      router.push('/login')
    }, 1500)

  } catch (error) {
    // Menangkap error dari backend
    errorMessage.value = error.data?.error || error.message || 'Terjadi kesalahan saat registrasi.'
    console.error('Register error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>