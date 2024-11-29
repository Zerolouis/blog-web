export default defineNuxtRouteMiddleware((to, from) => {
  console.log("中间件global");
  console.log("路由 From", from.name, " to ", to.name);
  const { $pinia } = useNuxtApp();
  const userStore = useUserStore($pinia);
  const toast = useToastStore($pinia);
  const siteConfig = useSiteConfig($pinia);
  const { isLogin } = storeToRefs(siteConfig);
  const { token, user } = storeToRefs(userStore);

  // 如果获取过信息就跳过
  if (isLogin && user.value.isLogin) {
    toast.info("已经登录");
    return;
  }

  if (isLogin && token.value.accessToken) {
    toast.info("恢复登录");
    userStore.getUserInfo();
    // 请求用户信息
    return;
  }

  // 没有token直接通过
  if (!token.value.accessToken) {
    isLogin.value = false;
    user.value.isLogin = false;
    return;
  }
});
