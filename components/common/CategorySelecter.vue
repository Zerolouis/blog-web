<template>
  <div>
    <v-select
      v-model="selectShow"
      label="分类"
      append-inner-icon="mdi-format-list-bulleted"
      item-title="name"
      :items="categorySelected"
      item-value="id"
      multiple
      chips
      return-object
      color="info"
      readonly
      @click="showSelector"
    />

    <v-dialog v-model="isShow" width="300">
      <v-card>
        <v-card-title class="bg-info text-white text-h5">
          选择标签
        </v-card-title>

        <v-treeview
          v-model:selected="categorySelected"
          :items="content"
          item-value="id"
          item-title="name"
          selectable
          return-object
          false-icon="mdi-checkbox-blank-outline"
          indeterminate-icon="mdi-checkbox-intermediate"
          true-icon="mdi-checkbox-outline"
          select-strategy="leaf"
        />
        <v-card-actions>
          <v-btn color="warning" @click="cancelBtn"> 清空</v-btn>
          <v-btn color="primary" @click="confirmBtn"> 确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import {
  type Category,
  type CategoryList,
  CategoryListSchema,
} from "~/ts/types/api.type";

// 弹窗控制
const isShow = ref(false);

const showSelector = () => {
  isShow.value = true;
};

const content: Ref<CategoryList | undefined> = ref();
const categorySelected = ref();
const selectShow = ref();
const toast = useToastStore();
const useStore = useUserStore();
defineExpose({
  categorySelected,
});
// 请求分类数据
const { data } = await useFetch("/api/manager/category", {
  method: "get",
  headers: {
    Authorization: useStore.getToken,
  },
});

// 校验数据
const { data: message } = await checkMessage(data.value);
const { data: result, success } = await CategoryListSchema.safeParseAsync(
  message?.data,
);

if (!success) {
  toast.error("数据错误！");
}

// 遍历并处理所有叶子节点
const traverse = (c: Category) => {
  if (!c) return;
  if (!c.children?.length) {
    c.children = undefined;
  }
  if (c.children) {
    for (let i = 0; i < c.children.length; i++) {
      traverse(c.children[i]);
    }
  }
};
if (result) {
  for (let i = 0; i < result.length; i++) {
    traverse(result[i]);
  }
}
console.log(result);
content.value = result;

// 取消按钮
const cancelBtn = () => {
  selectShow.value = [];
  categorySelected.value = [];
  isShow.value = false;
};

// 确认按钮
const confirmBtn = () => {
  selectShow.value = categorySelected.value;
  isShow.value = false;
};
</script>

<style scoped lang="scss"></style>
