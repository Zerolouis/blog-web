<template>
  <div>
    {{ CopyrightMap.get(copyright) }}
  </div>
</template>

<script setup lang="ts">
import { CopyrightMap } from "~/ts/enum/api.enum";

const props = defineProps<{
  copyright: number;
}>();
</script>

<style scoped lang="scss"></style>
