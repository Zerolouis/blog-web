<template>
  <div>
    测试页面
    <ArticleMarkdownPreview :content="String(article?.content)"  @ready="getReady" />
    <div class="side-tools" :style="{right: right+'px'}">
      <div>
        <v-btn variant="flat" size="default" class="tool-switch" @click="changeShowTools">
          <v-icon size="24" >
            mdi-clock
          </v-icon>
        </v-btn>

      </div>
      <div>
        <div>
          <v-card class="catalog" :style="{height:height+'px'}" variant="flat">
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
  </div>
</template>

<script setup lang="ts">
import type {ArticleGet} from "~/ts/interface/api.interface";

definePageMeta({
  layout: "desktop-home"
})
const showCatalog = ref(false)
const showTools = ref(false)
const height = ref(200)
const right = ref(-300)
function getHeight(catalogHeight:number){
  height.value = catalogHeight / 2
}
function getReady(show:boolean){
    showCatalog.value = show
}

const changeShowTools =() => {
  showTools.value = !showTools.value
  right.value = showTools.value ? 0 : -300
}

const {data:article} = await useFetch<ArticleGet>('/api/blog/article')
</script>

<style scoped lang="scss">
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
