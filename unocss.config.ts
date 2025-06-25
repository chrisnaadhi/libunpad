import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: [["btn", "px-4 py-2 rounded no-underline"]],
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      unpad: "#F9B129",
      kandaga: "#FFA100"
    }
  }
});
