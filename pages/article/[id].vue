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

                <v-breadcrumbs class="breadcrumbs" density="compact" :items="article?.category">
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
                {{article?.uploader.nickname}}
              </div>
              <div class="info-container">
                <v-icon class="info-icon">
                  mdi-cloud-upload-outline
                </v-icon>
                {{ $dayjs(article?.createTime).format('YYYY-MM-DD HH:mm:ss') }}
              </div>
              <div class="info-container">
                <v-icon class="info-icon">
                  mdi-clock-edit-outline
                </v-icon>
                {{ $dayjs(article?.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
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
            <!--<client-only>-->
              <ArticleMarkdownPreview :content="String(article?.content)"  @ready="getReady" />
            <!--</client-only>-->
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

    <div class="side-tools" :style="{right: right+'px'}">
      <div>
        <v-btn color="background-secondary" elevation="2" size="default" class="tool-switch" @click="changeShowTools">
          <v-icon size="24" >
            {{ showTools ? 'mdi-menu-close' : 'mdi-menu-open'}}
          </v-icon>
        </v-btn>

      </div>
      <div>
        <div>
          <v-card color="background-secondary" class="catalog" :style="{height:height+'px'}" elevation="2">
            <div class="title">
              目录
            </div>
            <div>
              <client-only>
                <ArticleCatalog :ready="showCatalog" @catalog-height="getHeight" />
              </client-only>
            </div>
          </v-card>
        </div>
      </div>
    </div>

  </v-container>
</div>
</template>

<script setup lang="ts">
import type {ArticleGet} from "~/ts/interface/api.interface";
const siteConfig = useSiteConfig()
const {currentTheme} = storeToRefs(siteConfig)
definePageMeta({
  layout: 'desktop-home',
  middleware: ['user']
})

useHead({
  title: '文章'
})

const {data:article} = await useFetch<ArticleGet>('/api/blog/article')

// 侧边工具栏
// 显示目录
const showCatalog = ref(false)
// 显示工具栏
const showTools = ref(false)
// 工具栏高度
const height = ref(200)
// 显示/隐藏控制
const right = ref(-300)
// 从 Catalog组件 获取高度
function getHeight(catalogHeight:number){
  height.value = catalogHeight / 2
}
// 文章就绪
function getReady(show:boolean){
  showCatalog.value = show
}

const changeShowTools =() => {
  showTools.value = !showTools.value
  right.value = showTools.value ? 0 : -300
}

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

.side-tools{
  position: fixed;
  top: 25%;
  transition: all 0.5s ease-in-out;
  display: flex;



  :deep(.v-btn){
    border-radius: 4px 0 0 4px;
  }

  .catalog{
    width: 300px;
    border-radius: 0 4px 4px 4px;

    .title{
      font-size: 1.2rem;
      height: 36px;
      margin-left: 20px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
