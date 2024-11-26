<template>
<div>
  <AuthRegisterPanel class="register-panel" />
</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "desktop-home",
  middleware: ['user']
})
</script>

<style scoped lang="scss">
.register-panel {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 5px 5px 15px 1px rgb(0, 0, 0, 0.2);
}
</style>
