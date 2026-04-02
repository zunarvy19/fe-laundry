import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // If user is not authenticated, redirect to login
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
  
  // Note: If you want to strictly check role, you can add:
  // if (authStore.user?.role !== 'admin') { ... }
})
