export default defineNuxtRouteMiddleware((to,from)=>{
  console.log('路由 From',from.name,' to ',to.name)
})
