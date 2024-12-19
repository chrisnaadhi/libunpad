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
    defaultTimezone: "Asia/Jakarta",
  },

  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    baseURL: process.env.AUTH_BASEURL,
    provider: {
      type: "authjs",
      trustHost: false,
      defaultProvider: "google",
      addDefaultCallbackUrl: true,
    },
  },

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    authGoogleClientId: process.env.GOOGLE_CLIENT_ID,
    authGoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    urlApiKandaga: process.env.URL_API_KANDAGA,
    directusUrl: process.env.DIRECTUS_BASE_URL,
    directusAuthToken: process.env.DIRECTUS_ACCESS_TOKEN,
    dbHost: process.env.DRIZZLE_HOST,
    dbUsername: process.env.DRIZZLE_USERNAME,
    dbName: process.env.DRIZZLE_DATABASE,
    dbPassword: process.env.DRIZZLE_PASSWORD,
    dbPort: Number(process.env.DRIZZLE_PORT),
    turnstile: {
      secretKey: process.env.TURNSTILE_SECRETKEY
    },
    app: {
      directusPublicUrl: process.env.DIRECTUS_BASE_URL,
      directusAuthToken: process.env.DIRECTUS_ACCESS_TOKEN,
    },
    public: {
      meiliHost: process.env.MEILI_HOST,
      meiliApiKey: process.env.MEILI_API_KEY,
      directusPublicUrl: process.env.DIRECTUS_BASE_URL,
      dSpacePublic: process.env.DSPACE_URL,
      dSpaceFront: process.env.DSPACE_FRONTEND,
      dSpaceAuthPublic: process.env.DSPACE_AUTH,
      dSpaceCredentials: `user=${process.env.DSPACE_EMAIL}&password=${process.env.DSPACE_PASSWORD}`,
    },
  },

  plausible: {
    enabled: true,
    ignoredHostnames: ["localhost"],
    hashMode: false,
    domain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN,
    apiHost: process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST,
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
    siteKey: process.env.TURNSTILE_SITEKEY,
  }
});