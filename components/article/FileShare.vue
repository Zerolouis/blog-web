<template>
  <div>
    <v-card :variant="isMobile ? 'flat' : 'elevated'">
      <v-card-title class="bg-primary"> 文件 </v-card-title>
      <v-container>
        <v-row>
          <template v-for="(item, index) in share" :key="index">
            <v-col cols="6" sm="4" md="3" lg="2" xl="2" xxl="2">
              <ArticleShareCard v-bind="item" />
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { FileShareQuery } from "~/ts/types/api.type";

const { isMobile } = useDevice();

defineProps<{
  share: FileShareQuery;
}>();
</script>

<style scoped lang="scss"></style>
