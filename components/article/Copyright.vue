<template>
  <div>
    {{ copyrightTextMap.get(copyright) }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  copyright: string;
}>();

const copyrightTextMap = new Map([
  ["0", "🚫禁止转载"],
  ["1", "©️允许根据协议转载"],
  ["2", "⭕允许转载"],
  ["AA", "署名（BY）"],
  ["AB", "署名-非商业性使用 （BY-NC）"],
  ["BA", "署名-禁止演绎 （BY-ND）"],
  ["BB", "署名-非商业性使用-禁止演绎 （BY-NC-ND）"],
  ["CA", "署名-相同方式共享（BY-SA）"],
  ["CB", "署名-非商业性使用-相同方式共享（BY-NC-SA）"],
]);
</script>

<style scoped lang="scss"></style>
