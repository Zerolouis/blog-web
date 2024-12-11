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
      <v-row justify="center">
        <v-col
          v-show="!data?.data.records || data?.data.records?.length === 0"
          cols="12"
          sm="8"
          md="8"
          lg="8"
          xl="10"
          class="no-article-tips"
        >
          该分类下暂无文章
        </v-col>

        <v-col
          v-if="data?.data.records && data?.data.records?.length > 0 && showMD"
          cols="12"
          sm="8"
          md="8"
        >
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard class="article-card" v-bind="item" />
          </template>
        </v-col>

        <v-col
          v-if="data?.data.records && data?.data.records?.length > 0 && showLG"
          cols="4"
        >
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 2 === 0"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>
        <v-col
          v-if="data?.data.records && data?.data.records?.length > 0 && showLG"
          cols="4"
        >
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 2 === 1"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>

        <v-col
          v-if="data?.data.records && data?.data.records?.length > 0 && showXL"
          :cols="3"
        >
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 3 === 0"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>
        <v-col
          v-if="data?.data.records && data?.data.records?.length > 0 && showXL"
          :cols="3"
        >
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 3 === 1"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>

        <v-col
          v-if="data?.data.records && data?.data.records?.length > 0 && showXL"
          :cols="3"
        >
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 3 === 2"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>

        <v-col
          v-if="data?.data.records && data?.data.records?.length > 0 && showXXL"
          :cols="2"
        >
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 4 === 0"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>
        <v-col
          v-if="data?.data.records && data?.data.records?.length > 0 && showXXL"
          :cols="2"
        >
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 4 === 1"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>

        <v-col
          v-if="data?.data.records && data?.data.records?.length > 0 && showXXL"
          :cols="2"
        >
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 4 === 2"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>
        <v-col
          v-if="data?.data.records && data?.data.records?.length > 0 && showXXL"
          :cols="2"
        >
          <template v-for="(item, index) in data?.data.records" :key="item.id">
            <HomeArticleCard
              v-if="index % 4 === 3"
              class="article-card"
              v-bind="item"
            />
          </template>
        </v-col>

        <v-col cols="12" sm="4" md="4" lg="3" xl="2">
          <v-card class="category-container">
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
              select-strategy="independent"
              density="compact"
            />
          </v-card>

          <v-card class="tag-container">
            <v-card-title class="bg-info"> 标签 </v-card-title>
            <v-container>
              <v-chip-group v-model="tagSelected" multiple column>
                <template v-for="(item, index) in tagData?.data" :key="item.id">
                  <v-chip :value="item.id" :color="colors[index % 7]" filter>
                    {{ item.name }}
                  </v-chip>
                </template>
              </v-chip-group>
            </v-container>
          </v-card>
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
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { Category, CommonMessage } from "~/ts/types/api.type";
import type { Tag } from "~/ts/interface/manager.interface";

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

const categorySelected: Ref<Array<Category>> = ref([]);
const tagSelected: Ref<Array<string>> = ref([]);
const categories = ref();
const loading = ref(false);
// 控制显示格式，由于ssr的原因，需要在网页加载后修改
const showXL = ref(false);
const showLG = ref(false);
const showMD = ref(false);
const showXXL = ref(false);
const { mdAndDown, xxl, lgAndDown } = useDisplay();

const ssrClientHints = useNuxtApp().$ssrClientHints;
console.log("$ssrClientHints", ssrClientHints);

const restoreWidth = (width: number) => {
  if (width < 1280) {
    showMD.value = true;
  } else if (width < 1920) {
    showLG.value = true;
  } else if (width < 2560) {
    showXL.value = true;
  } else {
    showXXL.value = true;
  }
};
if (ssrClientHints.viewportWidthAvailable) {
  const width: number = ssrClientHints?.viewportWidth || 1280;
  restoreWidth(width);
}

watch(
  mdAndDown,
  () => {
    showMD.value = mdAndDown.value;
    showLG.value = !mdAndDown.value && lgAndDown.value;
    console.log(showMD.value, showLG.value, showXL.value, showXXL.value);
  },
  { immediate: true },
);

watch(
  lgAndDown,
  () => {
    showXL.value = !lgAndDown.value;
    showLG.value = !mdAndDown.value && lgAndDown.value;
    console.log(showMD.value, showLG.value, showXL.value, showXXL.value);
  },
  { immediate: true },
);

watch(xxl, () => {
  showXL.value = !xxl.value;
  showXXL.value = xxl.value;
  console.log(showMD.value, showLG.value, showXL.value, showXXL.value);
});

useHead({
  title: "首页",
  htmlAttrs: {
    lang: "zh-CN",
  },
});
const data = ref();
const { data: articleData } = await useFetch<CommonMessage>("/api/blog/page", {
  method: "POST",
  body: {
    page: paginationCurrent.value,
    size: 20,
  },
});
data.value = articleData.value;
// console.log("articles", data);
const { data: tagData } = await useFetch<CommonMessage>("/api/manager/tag", {
  method: "GET",
});
// console.log("tagData", tagData);
const { data: categoryData } = await useFetch<CommonMessage>(
  "/api/manager/category/tree",
  {
    method: "GET",
  },
);
// 遍历并处理所有叶子节点的children 为 undefined
const traverse = (c: Category) => {
  if (!c) return;
  if (!c.children?.length) {
    c.children = undefined;
  }
  if (c.children) {
    for (let i = 0; i < c.children.length; i++) {
      traverse(c.children[i]);
    }
  }
};

if (categoryData.value?.data) {
  for (let i = 0; i < categoryData.value?.data.length; i++) {
    traverse(categoryData.value?.data[i]);
  }
}

watch(tagSelected, () => {
  updateData();
});

watch(categorySelected, () => {
  updateData();
});

watch(paginationCurrent, () => {
  updateData();
});

categories.value = categoryData.value?.data;
// console.log("category", categoryData);

const colors = [
  "#FF0000",
  "#FF7F00",
  "#640d5f",
  "#dc4f7e",
  "primary",
  "warning",
];

paginationLength.value = data.value?.data.pages;

const updateData = () => {
  loading.value = true;
  const categories: string[] = [];
  for (const c of categorySelected.value) {
    categories.push(c.id);
  }

  $fetch<CommonMessage>("/api/blog/page", {
    method: "POST",
    body: {
      page: paginationCurrent.value,
      size: 20,
      categories,
      tags: tagSelected.value,
    },
  })
    .then((res) => {
      paginationLength.value = res.data.pages;
      data.value = res;
    })
    .finally(() => {
      loading.value = true;
    });
};
</script>

<style lang="scss" scoped>
.blog-intro-pic {
  margin-top: -100px;
}
//.article-card-container {
//  animation: fadeIn;
//  animation-duration: 0.5s;
//}
.tag-container {
  margin-top: 20px;
}
.no-article-tips {
  text-align: center;
  font-size: 1.2rem;
  animation: fadeIn 1s;
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
