// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "nuxt-directus", "@pinia/nuxt"],
  unocss: {
    preflight: true,
  },
  directus: {
    url: process.env.DIRECTUS_BASE_URL,
    token: process.env.DIRECTUS_ACCESS_TOKEN,
  },
});
