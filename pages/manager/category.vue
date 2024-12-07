<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <ManagerCategoryTree :categories="result || []" />
        </v-col>
        <v-col cols="12" md="8">
          <ManagerCategoryDataTable />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { CategoryListSchema } from "~/ts/types/api.type";

definePageMeta({
  layout: "desktop-manager",
  title: "分类",
});

const userStore = useUserStore();
const toast = useToastStore();

// 请求分类数据
const { data } = await useFetch("/api/manager/category", {
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
</script>

<style scoped lang="scss"></style>
