<template>
  <v-container class="container" style="height: 100%; width: 100%">
    <v-col cols="12" class="container" :lg="6" xl="4" style="height: 100%">
      <AuthLoginPanel class="login-panel" />
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "desktop-home",
  middleware: ["user", "check-layout"],
});

useSeoMeta({
  title: "登录",
});
</script>

<style scoped lang="scss">
.login-panel {
  width: 100%;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
