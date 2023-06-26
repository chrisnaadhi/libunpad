// / https://v3.nuxtjs.org/api/configuration/nuxt.config
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
    "dayjs-nuxt",
    "@sidebase/nuxt-auth",
  ],
  unocss: {
    preflight: true,
  },
  directus: {
    url: process.env.DIRECTUS_BASE_URL,
    token: process.env.DIRECTUS_ACCESS_TOKEN,
  },
  i18n: {
    locales: [
      {
        name: "id",
        code: "id",
        file: "indonesia.ts",
      },
      {
        name: "en",
        code: "en",
        file: "english.ts",
      },
    ],
    strategy: "prefix_and_default",
    lazy: true,
    langDir: "lang",
    defaultLocale: "id",
    vueI18n: "./i18n.config.ts",
    skipSettingLocaleOnNavigate: true,
    detectBrowserLanguage: false,
    defaultDirection: "auto",
  },
  dayjs: {
    locales: ["id", "en"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "id",
    defaultTimezone: "Asia/Bangkok",
  },
  auth: {
    isEnabled: true,
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
    },
  },
  devServer: {
    https: {
      key: "localhost-key.pem",
      cert: "localhost.pem",
    },
  },
});
