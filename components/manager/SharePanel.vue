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

    <v-card-text class="none-text-tip"> 暂无文件 </v-card-text>
  </v-card>

  <v-dialog v-model="showDialog" width="500">
    <v-card>
      <v-card-title class="bg-info"> 添加文件 </v-card-title>
      <v-container>
        <v-form validate-on="blur" ref="form">
          <v-select
            :rules="[(value) => checkEmptyName(value, '分享方式')]"
            label="分享方式"
            :items="shareMethods"
            item-value="id"
            item-title="title"
            color="info"
            v-model="method"
          />
          <v-text-field
            :rules="[
              (value) => checkEmptyName(value, '分享链接'),
              (value) => (checkHttpsAndHttp(value) ? true : '链接格式错误'),
            ]"
            label="分享链接"
            color="info"
            v-model="url"
          />
          <v-textarea
            messages="该说明将显示在下载按钮上"
            label="说明"
            color="info"
            counter
            v-model="description"
          >
          </v-textarea>
        </v-form>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn color="warning"> 取消 </v-btn>
        <v-btn color="primary" @click="addFile"> 确定 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  type FileShareListItem,
  shareCategory,
} from "~/ts/interface/api.interface";

const showDialog = ref(false);
const shareMethods = reactive(shareCategory);
const method = ref();
const url = ref();
const description = ref();
const form: any = ref(null);

const fileList: Ref<Array<FileShareListItem>> = ref([]);

onMounted(() => {
  showDialog.value = true;
});

const addFile = () => {
  console.log(method.value, url.value, description.value);
};
</script>

<style scoped lang="scss">
.panel-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.none-text-tip {
  text-align: center;
  margin-top: 20px;
}
</style>
