<template>
  <div id="logo-text" @click="navigateTo('/')">
    <span id="logo-text-pre"> 摸鱼 </span>
    <span id="logo-text-suf"> Blog </span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#logo-text {
  will-change: font-family;
  cursor: pointer;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  &-pre {
    font-family: 临海隶书, sans-serif;
  }
  &-suf {
    font-family: Pacifico, sans-serif;
  }
}
</style>
