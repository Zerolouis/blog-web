<template>
  <div>
    Hello world!
  </div>
</template>

<script setup lang="ts">
const { setLocale } = useI18n()
definePageMeta({
  layout: 'desktop-home'
})

useHead({
  title: '摸鱼Blog - 首页'
})
</script>

<style lang="scss" scoped>

</style>