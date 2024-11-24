export default defineNuxtRouteMiddleware((to,from)=>{
  if (import.meta.server) return
  console.log('中间件 auth')
})
