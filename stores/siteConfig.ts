import {useTheme} from "vuetify";

export const useSiteConfig = defineStore('siteConfig', () => {
  const darkMode = ref(false)
  const currentTheme = ref('light')

  return {darkMode, currentTheme}
})
