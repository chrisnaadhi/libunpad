import id from "./lang/indonesia";
import en from "./lang/english";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "id",
  fallbackLocale: "id",
  messages: {
    id: id,
    en: en,
  },
}));
