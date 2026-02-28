import type { UseFetchOptions } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'

/**
 * Custom boilerplate composable to fetch data from the API
 * 
 * useApi -> wrapper for `useFetch` (best for SSR & reactive data fetching in components)
 * $api -> wrapper for `$fetch` (best for client-side events like form submission, login, etc)
 */

export function useApi<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()

  const defaultOptions: UseFetchOptions<T> = {
    baseURL: config.public.apiBase as string, 
    
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
    
    // Interceptor saat request dikirim
    onRequest({ request, options }) {
      const auth = useAuthStore()
      if (auth.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${auth.token}`
        }
      }
    },
    
    // Interceptor saat ada error dari server
    onResponseError({ request, response, options }) {
      console.error(`[API Error] pada ${request}`, response.status, response._data)
      
      // Handle Unauthorized error
      if (response.status === 401) {
        const auth = useAuthStore()
        auth.logout() // akan mengosongkan state dan token, serta redirect ke /login
      }
    },

    ...options,
  }

  return useFetch(url, defaultOptions)
}


/**
 * Fungsi untuk memanggil API langsung via $fetch (biasanya dipanggil di event handler)
 */
export const $api = <T = any>(url: string, options: any = {}) => {
  const config = useRuntimeConfig()
  
  return $fetch<T>(url, {
    baseURL: config.public.apiBase as string,
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
    onRequest({ request, options }) {
      const auth = useAuthStore()
      if (auth.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${auth.token}`
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        const auth = useAuthStore()
        auth.logout()
      }
    },
    ...options
  })
}
