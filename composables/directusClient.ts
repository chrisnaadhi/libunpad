import { createDirectus, rest, staticToken } from "@directus/sdk";

const config = useRuntimeConfig();
export const directusClient = createDirectus(config.directusUrl)
  .with(staticToken(config.directusAuthToken))
  .with(rest());
