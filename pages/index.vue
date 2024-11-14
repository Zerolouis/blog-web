<template>
<NuxtLayout>
  <v-app>
    <div>{{ $t('welcome') }}</div>
    <v-btn @click="setLocale('zh')">中文</v-btn>
    <v-btn @click="setLocale('en')">English</v-btn>
  </v-app>
</NuxtLayout>
</template>

<script setup lang="ts">
const { setLocale } = useI18n()
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
@include scrollbar;
</style>
