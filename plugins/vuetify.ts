import {createVuetify} from 'vuetify'
import type {ThemeDefinition} from 'vuetify'
import {zhHans} from "vuetify/locale";
import {en} from "~/locales/en";

export default defineNuxtPlugin((app) => {

  const customLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
      primary: '#079992',
      secondary: '#4a69bd',
      accent: '#0a3d62',
      error: '#b71540',
      warning: '#f6b93b',
      info: '#6a89cc',
      success: '#78e08f',
      background: '#dfe4ea'
    }
  }

// Vuetify 暗色主题
  const customDarkTheme: ThemeDefinition = {
    dark: true,
    colors: {
      primary: '#079992',
      secondary: '#4a69bd',
      accent: '#0a3d62',
      error: '#b71540',
      warning: '#f6b93b',
      info: '#6a89cc',
      success: '#78e08f',
      background: '#2f3542'
    }
  }

  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'customLightTheme',
      themes: {
        customLightTheme,
        customDarkTheme
      },
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 2,
        darken: 2
      }
    },
    locale: {
      locale: 'zh',
      messages: {
        zhHans, en
      }
    },
    icons: {
      defaultSet: 'mdi'
    }
  })
  app.vueApp.use(vuetify)
})
