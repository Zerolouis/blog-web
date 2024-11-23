<template>
<div>
  test
</div>
</template>

<script setup lang="ts">
import {rsaEncode} from "~/composables/useSecurity";

console.log(await rsaEncode('test'));
//console.log(data.value.)
</script>

<style scoped lang="scss">

</style>
