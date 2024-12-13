<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <ManagerCategoryTree :update="update" />
        </v-col>
        <v-col cols="12" md="8">
          <ManagerCategoryDataTable @update-data="getUpdate" />
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

const update = ref(false);

const userStore = useUserStore();
const toast = useToastStore();

const getUpdate = (value: boolean) => {
  update.value = value;
};
</script>

<style scoped lang="scss"></style>
