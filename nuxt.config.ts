// File: nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  vite: {
    plugins: [
      tailwindcss() as any
    ]
  },

  css: ['~/assets/main.css'],

  runtimeConfig: {
    public: {
<<<<<<< Updated upstream
      apiBase: 'http://43.157.248.166:8080'
    }
  },

=======
      // Menggunakan /api saat mode development agar dilewatkan ke proxy bawaan Nuxt (Nitro)
      apiBase: process.env.NODE_ENV === 'development' ? '/api' : 'http://43.157.248.166:8080/api'
    }
  },

  routeRules: {
    // Proxy request /api agar diteruskan ke backend beserta /api-nya
    '/api/**': { proxy: 'http://43.157.248.166:8080/api/**' }
  },

>>>>>>> Stashed changes
  app: {
    head: {
      title: 'Express Laundry Homepage',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
      ]
    }
  },

  modules: ['nuxt-lucide-icons'],

  lucide: {
    namePrefix: 'Lucide',
  }
})