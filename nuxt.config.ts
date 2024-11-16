// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app:{
    head:{
      link:[{
        rel: 'preload',
        href: '/fonts/MiSans-Regular.woff2',
        type: 'font/woff2',
        as: 'font'
      },{
        rel: 'preload',
        href: '/fonts/临海隶书.ttf',
        type: 'font/ttf',
        as: 'font'
      },{
        rel: 'preload',
        href: '/fonts/Pacifico-Regular.ttf',
        type: 'font/ttf',
        as: 'font'
      }]
    }
  },
  devtools: {enabled: true},
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error 禁用vuetify配置文件报错提示
        config.plugins.push(vuetify({autoImport: true}))
      })
    },
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    'dayjs-nuxt'
  ],
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    }
  },
  css: [
    '~/assets/scss/_variable.scss'
  ],
  runtimeConfig: {
    api: 'http://localhost:9001/v1'
  },
  dayjs: {
    locales: ['zh','en'],
    plugins: ['relativeTime','utc','timezone'],
    defaultLocale: 'zh',
    defaultTimezone: 'Asia/Shanghai'
  },
})
