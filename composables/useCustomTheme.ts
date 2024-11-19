export function useCustomTheme() {
  const isDark = ref(false)
  const theme = ref('customLightTheme')
  const cookie = useCookie('color-scheme')

  if (cookie) {
    theme.value = String(cookie.value)
  }
  isDark.value = theme.value === 'customDarkTheme';

  const {$vuetify} = useNuxtApp()

  const vuetifyTheme = $vuetify.theme.global.name

  const vuetifyDark =  $vuetify.theme.current.value.dark

  const currentTheme = vuetifyDark ? 'dark' : 'light'


  return {isDark,theme,vuetifyDark,vuetifyTheme,currentTheme}
}
