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
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" elevation="1">
      <v-list v-model:selected="openRouter" density="comfortable">
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
              :prepend-icon="child.preIcon"
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

useHead({
  title: "摸鱼Blog - 后台",
});
const route = useRoute();
const naviRouterList: Array<NaviListItem> = reactive([
  {
    preIcon: "mdi-view-dashboard-outline",
    name: "概览",
    value: "/manager/dashboard",
  },
  {
    preIcon: "mdi-book-edit-outline",
    name: "文章撰写",
    value: "/manager/write",
  },
  {
    preIcon: "mdi-bookshelf",
    name: "内容管理",
    children: [
      {
        // preIcon: 'mdi-view-dashboard-outline',
        name: "标签",
        value: "/manager/tag",
      },
      {
        // preIcon: 'mdi-view-dashboard-outline',
        name: "分类",
        value: "/manager/category",
      },
    ],
  },
  {
    preIcon: "mdi-account-group",
    name: "用户管理",
    children: [
      {
        // preIcon: 'mdi-view-dashboard-outline',
        name: "用户列表",
        value: "/manager/user/list",
      },
      {
        // preIcon: 'mdi-view-dashboard-outline',
        name: "角色列表",
        value: "/manager/user/role",
      },
      {
        // preIcon: 'mdi-view-dashboard-outline',
        name: "权限列表",
        value: "/manager/user/permission",
      },
    ],
  },
]);

const openRouter = ref([]);
const drawer = ref(true);

const siteConfig = useSiteConfig();
const { managerRouter } = storeToRefs(siteConfig);

watch(openRouter, (newValue) => {
  navigateTo(newValue[0]);
});
</script>

<style scoped lang="scss"></style>
