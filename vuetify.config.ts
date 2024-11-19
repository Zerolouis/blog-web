import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import type {ThemeDefinition} from "vuetify";

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
    background: '#dfe4ea',
    'background-secondary': '#e8eaf6'
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
    info: '#ffffff',
    success: '#78e08f',
    background: '#212121',
    surface: '#252a34',
    'background-secondary': '#616269'
  }
}

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'customLightTheme',
    themes: {
      customLightTheme,
      customDarkTheme
    }
  },
  localeMessages: ['zhHans'],
  icons: {
    defaultSet: 'mdi'
  },
})
