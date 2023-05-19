// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "in-out" },
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
      ],
    },
  },
  routeRules: {
    "/api/**": { cors: true },
    "/visitor/rekap": { redirect: "/error" },
  },
  modules: [
    "@unocss/nuxt",
    "nuxt-directus",
    "@pinia/nuxt",
    "@nuxt/image-edge",
    "@nuxtjs/i18n",
  ],
  unocss: {
    preflight: true,
  },
  directus: {
    url: process.env.DIRECTUS_BASE_URL,
    token: process.env.DIRECTUS_ACCESS_TOKEN,
  },
  i18n: {
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en",
        file: "en-EN.ts",
      },
      {
        code: "id",
        file: "id-ID.ts",
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "id",
    vueI18n: "./i18n.config.ts",
    skipSettingLocaleOnNavigate: true,
  },
});
