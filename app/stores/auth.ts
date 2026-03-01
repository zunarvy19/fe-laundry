import { defineStore } from 'pinia'

export interface User {
  id: number | string;
  name: string;
  email: string;
  role?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  

  const token = useCookie<string | null>('auth-token', {
    maxAge: 60 * 60 * 24 * 7, // 7 hari dalam detik
    path: '/',
    sameSite: 'lax', 
  })

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const setUser = (userData: User) => {
    user.value = userData
  }

  const logout = () => {
    token.value = null
    user.value = null
    const router = useRouter()
    router.push('/')
  }

  return { 
    user, 
    token, 
    isAuthenticated,
    setToken, 
    setUser, 
    logout 
  }
})
