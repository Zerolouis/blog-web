<template>
  <v-app class="container">
    <v-app-bar
        density="compact" elevation="0" class="bar text-white" :color="offsetHeight > 180? '#0a3d62' : 'transparent'"
    >
      <SiteNavigation />
    </v-app-bar>
    <v-main v-scroll="onScroll" >
      <slot/>
      <div style="height: 10000px"/>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
const offsetHeight = ref(0) // 页面偏移高度
// 页面滚动事件，用于计算顶栏效果
const onScroll = (e:any) => {
  offsetHeight.value = e.target.documentElement.scrollTop
}

</script>

<style lang="scss" scoped>
.bar{
  transition: all 0.5s linear;
}

.container {
  font-family: MiSans-Regular, sans-serif;
}


</style>
