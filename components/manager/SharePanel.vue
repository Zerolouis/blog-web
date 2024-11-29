<template>
  <v-card>
    <v-card-title class="bg-info panel-title">
      <span>文件分享</span>
      <v-btn
        size="small"
        variant="tonal"
        icon
        @click="showDialog = !showDialog"
      >
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-card-title>
  </v-card>

  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-card-title class="bg-info"> 添加文件 </v-card-title>
      <v-container>
        <v-form validate-on="blur">
          <v-select
            :rules="[(value) => checkEmptyName(value, '方式')]"
            label="分享方式"
            color="info"
          />
          <v-text-field
            :rules="[(value) => checkEmptyName(value, '分享链接')]"
            label="分享链接"
            color="info"
          />
          <v-textarea label="说明" color="info"> </v-textarea>
        </v-form>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn color="warning"> 取消 </v-btn>
        <v-btn color="primary"> 确定 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const showDialog = ref(true);
const shareMethods = reactive([
  {
    method: "baidu",
    title: "百度网盘",
    icon: "",
  },
]);
</script>

<style scoped lang="scss">
.panel-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
