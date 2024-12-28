<template>
  <div class="info-container">
    <SiteLogo class="bar-logo" />
    <div class="btn-container">
      <v-btn variant="text" class="btn" @click="router.push('/')">博客</v-btn>
      <v-btn variant="text" class="btn" disabled>游记</v-btn>
      <v-btn variant="text" class="btn" disabled>简历</v-btn>
      <v-btn variant="text" class="btn" @click="router.push('/tools')"
        >工具站</v-btn
      >
      <v-btn icon @click="changeTheme">
        <v-icon :icon="themeIcon" />
      </v-btn>

      <SiteUser />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCustomTheme } from "~/composables/useCustomTheme";
import { useSiteInfo } from "~/stores/siteInfo";
const siteConfig = useSiteInfo();
const { darkMode } = storeToRefs(siteConfig);
const router = useRouter();
const { changeTheme } = useCustomTheme();
const themeIcon = computed(() => {
  return darkMode.value ? "mdi-white-balance-sunny" : "mdi-weather-night";
});
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
  .btn-container {
    display: flex;
    align-items: center;
  }
}
</style>
