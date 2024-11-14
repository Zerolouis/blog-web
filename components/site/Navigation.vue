<template>
  <div class="info-container">
    <SiteLogo class="bar-logo"/>
    <div class="btn-container">
      <v-btn variant="text" class="btn">博客</v-btn>
      <v-btn variant="text" class="btn">游记</v-btn>
      <v-btn variant="text" class="btn">简历</v-btn>
      <v-btn variant="text" class="btn">工具站</v-btn>
      <v-btn variant="text" class="btn">管理</v-btn>
      <v-btn icon @click="toggleTheme">
        <v-icon :icon="themeIcon"/>
      </v-btn>
      <v-btn icon @click="toggleTheme">
        <v-icon icon="mdi-github"/>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useTheme} from "vuetify";

const theme = useTheme();
const  toggleTheme =  () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
//console.log(name.value)
const themeIcon = computed(()=>{
  return theme.global.name.value === 'dark' ? 'mdi-white-balance-sunny': 'mdi-weather-night'
})
</script>

<style lang="scss" scoped>
.info-container {
  margin: 0 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .bar-logo {
    font-size: 1.2rem;
  }
}
</style>
