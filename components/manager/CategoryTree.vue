<template>
  <div>
    <v-card>
      <v-card-title class="bg-accent card-title">
        <div>分类</div>
        <v-btn variant="text" @click="getContent">
          <v-icon size="large">mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-treeview
        :items="content"
        item-value="id"
        item-title="name"
        return-object
        false-icon="mdi-checkbox-blank-outline"
        indeterminate-icon="mdi-checkbox-intermediate"
        true-icon="mdi-checkbox-outline"
        select-strategy="leaf"
        density="compact"
        open-all
      />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import {
  type Category,
  type CategoryList,
  CategoryListSchema,
} from "~/ts/types/api.type";

const content = ref();
const userStore = useUserStore();
const toast = useToastStore();
const props = defineProps<{
  update: boolean;
}>();

watch(props, () => {
  getContent();
});

const getContent = async () => {
  // 请求分类数据
  const { data } = await useFetch("/api/manager/category/tree", {
    method: "get",
    headers: {
      Authorization: userStore.getToken,
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
  // console.log("获取分类", result);
  content.value = result;
};

await getContent();
</script>

<style scoped lang="scss">
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
