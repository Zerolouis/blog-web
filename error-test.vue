<template>
<div class="error-info-container">
  <div class="title">喜报,出错啦</div>
  <div v-if="error?.statusCode">
    {{error?.statusCode ||  404 }}
  </div>
  <div v-if="error?.statusMessage">
    {{error?.statusMessage ||  '没有statusMessage呢'}}
  </div>
  <div v-if="error?.cause">
    {{error?.cause}}
  </div>
  <div v-if="error?.message">
    {{error?.message}}
  </div>
  <div v-if="error?.name">
    {{error?.name }}
  </div>
  <div v-if="error?.stack">
    {{error?.stack}}
  </div>
</div>
</template>

<script setup lang="ts">
defineProps({
  error: Object
})
</script>

<style scoped lang="scss">
.error-info-container{
  .title{
    text-align: center;
  }
}
</style>
