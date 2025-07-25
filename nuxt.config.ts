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

  devtools: {
    enabled: true
  },

  routeRules: {
    "/api/**": { cors: true },
    "/visitor/rekap": { redirect: "/error" },
    "/pengajuan/unggah-mandiri/submit/**": {
      redirect: "/pengajuan/unggah-mandiri",
    }
  },

  modules: [
    "@unocss/nuxt",
    "nuxt-directus",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "dayjs-nuxt",
    "@sidebase/nuxt-auth",
    "@nuxtjs/plausible",
    "@nuxtjs/turnstile",
  ],

  unocss: {
    preflight: true,
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
    defaultTimezone: "Asia/Jakarta",
  },

  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: "AUTH_KANDAGA_ORIGIN",
    baseURL: process.env.AUTH_KANDAGA_BASEURL,
    provider: {
      type: "authjs",
      trustHost: false,
      defaultProvider: "google",
      addDefaultCallbackUrl: true,
    },
  },

  directus: {
    autoFetch: true,
    url: process.env.KANDAGA_DIRECTUS_BASE_URL,
    token: process.env.KANDAGA_DIRECTUS_ACCESS_TOKEN,
  },

  runtimeConfig: {
    authSecret: process.env.AUTH_KANDAGA_SECRET,
    authGoogleClientId: process.env.AUTH_KANDAGA_GOOGLE_CLIENT_ID,
    authGoogleClientSecret: process.env.AUTH_KANDAGA_GOOGLE_CLIENT_SECRET,
    urlApiKandaga: process.env.KANDAGA_URL_API_KANDAGA,
    directusUrl: process.env.KANDAGA_DIRECTUS_BASE_URL,
    directusAuthToken: process.env.KANDAGA_DIRECTUS_ACCESS_TOKEN,
    dbHost: process.env.KANDAGA_DRIZZLE_HOST,
    dbUsername: process.env.KANDAGA_DRIZZLE_USERNAME,
    dbName: process.env.KANDAGA_DRIZZLE_DATABASE,
    dbPassword: process.env.KANDAGA_DRIZZLE_PASSWORD,
    dbPort: Number(process.env.KANDAGA_DRIZZLE_PORT),
    turnstile: {
      secretKey: process.env.KANDAGA_TURNSTILE_SECRETKEY
    },
    public: {
      meiliHost: process.env.KANDAGA_MEILI_HOST,
      meiliApiKey: process.env.KANDAGA_MEILI_API_KEY,
      directusAuthToken: process.env.KANDAGA_DIRECTUS_ACCESS_TOKEN,
      directusPublicUrl: process.env.KANDAGA_DIRECTUS_BASE_URL,
      dSpacePublic: process.env.KANDAGA_SPACE_URL,
      dSpaceFront: process.env.KANDAGA_DSPACE_FRONTEND,
      dSpaceAuthPublic: process.env.KANDAGA_DSPACE_AUTH,
      dSpaceCredentials: `user=${process.env.KANDAGA_DSPACE_EMAIL}&password=${process.env.KANDAGA_DSPACE_PASSWORD}`,
    },
  },

  plausible: {
    enabled: true,
    ignoredHostnames: ["localhost"],
    hashMode: false,
    domain: process.env.KANDAGA_NUXT_PUBLIC_PLAUSIBLE_DOMAIN,
    apiHost: process.env.KANDAGA_NUXT_PUBLIC_PLAUSIBLE_API_HOST,
    autoPageviews: true,
  },

  compatibilityDate: "2024-07-22",

  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
  vite: {
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          target: "esnext",
        },
      },
    },
  },
  turnstile: {
    siteKey: process.env.KANDAGA_TURNSTILE_SITEKEY,
  }
});