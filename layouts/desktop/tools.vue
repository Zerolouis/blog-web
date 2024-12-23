<template>
  <v-app>
    <ClientOnly>
      <SiteMessage />
    </ClientOnly>
    <v-app-bar order="0" color="secondary" elevation="2" density="compact">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>
        {{ route?.meta.title }}
      </v-app-bar-title>

      <v-btn icon @click="changeTheme">
        <v-icon :icon="themeIcon" />
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" elevation="1">
      <v-list v-model:selected="openRouter" density="comfortable">
        <v-list-item link prepend-icon="mdi-home" @click="navigateTo('/')"
          >返回主页</v-list-item
        >
        <v-divider />
        <template v-for="item in naviRouterList" :key="item.name">
          <v-list-item
            v-if="!item.children"
            :prepend-icon="item.preIcon"
            :title="item.name"
            :value="item.value"
          />
          <v-list-group v-else :value="item.name">
            <template #activator="{ props }">
              <v-list-item
                :prepend-icon="item.preIcon"
                :title="item.name"
                v-bind="props"
              />
            </template>
            <v-list-item
              v-for="child in item.children"
              :key="child.value"
              :append-icon="child.preIcon"
              :title="child.name"
              :value="child.value"
            />
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
    <SiteFooter />
  </v-app>
</template>

<script setup lang="ts">
import type { NaviListItem } from "~/ts/interface/manager.interface";
import { useSiteInfo } from "~/stores/siteInfo";
import { useCustomTheme } from "~/composables/useCustomTheme";

useHead({
  title: "后台",
});
const siteConfig = useSiteInfo();
const { darkMode } = storeToRefs(siteConfig);
const { changeTheme } = useCustomTheme();
const themeIcon = computed(() => {
  return darkMode.value ? "mdi-white-balance-sunny" : "mdi-weather-night";
});

const route = useRoute();
const naviRouterList: Array<NaviListItem> = reactive([
  {
    preIcon: "mdi-view-dashboard-outline",
    name: "概览",
    value: "/tools/index",
  },
  {
    preIcon: "mdi-bookshelf",
    name: "装机配置",
    children: [
      {
        preIcon: "mdi-label-multiple-outline",
        name: "配置单",
        value: "/pc/tag",
      },
      {
        preIcon: "mdi-format-list-bulleted-type",
        name: "已保存",
        value: "/manager/category",
      },
      {
        preIcon: "mdi-file-document-multiple-outline",
        name: "发现",
        value: "/manager/article",
      },
    ],
  },
]);

const openRouter: Ref<string[]> = ref([]);
const drawer = ref<boolean | null>(null);
const { managerRouter } = storeToRefs(siteConfig);

if (openRouter.value.length === 0) {
  openRouter.value.push(route.path);
}

watch(openRouter, (newValue, oldValue) => {
  if (newValue.length > 0) {
    navigateTo(newValue[0]);
  } else {
    openRouter.value = oldValue;
  }
});
</script>

<style scoped lang="scss"></style>
