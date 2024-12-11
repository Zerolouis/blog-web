<template>
  <div>
    <v-parallax
      src="/images/fog-4436636-673637e8d717a.jpg"
      height="400"
      class="blog-intro-pic"
    >
      <div
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <SiteLogo class="blog-logo" />
        <div class="blog-description">总结学习，分享生活</div>
      </div>
    </v-parallax>
    <v-container>
      <v-row v-if="showMD">
        <v-col :cols="12" md="6">
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 2 === 0"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>
        <v-col :cols="12" md="6">
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 2 === 1"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>
      </v-row>

      <v-row v-if="!showMD">
        <v-col :cols="6" md="6" xl="3">
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 4 === 0"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>
        <v-col :cols="12" md="6" xl="3">
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 4 === 1"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>

        <v-col :cols="12" md="6" xl="3">
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 4 === 2"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>

        <v-col class="article-card-container" :cols="12" md="6" xl="3">
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 4 === 3"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="12">
          <v-pagination
            v-model="paginationCurrent"
            variant="elevated"
            :total-visible="7"
            density="comfortable"
            :length="paginationLength"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="4" xl="3">
          <v-card>
            <v-card-title class="bg-info"> 分类 </v-card-title>
            <v-treeview
              v-model:selected="categorySelected"
              :items="categories"
              item-value="id"
              item-title="name"
              selectable
              return-object
              false-icon="mdi-checkbox-blank-outline"
              indeterminate-icon="mdi-checkbox-intermediate"
              true-icon="mdi-checkbox-outline"
              select-strategy="leaf"
              density="compact"
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="4" xl="3">
          <v-card>
            <v-card-title class="bg-info"> 标签 </v-card-title>
            <v-container>
              <v-chip-group multiple column>
                <template v-for="(item, index) in tagData?.data" :key="item.id">
                  <v-chip :color="colors[index % 7]" filter>
                    {{ item.name }}
                  </v-chip>
                </template>
              </v-chip-group>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { CommonMessage } from "~/ts/types/api.type";

definePageMeta({
  layout: "desktop-home",
  middleware: ["user"],
});

useSeoMeta({
  title: "摸鱼Blog",
  ogTitle: "摸鱼Blog",
  description: "Zerolouis和tutu147的博客，分享经验、教程、资源的地方",
  ogDescription: "Zerolouis和tutu147的博客，分享经验、教程、资源的地方",
  ogType: "website",
  ogImage: "/images/fog-4436636-673637e8d717a.jpg",
});

const paginationCurrent = ref(1);
const paginationLength = ref(1);

const categorySelected = ref();
const tagSelected = ref();
const categories = ref();

// 控制显示格式，由于ssr的原因，需要在网页加载后修改
const showMD = ref(false);
const { xl } = useDisplay();
watch(
  xl,
  () => {
    showMD.value = !xl.value;
  },
  { immediate: true },
);

useHead({
  title: "首页",
  htmlAttrs: {
    lang: "zh-CN",
  },
});

const { data } = await useFetch<CommonMessage>("/api/blog/page", {
  method: "POST",
  body: {
    page: paginationCurrent.value,
    size: 20,
  },
});
console.log("articles", data);
const { data: tagData } = await useFetch<CommonMessage>("/api/manager/tag", {
  method: "GET",
});
console.log("tagData", tagData);
const { data: categoryData } = await useFetch<CommonMessage>(
  "/api/manager/category/tree",
  {
    method: "GET",
  },
);
categories.value = categoryData.value?.data;
console.log("category", categoryData);

const colors = [
  "#FF0000",
  "#FF7F00",
  "#640d5f",
  "#dc4f7e",
  "primary",
  "accent",
  "info",
];

paginationLength.value = data.value?.data.pages;

const queryArticlePage = () => {};
</script>

<style lang="scss" scoped>
.blog-intro-pic {
  margin-top: -100px;
}
.article-card-container {
  //animation: fadeIn;
  //animation-duration: 0.5s;
}
.blog-logo {
  font-size: 4rem;
}

.blog-description {
  font-size: 1.2rem;
}

.article-card {
  margin-bottom: 20px;
  animation: fadeIn;
  animation-duration: 1s;
}
</style>
