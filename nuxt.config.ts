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
    "@nuxt/image",
    "@nuxtjs/i18n",
    "dayjs-nuxt",
    "@sidebase/nuxt-auth",
    "@sidebase/nuxt-pdf",
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
    defaultLocale: "id",
    strategy: "prefix_and_default",
    lazy: true,
    langDir: "lang",
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
    // provider: {
    //   type: "authjs",
    // },
    defaultProvider: "google",
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    urlApiKandaga: process.env.URL_API_KANDAGA,
    directusUrl: process.env.DIRECTUS_BASE_URL,
    dbHost: process.env.DRIZZLE_HOST,
    dbUsername: process.env.DRIZZLE_USERNAME,
    dbName: process.env.DRIZZLE_DATABASE,
    dbPassword: process.env.DRIZZLE_PASSWORD,
    dbPort: Number(process.env.DRIZZLE_PORT),
    dSpaceURL: process.env.DSPACE_URL,
    dSpaceAuth: process.env.DSPACE_AUTH,
    dSpaceEmail: process.env.DSPACE_EMAIL,
    dSpacePassword: process.env.DSPACE_PASSWORD,
    public: {
      meiliHost: process.env.MEILI_HOST,
      meiliApiKey: process.env.MEILI_API_KEY,
      dSpacePublic: process.env.DSPACE_URL,
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
});

// Activate Local SSL with this command on CLI
// SET NODE_TLS_REJECT_UNAUTHORIZED=0
