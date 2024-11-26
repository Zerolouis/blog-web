import {zhHans} from "~/locales/zh";
import {en} from "~/locales/en";

export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    zhHans,
    en
  },
  locale: "zhHans",
}))
