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
      <v-app-bar
        density="compact"
        order="1"
        elevation="0"
        class="bar text-white"
      >
        <!--<SiteNavigation />-->
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <SiteLogo />
        <v-spacer />
        <v-btn icon @click="changeTheme">
          <v-icon :icon="themeIcon" />
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" order="0" elevation="1">
        <div v-if="user.isLogin">
          <div class="user-info bg-info">
            <v-avatar size="60">
              <v-img
                v-if="user.userInfo?.avatar"
                :src="user.userInfo?.avatar"
                alt="用户头像"
              />
              <v-icon v-else icon="mdi-account-circle-outline" />
            </v-avatar>
            <div class="user-nickname">
              {{ user.userInfo?.nickname }}
            </div>
            <div class="user-secondary">
              {{ user.userInfo?.username }}
            </div>
          </div>
          <v-list density="compact">
            <v-list-item
              link
              prepend-icon="mdi-logout"
              @click="userStore.logout"
            >
              退出登录
            </v-list-item>
            <v-list-item
              link
              prepend-icon="mdi-cog"
              @click="navigateTo('/manager')"
            >
              管理
            </v-list-item>
          </v-list>
        </div>

        <v-list>
          <v-list-item
            v-if="!user.isLogin"
            link
            prepend-icon="mdi-login"
            title="登录"
            @click="navigateTo('/auth/login')"
          />
          <v-divider />
          <v-list-item
            link
            title="博客主页"
            prepend-icon="mdi-home"
            @click="navigateTo('/')"
          />
          <v-list-item
            v-tooltip="'正在施工'"
            prepend-icon="mdi-car-multiple"
            link
            title="游记"
            disabled
          />
          <v-list-item
            v-tooltip="'正在施工'"
            prepend-icon="mdi-file-document-outline"
            link
            title="简历"
            disabled
          />
        </v-list>
      </v-navigation-drawer>
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
import { useSiteInfo } from "~/stores/siteInfo";

const siteConfig = useSiteInfo();
const { darkMode } = storeToRefs(siteConfig);
const offsetHeight = ref(0); // 页面偏移高度
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const drawer = ref(false);
//console.log(user)
const { theme, vuetifyTheme } = useCustomTheme();

const { changeTheme } = useCustomTheme();
const themeIcon = computed(() => {
  return darkMode.value ? "mdi-white-balance-sunny" : "mdi-weather-night";
});

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
  transition: color 0.5s ease-in-out;
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

.user-info {
  width: 100%;
  text-align: center;
  padding: 10px;
  //background-color: aliceblue;
}

.user-avatar {
  margin-top: 10px;
}

.user-nickname {
  margin-top: 5px;
  font-weight: bold;
}

.user-secondary {
  font-size: 0.8em;
  //color: #949494;
}
</style>
