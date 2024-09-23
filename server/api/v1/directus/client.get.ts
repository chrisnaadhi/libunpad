import { directusClient } from "~/composables/directusClient"
import { readItems } from "@directus/sdk"

export default defineEventHandler(async (event) => {
  const request = await directusClient.request(
    readItems("koleksi_gallery")
  )

  return {
    gallery: request
  }
})