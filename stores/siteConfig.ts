import type {Ref} from "vue";

export const useSiteConfig = defineStore('siteConfig', () => {
  const darkMode = ref(false)
  const currentTheme = ref('light')
  // 是否登录
  const isLogin:Ref<boolean> = ref(false)
  return {darkMode, currentTheme,isLogin}
},{
  persist:{
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ['isLogin']
  }
})
