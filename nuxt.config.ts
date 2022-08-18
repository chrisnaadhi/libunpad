import { defineNuxtConfig } from "nuxt";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import transformerDirective from "@unocss/transformer-directives";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@unocss/nuxt"],
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    transformers: [transformerDirective(), transformerVariantGroup()],
    shortcuts: {
      btn: "px-4 py-2 mx-2 border-none rounded cursor-pointer",
    },
  },
});
