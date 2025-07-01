export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  typescript: { typeCheck: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
  ],
  css: ['~/assets/css/main.css'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  ssr: false,
})
