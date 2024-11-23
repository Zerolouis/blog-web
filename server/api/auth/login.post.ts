export default defineEventHandler(async (event)=>{
  let data:any = null
  const body = readBody(event)
  await $fetch(useRuntimeConfig().api+'/user/login',{
    method: 'POST',
    body
  }).then((r) => {
    data = r
  }).catch(()=>{
    throw Error('后端连接失败')
  })
  return data
})
