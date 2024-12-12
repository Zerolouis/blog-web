<template>
  <v-container class="container" style="height: 100%; width: 100%">
    <v-col cols="12" class="container" :lg="6" xl="4" style="height: 100%">
      <v-card class="register-panel">
        <v-card-title class="bg-error"> 提示 </v-card-title>
        <v-container> 暂未开放注册 </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="navigateTo('/')"> 返回首页 </v-btn>
        </v-card-actions>
      </v-card>
      <!--<AuthRegisterPanel class="register-panel" />-->
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "desktop-home",
  middleware: ["user", "check-layout"],
});
</script>

<style scoped lang="scss">
.register-panel {
  width: 100%;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
