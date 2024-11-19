import zhHans from "~/locales/zhHans";
import en from "~/locales/en";

export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    zhHans,
    en
  },
  locale: "zhHans",
}))
