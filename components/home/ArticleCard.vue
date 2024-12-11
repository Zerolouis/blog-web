<template>
  <div>
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        v-bind="props"
        :elevation="isHovering ? 12 : 3"
        @click="openArticleDetail(id)"
      >
        <v-img class="article-image" height="200" cover :src="picture" />
        <div class="article-info">
          <div class="title">
            {{ title }}
          </div>
          <div class="description">
            {{ description }}
          </div>
        </div>
        <div class="time-info">
          <div class="info-container">
            <v-icon class="info-icon" color="info">
              mdi-account-circle-outline
            </v-icon>
            {{ user }}
          </div>
          <div class="info-container">
            <v-icon class="info-icon" color="info">
              mdi-clock-time-eight-outline
            </v-icon>
            {{ uploadTime(createTime) }}
          </div>
          <div class="info-container">
            <v-icon class="info-icon" color="info">
              mdi-comment-outline
            </v-icon>
            {{ commentCount ? commentCount : "暂无评论" }}
          </div>
        </div>
      </v-card>
    </v-hover>
  </div>
</template>

<script setup lang="ts">
import type { ArticleCardInfo } from "~/ts/interface/home.interface";

import { useDayjs } from "#imports";

const dayjs = useDayjs();
defineProps<ArticleCardInfo>();

const uploadTime = (time: string) =>
  computed(() => {
    if (dayjs(new Date()).diff(time, "days") > 5) {
      return dayjs(time).format("YYYY-MM-DD");
    } else {
      return dayjs(time).fromNow();
    }
  });

const openArticleDetail = (id: string) => {
  navigateTo(`/article/${id}`);
};
</script>

<style scoped lang="scss">
@use "/assets/scss/color";

.article-info {
  margin: 20px;

  .title {
    font-size: 2rem;
  }

  .description {
    margin-top: 10px;
  }
}

.time-info {
  display: flex;
  height: 30px;
  justify-content: space-around;
  font-size: 0.8rem;
  align-items: center;
  background-color: rgb(var(--v-theme-background-secondary));
  color: rgb(var(--v-theme-info));

  .info-container {
    display: flex;
    align-items: center;

    .info-icon {
      margin-right: 5px;
    }
  }
}
</style>
