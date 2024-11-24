export default defineNuxtRouteMiddleware((to,from)=>{
  console.log('中间件global')
  console.log('路由 From',from.name,' to ',to.name)
  const {$pinia} = useNuxtApp()
  const userStore = useUserStore($pinia)
  const toast = useToastStore($pinia)
  const siteConfig = useSiteConfig($pinia)
  const {isLogin} = storeToRefs(siteConfig)
  const {token,user} = storeToRefs(userStore)

  // 如果获取过信息就跳过
  if (isLogin && user.value.isLogin){
    return
  }

  if (isLogin && token.value.accessToken ){
    toast.info('恢复登录')

    // 请求用户信息

    return
  }

  // token丢失，重置登录状态
  if (isLogin && !token.value.accessToken){
    toast.warning('登录已过期，请重新登录')
    isLogin.value = false
    return
  }

  // 没有token直接通过
  if (!token.value.accessToken){
    isLogin.value = false
    return
  }




})
