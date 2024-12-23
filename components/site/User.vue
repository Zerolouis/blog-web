<template>
  <div>
    <v-btn
      v-if="!user.isLogin"
      variant="text"
      class="btn"
      @click="navigateTo('/auth/login')"
      >登录
    </v-btn>
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
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

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

<style scoped lang="scss">
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
