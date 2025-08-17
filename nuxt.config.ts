export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  typescript: { typeCheck: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@sidebase/nuxt-auth',
  ],
  css: ['~/assets/css/main.css'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  ssr: false,
  auth: {
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'github',
      addDefaultCallbackUrl: true,
    },
    enableGlobalAppMiddleware: false, // Disable global middleware to control auth per page
    origin: process.env.NUXT_AUTH_ORIGIN || 'http://localhost:3000', // Base URL for production/local
  },
  runtimeConfig: {
    public: {
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    },
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    AUTH_SECRET: process.env.NUXT_AUTH_SECRET,
  },
})
