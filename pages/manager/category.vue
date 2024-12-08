<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <ManagerCategoryTree />
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
</script>

<style scoped lang="scss"></style>
