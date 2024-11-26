// 强制身份验证
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return

  const {$pinia} = useNuxtApp()
  const userStore = useUserStore($pinia)
  const toast = useToastStore($pinia)
  const siteConfig = useSiteConfig($pinia)
  const {isLogin} = storeToRefs(siteConfig)
  const {token, user} = storeToRefs(userStore)

  if (!token.value.accessToken || !isLogin.value) {
    toast.error('没有权限访问,请先登录')
    return navigateTo('/auth/login')
  }

  if (token.value.accessToken && isLogin.value && !user.value.isLogin) {
    await userStore.getUserInfo()
    if (user.value.isLogin){
      return navigateTo(to)
    }
  }

  return
})
