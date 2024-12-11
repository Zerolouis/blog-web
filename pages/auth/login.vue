<template>
  <div>
    <AuthLoginPanel class="login-panel" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "desktop-home",
  middleware: ["user"],
});

useSeoMeta({
  title: "登录",
});
</script>

<style scoped lang="scss">
.login-panel {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
