<template>
  <div>
    <v-treeview
        :items="content"
        item-value="id"
        item-title="name"
        selectable
        return-object
        false-icon="mdi-checkbox-blank-outline"
        indeterminate-icon="mdi-checkbox-intermediate"
        true-icon="mdi-checkbox-outline"
        select-strategy="leaf"
    />
  </div>
</template>

<script setup lang="ts">

import {useUserStore} from "#imports";
import {type Category, CategoryListSchema} from "~/ts/types/api.type";


definePageMeta({
  layout: 'desktop-home'
})

const toast = useToastStore()
const content: any = ref([])

const useStore = useUserStore()
const {data} = await useFetch('/api/manager/category', {
  method: "get",
  headers: {
    Authorization: useStore.getToken
  }
})
const {data: message} = await checkMessage(data.value)
// console.log(message)
const {data: result} = await CategoryListSchema.safeParseAsync(message?.data)



const traverse = (c: Category) => {
  if (!c) return
  if (!c.children?.length) {
    c.children = undefined
  }
  if (c.children) {
    for (let i = 0; i < c.children.length; i++) {
      traverse(c.children[i])
    }
  }
}
if (result){
  for (let i = 0; i < result.length; i++) {
    traverse(result[i])
  }
}
console.log(result)
content.value = result


</script>

<style scoped lang="scss">

</style>
