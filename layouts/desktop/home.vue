<template>
  <div>
    <Head>
      <Link rel="icon" href="/favicon.ico" />
    </Head>
    <v-app
      :theme="theme"
      :class="{
        'bar-transparent': offsetHeight <= 180,
        'bar-color': offsetHeight > 180,
      }"
    >
      <v-app-bar density="compact" elevation="0" class="bar text-white">
        <SiteNavigation />
      </v-app-bar>
      <v-main v-scroll="onScroll">
        <slot />
      </v-main>
      <client-only>
        <SiteMessage />
      </client-only>
      <CommonFabUp :offset-height="offsetHeight" />
      <SiteFooter />
    </v-app>
  </div>
</template>

<script lang="ts" setup>
import { useCustomTheme } from "~/composables/useCustomTheme";
import { useUserStore } from "~/stores/userStore";

const offsetHeight = ref(0); // 页面偏移高度
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const goTo = useGoTo();
//console.log(user)
const { theme, vuetifyTheme } = useCustomTheme();

watch(vuetifyTheme, (newValue) => {
  console.log("主题改变", newValue);
  theme.value = newValue;
});

// 页面滚动事件，用于计算顶栏效果

const onScroll = (e: any) => {
  offsetHeight.value = e.target.documentElement.scrollTop;
};

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener("scroll", onScroll);
  }
});
</script>

<style lang="scss" scoped>
@use "/assets/scss/color";

.bar {
  transition: all 0.5s linear;
}

.bar-transparent {
  :deep(.v-app-bar.v-toolbar) {
    background: transparent
      linear-gradient(to bottom, rgba(0, 0, 0, 0.53), rgba(0, 0, 0, 0));
  }
}

.bar-color {
  :deep(.v-app-bar.v-toolbar) {
    background: #0a3d62;
  }
}
</style>
