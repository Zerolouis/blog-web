<template>
<div>
  <v-parallax
      src="https://i.imgur.com/xjIZJxs.png"
      height="400"
      class="article-title-pic"
  >
    <div class="article-title-text d-flex flex-column fill-height justify-center align-center text-white">
      文章标题
    </div>
  </v-parallax>

  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <div>
            面包屑
          </div>
          <div>
            时间信息
          </div>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="article-container">
          <ArticleMarkdownPreview :content="article?.content" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: 'desktop-home'
})

const {data:article} = useFetch('/api/blog/article')
</script>

<style scoped lang="scss">
.article-title-pic {
  margin-top: -50px;
  :deep(.v-img__img){
    -webkit-filter: brightness(60%);
    filter: brightness(60%);
  }
  .article-title-text{
    font-size: 3.5rem;
    font-family: 临海隶书, sans-serif;
    margin-top: 50px;
  }
}

.article-container{
  padding: 10px 20px;

}
</style>
