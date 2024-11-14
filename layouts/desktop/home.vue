<template>
  <v-app>
    <v-app-bar density="compact" class="bar">
      <SiteNavigation />
    </v-app-bar>
    <v-main class="container">
      <slot />
      <div style="height: 20000px;"/>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.container {
  font-family: MiSans-Regular, sans-serif;
}

// 控制滚动条
// @include scrollbar;

</style>