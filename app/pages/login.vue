<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden py-10 px-6">
    <!-- Background Decor -->
    <div class="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4"></div>
    <div class="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/4"></div>

    <div class="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 z-10 transition-transform duration-300 hover:shadow-2xl">
      <div class="p-8 sm:p-10">
        <!-- Back to Home -->
        <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-6 group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left mr-1 group-hover:-translate-x-1 transition-transform"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Kembali
        </NuxtLink>

        <!-- Logo or Icon -->
        <div class="flex justify-center mb-6">
          <div class="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-droplets"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7 6 7 6s-2.29 3.06-3.43 4.12A4.7 4.7 0 0 0 7 16.3Z"/><path d="m14 8-1.5 1.5c-1.14 1.14-1.5 2.5-1.5 4 0 2.22 1.78 4 4 4s4-1.78 4-4c0-1.5-.36-2.86-1.5-4L14 8Z"/></svg>
          </div>
        </div>

        <div class="text-center mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Selamat Datang</h1>
          <p class="text-slate-500 mt-2 text-sm">Masuk ke akun Anda untuk melanjutkan</p>
        </div>

        <div v-if="errorMessage" class="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mt-0.5 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label for="username" class="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <input 
                id="username" 
                v-model="form.username"
                type="text" 
                placeholder="Masukkan Username Anda" 
                class="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder:text-slate-400"
              />
            </div>
            <p v-if=" form.username.length > 0 " class="text-sm text-red-600">Username tidak boleh kosong</p>
          </div>

          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label for="password" class="block text-sm font-medium text-slate-700">Password</label>
              <!-- <a href="#" class="text-xs font-medium text-primary hover:text-primary/80 transition-colors">Lupa Password?</a> -->
            </div>
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
                class="block w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder:text-slate-400"
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

          <div class="flex items-center">
            <input 
              id="remember_me" 
              v-model="form.remember"
              type="checkbox" 
              class="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer"
            />
            <label for="remember_me" class="ml-2 block text-sm text-slate-600 cursor-pointer select-none">
              Ingat saya
            </label>
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md shadow-primary/20 text-sm font-bold text-white bg-primary hover:bg-primary/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-6 active:scale-[0.98]"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-else>Masuk Sekarang</span>
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { $api } from '~/composables/useApi'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false 
})

const router = useRouter()
const auth = useAuthStore()
const isLoading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const form = reactive({
  username: '',
  password: '',
  remember: false
})

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await $api('/api/login', {
      method: 'POST',
      body: {
        username: form.username,
        password: form.password
      }
    })
    
    if (response?.token) {
      auth.setToken(response.token)
      if (response.user) {
        auth.setUser(response.user)
      }
      
      // Redirect ke halaman utils home setelah login sukses
      router.push('/admin/dashboard-admin')
    } else {
      errorMessage.value = 'Login gagal, token tidak diterima dari server.'
    }
  } catch (error) {
    // Menangkap error dari backend
    errorMessage.value = 'Terjadi kesalahan saat login. Periksa email dan password.'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
