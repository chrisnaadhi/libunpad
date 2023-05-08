import id from "~/composables/locale/id-locale.json";
import en from "~/composables/locale/en-locale.json";

export default defineI18nConfig((nuxt) => ({
  legacy: false,
  locale: "id",
  messages: {
    id,
    en,
  },
}));
