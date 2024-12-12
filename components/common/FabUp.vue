<template>
  <v-fab
    :active="offsetHeight > 400"
    class="me-4 up-fab"
    icon="mdi-arrow-up"
    @click="goTo(0)"
  />
</template>

<script setup lang="ts">
defineProps<{
  offsetHeight: number;
}>();
const goTo = useGoTo();
</script>

<style scoped lang="scss">
.up-fab {
  position: fixed;
  z-index: 999;
  right: 50px;
  bottom: 50px;
}
</style>
