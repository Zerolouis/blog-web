import type {Ref} from "vue";
import {useSiteConfig} from "~/stores/siteConfig";
import {usePinia} from "#build/imports";

export function useCustomTheme() {
  // cookies 中是否启用深色模式
  const isDark: Ref<boolean> = ref(false)
  // cookies 中的主题名称
  const theme: Ref<string> = ref('customLightTheme')
  const cookie = useCookie('color-scheme')
  const siteConfig = useSiteConfig(useNuxtApp().$pinia)
  const {darkMode, currentTheme} = storeToRefs(siteConfig)

  const {$vuetify} = useNuxtApp()

  if (cookie) {
    theme.value = String(cookie.value)
  }
  isDark.value = theme.value === 'customDarkTheme';
  if (!isDark.value) {
    currentTheme.value = 'light'
    darkMode.value = false
  } else {
    currentTheme.value = 'dark'
    darkMode.value = true
  }

  /**
   * 从 Vuetify 获取当前主题名称
   */
  const vuetifyTheme = $vuetify.theme.global.name

  /**
   * 从 Vuetify 获取当前是否为深色模式
   */
  const vuetifyDark = $vuetify.theme.current.value.dark

  /**
   * 改变主题
   */
  const changeTheme = () => {
    if ($vuetify.theme.current.value.dark) {
      $vuetify.theme.global.name.value = 'customLightTheme'
      currentTheme.value = 'light'
      darkMode.value = false
    } else {
      $vuetify.theme.global.name.value = 'customDarkTheme';
      currentTheme.value = 'dark'
      darkMode.value = true
    }
  }

  return {isDark: toRef(isDark), theme: toRef(theme), vuetifyDark, vuetifyTheme, changeTheme}
}
