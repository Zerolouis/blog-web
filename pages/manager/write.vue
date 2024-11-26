<template>
<div>
  <v-container>
    <v-row>
      <v-col cols="12" :md="8">
        编辑器
      </v-col>
      <v-col cols="12" :md="4">
        工具栏
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'desktop-manager',
  middleware: 'auth',
  title: '撰写文章'
})
</script>

<style scoped lang="scss">

</style>