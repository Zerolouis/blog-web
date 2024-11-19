<template>
  <div>
    <v-parallax
        src="https://img.home.zeroh.top:12443/i/2024/11/15/fog-4436636-673637e8d717a.jpg"
        height="400"
        class="blog-intro-pic"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
        <SiteLogo class="blog-logo"/>
        <div class="blog-description">
          总结学习，分享生活
        </div>
      </div>
    </v-parallax>
    <v-container>
      <v-row>
        <v-col :cols="12" md="6">
          <template v-for="(item,index) in data" :key="item.id">
            <HomeArticleCard v-if="index % 2 ===0" class="article-card" v-bind="item"/>
          </template>
        </v-col>
        <v-col :cols="12" md="6">
          <template v-for="(item,index) in data" :key="item.id">
            <HomeArticleCard v-if="index % 2 ===1" class="article-card" v-bind="item"/>
          </template>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'desktop-home'
})

useHead({
  title: '摸鱼Blog - 首页'
})

const {data} = useFetch('/api/config/site')
</script>

<style lang="scss" scoped>
.blog-intro-pic {
  margin-top: -100px;
}

.blog-logo {
  font-size: 4rem;
}

.blog-description {
  font-size: 1.2rem;
}

.article-card{
  margin-bottom: 20px;
}
</style>
