<template>
  <v-snackbar
    v-model="visible"
    :color="color"
    min-width="300"
    rounded="pill"
    timeout="-1"
  >
    <span class="text-white">{{ msg }}</span>
    <template #actions>
      <v-btn color="white" icon="mdi-close" @click="visible = false" />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useToastStore } from "~/stores/toast";

const toast = useToastStore();
const { visible, color, msg } = storeToRefs(toast);
</script>

<style scoped lang="scss"></style>
