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
        <v-card :class="'article-container-'+currentTheme" elevation="12">
          <div class="article-info">
            <div>
              <v-breadcrumbs class="breadcrumbs" density="compact" :items="['Foo', 'Bar', 'Fizz']">
                <template #divider>
                  <v-icon icon="mdi-chevron-right" />
                </template>
              </v-breadcrumbs>
            </div>
            <div class="info">
              <div class="info-container">
                <v-icon class="info-icon">
                  mdi-account-circle-outline
                </v-icon>
                Zerolouis
              </div>
              <div class="info-container">
                <v-icon class="info-icon">
                  mdi-clock-time-eight-outline
                </v-icon>
                time
              </div>
              <div class="info-container">
                <v-icon class="info-icon">
                  mdi-clock-time-eight-outline
                </v-icon>
                time
              </div>
              <div class="info-container">
                <v-icon class="info-icon">
                  mdi-book-open-variant-outline
                </v-icon>
                约3分钟
              </div>
            </div>
          </div>

          <div class="article-content">
            <client-only>
              <ArticleMarkdownPreview  :content="article?.content" />
            </client-only>
          </div>

          <div class="article-info">
            <div>
              转载方式
            </div>
            <div class="info">
              <ArticleCopyright copyright="CB"/>
            </div>
          </div>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script setup lang="ts">
import {useCustomTheme} from "~/composables/useCustomTheme";
const {currentTheme} = useCustomTheme()

definePageMeta({
  layout: 'desktop-home'
})

useHead({
  title: '文章'
})

const {data:article} = useFetch('/api/blog/article')

</script>

<style scoped lang="scss">
@use '/assets/scss/color';

@mixin article-info{
  .article-content{
    padding: 0 20px 20px 20px;
  }

  .article-info{

    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    align-items: center;

    .info{
      display: flex;
      .info-container{
        margin: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .info-icon{
        margin-right: 5px;
      }
    }

    .breadcrumbs{
      padding: 0;
    }

  }
}

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

.article-container-light{
  @include article-info;
  .article-info{
    background-color: #e8eaf6;
    color: color.$theme-light-info;
  }
}

.article-container-dark{
  @include article-info;
  .article-info{
    background-color: #616269;
    color: #d9d9d9;
  }
}


</style>
