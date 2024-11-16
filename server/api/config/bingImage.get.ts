import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const { data } = await $fetch(useRuntimeConfig().api + '/image/bing')
  return data
})
