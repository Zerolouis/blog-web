<template>
  <v-app :theme="theme">
    <v-app-bar
        density="compact" elevation="0" class="bar text-white" :color="offsetHeight > 180? '#0a3d62' : 'transparent'"
    >
      <SiteNavigation/>
    </v-app-bar>
    <v-main v-scroll="onScroll">
      <slot/>
    </v-main>
    <client-only>
      <SiteMessage/>
    </client-only>
    <SiteFooter/>
  </v-app>
</template>

<script lang="ts" setup>
import {useCustomTheme} from "~/composables/useCustomTheme";

const offsetHeight = ref(0) // 页面偏移高度

const {theme,vuetifyTheme} =  useCustomTheme()

watch(vuetifyTheme,(newValue)=>{
  console.log('主题改变',newValue)
  theme.value = newValue
})

// 页面滚动事件，用于计算顶栏效果
const onScroll = (e: any) => {
  offsetHeight.value = e.target.documentElement.scrollTop
}

</script>

<style lang="scss" scoped>
@use '/assets/scss/color';

.bar {
  transition: all 0.5s linear;
}

</style>
