<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <h1>欢迎使用摸鱼Blog工具站！</h1>
          <p>
            这里主要是个人写的一些小工具，您可以在侧边栏查看所有功能，有需要的功能或建议也可以在仓库提出issue或直接PR
          </p>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card variant="flat" class="recommend-container">
            <v-card-title class="title"> 推荐功能 </v-card-title>
            <div class="background">
              <v-icon size="100" color="rgba(231, 182, 165,0.5)">
                mdi-star-outline
              </v-icon>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card variant="flat" class="recommend-container">
            <v-card-title class="title"> 全部功能 </v-card-title>
            <div class="background">
              <v-icon size="100" color="rgba(231, 182, 165,0.5)">
                mdi-list-box-outline
              </v-icon>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card variant="flat" class="recommend-container">
            <v-card-title class="title"> 最近使用 </v-card-title>
            <div class="background">
              <v-icon size="100" color="rgba(57, 100, 191,0.5)">
                mdi-history
              </v-icon>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "desktop-tools",
  title: "概览",
});
</script>

<style scoped lang="scss">
.recommend-container {
  .background {
    position: absolute;
    bottom: -20px;
    right: 50px;
  }
}
</style>
