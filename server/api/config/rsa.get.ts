export default defineEventHandler(async ()=>{
  let data:any = null
  await $fetch(useRuntimeConfig().api+'/security/rsa').then((r) => {
    data = r
  }).catch(()=>{
    throw Error('后端连接失败')
  })
  return data
})
