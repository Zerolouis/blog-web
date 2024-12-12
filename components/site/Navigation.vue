<template>
  <div class="info-container">
    <SiteLogo class="bar-logo" />
    <div class="btn-container">
      <v-btn variant="text" class="btn" @click="router.push('/')">博客</v-btn>
      <v-btn variant="text" class="btn" disabled>游记</v-btn>
      <v-btn variant="text" class="btn" disabled>简历</v-btn>
      <v-btn variant="text" class="btn" disabled>工具站</v-btn>
      <!--      <v-btn variant="text" class="btn">管理</v-btn>-->
      <v-btn icon @click="changeTheme">
        <v-icon :icon="themeIcon" />
      </v-btn>

      <v-btn
        v-if="!user.isLogin"
        variant="text"
        class="btn"
        @click="navigateTo('/auth/login')"
        >登录</v-btn
      >
      <v-btn v-if="user.isLogin" id="avatar-menu" icon>
        <v-avatar size="small">
          <v-img alt="头像" :src="user.userInfo?.avatar" />
        </v-avatar>
      </v-btn>

      <v-menu activator="#avatar-menu">
        <v-card class="user-card">
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
              v-for="(item, i) in userItems"
              :key="i"
              :value="item"
              color="primary"
              density="compact"
              :disabled="item.disable"
            >
              <template #prepend>
                <v-icon :icon="item.icon" />
              </template>

              <v-list-item-title
                v-if="item.text == '退出登录'"
                @click="userStore.logout"
              >
                {{ item.text }}
              </v-list-item-title>
              <v-list-item-title v-else @click="navigateTo(item.path)">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCustomTheme } from "~/composables/useCustomTheme";
import { useUserStore } from "#imports";
import { useSiteInfo } from "~/stores/siteInfo";
const siteConfig = useSiteInfo();
const { darkMode } = storeToRefs(siteConfig);
const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { changeTheme } = useCustomTheme();
const themeIcon = computed(() => {
  return darkMode.value ? "mdi-white-balance-sunny" : "mdi-weather-night";
});
// 头像卡片
const userItems = reactive([
  {
    text: "个人中心",
    icon: "mdi-cog",
    path: "/person/index",
    disable: true,
  },
  {
    text: "私信",
    icon: "mdi-message",
    path: "/user/message",
    disable: true,
  },
  {
    text: "管理",
    icon: "mdi-cog",
    path: "/manager/dashboard",
    disable: false,
  },
  {
    text: "退出登录",
    icon: "mdi-logout",
    path: "/login",
    disable: false,
  },
]);
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

.user-card {
  width: 300px;

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
}
</style>
