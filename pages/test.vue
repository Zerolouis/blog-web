<template>
<div>
  test
</div>
</template>

<script setup lang="ts">
import {rsaEncode} from "~/composables/useSecurity";

console.log(await rsaEncode('test'));
//console.log(data.value.)

definePageMeta({
  layout: 'desktop-home'
})

const toast = useToastStore()
toast.success('错误')
</script>

<style scoped lang="scss">

</style>
