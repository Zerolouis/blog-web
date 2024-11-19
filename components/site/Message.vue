<template>
  <v-snackbar
      v-model="toast.visible"
      :color="toast.color"
      min-width="300"
      rounded="pill"
      timeout="-1"
  >
    {{ toast.msg }}
    <template #actions>
      <v-btn
          color="white"
          icon="mdi-close"
          @click="toast.visible = false"
      />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useToastStore } from '~/stores/toast'

const toast = useToastStore()
</script>

<style scoped lang="scss">

</style>
