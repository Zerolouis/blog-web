<template>
  <div>
    <v-hover v-slot="{ isHovering, props }">
      <v-card
          v-bind="props"
          :elevation="isHovering ? 12 : 3"
      >
        <v-img class="article-image" height="200" cover :src="image"/>
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
            {{ account }}
          </div>
          <div class="info-container">
            <v-icon class="info-icon" color="info">
              mdi-clock-time-eight-outline
            </v-icon>
            {{ uploadTime(upload) }}
          </div>
          <div class="info-container">
            <v-icon class="info-icon" color="info">
              mdi-comment-outline
            </v-icon>
            {{ comment }}
          </div>
        </div>
      </v-card>
    </v-hover>
  </div>
</template>

<script setup lang="ts">
import type {ArticleCardInfo} from "~/ts/interface/home.interface";

import {useDayjs} from "#imports";

const dayjs = useDayjs();
const props = withDefaults(defineProps<ArticleCardInfo>(), {
  id: '1',
  title: '文章标题',
  description: '文章描述',
  account: 'Zerolouis',
  image: 'https://img.home.zeroh.top:12443/i/2024/11/15/fog-4436636-673637e8d717a.jpg',
  upload: '2018-04-04T16:00:00.000Z',
  comment: 0
})
console.log()

const uploadTime = (time:string) => computed(()=>{
  if (dayjs(new Date()).diff(props.upload,'days') > 5){
    return dayjs(props.upload).format('YYYY-MM-DD')
  } else {
    return dayjs(props.upload).fromNow()
  }
})


</script>

<style scoped lang="scss">
@use '/assets/scss/color';

.article-info {
  margin: 20px;

  .title {
    font-size: 2rem;
    color: color.$theme-light-title
  }

  .description {
    margin-top: 10px;
    color: color.$theme-light-content;
  }
}

.time-info {
  display: flex;
  height: 30px;
  justify-content: space-around;
  font-size: 0.8rem;
  align-items: center;
  background-color: #e8eaf6;
  color: color.$theme-light-info;

  .info-container {
    display: flex;
    align-items: center;

    .info-icon {
      margin-right: 5px;
    }

  }
}
</style>
