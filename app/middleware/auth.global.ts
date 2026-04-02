import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  // Hanya berlaku running di client, biar tidak conflict auth dari SSR cookies jika kompleks
  // Tapi karena kita pakai useCookie maka SSR pun juga bisa membaca ini
  const auth = useAuthStore()
  
  // Daftar endpoint atau rute yang boleh diakses siapa saja (tanpa login)
  const publicRoutes = ['/login', '/', '/register']

  // Jika mencoba masuk rute private tapi belum punya token
  if (!auth.token && !publicRoutes.includes(to.path)) {
    // Memaksa pindah ke halaman login
    return navigateTo('/login')
  }

  // Jika user SUDAH login tapi coba mengakses halaman /login atau /register
  if (auth.token && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/') // lemparkan ke halaman dashboard atau home
  }
})
