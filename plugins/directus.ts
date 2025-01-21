import { createDirectus, rest, readItem, readItems, staticToken, uploadFiles } from "@directus/sdk";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const directus = createDirectus(config.app.directusPublicUrl).with(staticToken(config.app.directusAuthToken)).with(rest())
  return {
    provide: { directus, readItem, readItems, uploadFiles }
  }
})