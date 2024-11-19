import {useTheme} from "vuetify";

export const useSiteConfig = defineStore('siteConfig', () => {
  const darkMode = ref(false)
  const currentTheme = ref('light')

  const theme = useTheme()

  /**
   * 获取当前主题颜色
   */
  function getTheme(): string {
    if (theme.global.current.value.dark) {
      currentTheme.value = 'dark'
      darkMode.value = true
      return 'dark'
    } else {
      currentTheme.value = 'light'
      darkMode.value = false
      return 'light'
    }
  }

  function changeTheme() {
    theme.global.name.value = darkMode.value ? 'customLightTheme' : 'customDarkTheme';
    getTheme()
  }

  return {darkMode, currentTheme, getTheme, changeTheme}
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
})
