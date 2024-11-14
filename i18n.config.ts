import {en} from "~/locales/en";
import {zh} from "~/locales/zh";

export default defineI18nConfig(()=>({
  locale: 'zh',
  messages: {
    zh: zh,
    en: en
  }
}))
