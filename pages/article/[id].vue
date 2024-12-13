<template>
  <div>
    <v-parallax
      :src="
        article?.picture ||
        'https://image.jujuh.top:443/i/2024/12/06/sky-7232494_1920-6752a91e01618.jpg'
      "
      height="400"
      class="article-title-pic"
    >
      <template #default>
        <div class="article-title-text">
          {{ article?.title }}
        </div>
        <div class="article-title-category">
          <template v-for="item in article?.categories" :key="item.id">
            <v-chip class="category-chip" color="info" variant="elevated">
              {{ item?.name }}
            </v-chip>
          </template>
        </div>

        <div class="article-title-category">
          <v-chip
            v-tooltip:top="'作者'"
            class="category-chip"
            color="accent"
            variant="elevated"
            pill
          >
            <v-avatar start>
              <v-img :src="article?.creator.avatar" />
            </v-avatar>
            {{ article?.creator.nickname }}
          </v-chip>
          <v-chip
            v-tooltip:top="'文章发布时间'"
            class="category-chip"
            color="accent"
            variant="elevated"
            prepend-icon="mdi-cloud-upload-outline"
          >
            {{ $dayjs(article?.createTime).format("YYYY-MM-DD HH:mm") }}
          </v-chip>
          <v-chip
            v-tooltip:top="'阅读预计耗时'"
            class="category-chip"
            color="accent"
            variant="elevated"
            prepend-icon="mdi-book-open-variant-outline"
          >
            约{{ contentCount }}字
          </v-chip>
          <v-chip
            v-tooltip:top="'最后一次修改时间'"
            class="category-chip"
            color="accent"
            variant="elevated"
            prepend-icon="mdi-clock-edit-outline"
          >
            {{ $dayjs(article?.updateTime).format("YYYY-MM-DD HH:mm") }}
          </v-chip>
        </div>

        <div class="picture-info">
          <v-icon v-tooltip="article?.pictureCopyright"> mdi-copyright </v-icon>
        </div>
      </template>
    </v-parallax>

    <v-container>
      <v-row justify="center">
        <v-col cols="12" xl="8" xxl="6">
          <v-card :class="'article-container-' + currentTheme" elevation="12">
            <div
              class="article-info"
              v-if="article?.tags && article?.tags.length > 0"
            >
              <div />
              <div>
                <template v-for="item in article?.tags" :key="item?.id">
                  <v-chip
                    color="primary"
                    variant="flat"
                    size="small"
                    class="info-chip"
                    @click="chipToLabel"
                  >
                    <v-icon icon="mdi-label" start />
                    {{ item?.name }}
                  </v-chip>
                </template>
              </div>
            </div>

            <div class="article-content">
              <!--<client-only>-->
              <ArticleMarkdownPreview
                :content="article?.content"
                @ready="getReady"
              />
              <!--</client-only>-->
            </div>

            <div class="article-info copyright">
              <div>转载方式</div>
              <div class="info">
                <ArticleCopyright
                  v-tooltip:top="{ text: '点击查看CC4.0' }"
                  :copyright="Number(article?.copyright)"
                  @click="
                    navigateTo(
                      CopyrightURLMap.get(Number(article?.copyright)),
                      {
                        open: {
                          target: '_blank',
                        },
                      },
                    )
                  "
                />
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" xl="8" xxl="6">
          <ArticleFileShare
            v-if="article && article.share.length > 0"
            :share="article?.share"
          />
        </v-col>
      </v-row>

      <div class="side-tools" :style="{ right: right + 'px' }">
        <div>
          <div class="tool-switch">
            <v-btn
              color="background-secondary"
              elevation="2"
              size="default"
              @click="changeShowTools"
              v-tooltip="'目录'"
            >
              <v-icon size="24">
                {{ showTools ? "mdi-menu-close" : "mdi-menu-open" }}
              </v-icon>
            </v-btn>
          </div>
          <div class="tool-edit">
            <v-btn
              color="background-secondary"
              elevation="2"
              size="default"
              v-tooltip="'编辑文章'"
              @click="navigateTo('/manager/edit?id=' + route.params.id)"
            >
              <v-icon size="24"> mdi-pencil </v-icon>
            </v-btn>
          </div>
        </div>
        <div>
          <div>
            <v-card
              color="background-secondary"
              class="catalog"
              :style="{ height: height + 'px' }"
              elevation="2"
            >
              <div class="title">目录</div>
              <div>
                <client-only>
                  <ArticleCatalog
                    :ready="showCatalog"
                    @catalog-height="getHeight"
                  />
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
import type { ArticleGet } from "~/ts/interface/api.interface";
import { ArticleQuerySchema } from "~/ts/types/api.type";
import { checkMessage } from "#imports";
import { CopyrightURLMap } from "~/ts/enum/api.enum";
import { useMarkdownCount } from "~/composables/useMarkdownCount";
import { useSiteInfo } from "~/stores/siteInfo";
import { isAllNumbers } from "~/composables/useVerify";
import { categories } from "@vueuse/metadata";

const route = useRoute();
const siteConfig = useSiteInfo();
const { currentTheme } = storeToRefs(siteConfig);
const toast = useToastStore();
const contentCount = ref(200);
definePageMeta({
  layout: "desktop-home",
  middleware: ["user"],
});

const { isMobileOrTablet } = useDevice();

if (isMobileOrTablet) {
  navigateTo("/m/article/" + route.params.id);
}

useHead({
  title: "文章",
});

const res = ref();
const paramId = route.params.id.toString();
console.log("获取文章", paramId);
// 处理路由参数，
if (isAllNumbers(paramId)) {
  // 获取文章内容
  const { data: result } = await useFetch("/api/blog/article", {
    method: "get",
    query: {
      articleId: paramId,
    },
  });
  res.value = result.value;
  //console.log("文章数据", result.value.data);
}

const { data: message } = await checkMessage(res.value);
if (message?.code !== "200") {
  showError({
    statusCode: 404,
    message: "文章不存在",
  });
}
const { data: article } = await ArticleQuerySchema.safeParseAsync(
  message?.data,
);
useSeoMeta({
  title: article?.title,
  ogTitle: article?.title,
  description: article?.description,
  ogDescription: article?.description,
  ogType: "article",
  googlebotNews: "nosnippet",
  ogImage: article?.picture,
  twitterTitle: article?.title,
  twitterDescription: article?.description,
  twitterImage: article?.picture,
});
contentCount.value = useMarkdownCount(article?.content || "");

// 侧边工具栏
// 显示目录
const showCatalog = ref(false);
// 显示工具栏
const showTools = ref(false);
// 工具栏高度
const height = ref(200);
// 显示/隐藏控制
const right = ref(-300);
// 从 Catalog组件 获取高度
function getHeight(catalogHeight: number) {
  height.value = catalogHeight / 2;
}
// 文章就绪
function getReady(show: boolean) {
  showCatalog.value = show;
}

// 点击标签跳转
const chipToLabel = () => {};

const changeShowTools = () => {
  showCatalog.value = !showCatalog.value;
  showTools.value = !showTools.value;
  right.value = showTools.value ? 0 : -300;
};
</script>

<style scoped lang="scss">
@use "/assets/scss/color";

@mixin article-info {
  .article-content {
    padding: 20px 20px 20px 20px;
  }

  .article-info {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    align-items: center;

    .info {
      display: flex;
      align-items: center;
      .info-container {
        margin: 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .info-icon {
        margin-right: 5px;
      }

      .help-btn {
        margin-left: 5px;
      }
    }

    .breadcrumbs {
      padding: 0;
    }
    .info-chip {
      margin: 0 3px;
    }
  }
}

.article-title-pic {
  margin-top: -60px;
  :deep(.v-img__img) {
    -webkit-filter: brightness(60%);
    filter: brightness(60%);
  }
  .article-title-text {
    font-size: 3rem;
    padding: 10px 10px 0 10px;
    font-family: 临海隶书, sans-serif;
    margin-top: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .article-title-category {
    text-align: center;
    .category-chip {
      margin: 5px 5px;
    }
  }
  .picture-info {
    position: absolute;
    color: rgba(255, 255, 255, 0.51);
    bottom: 10px;
    left: 10px;
    align-items: center;
    font-size: 0.6rem;
  }
}

.article-container-light {
  @include article-info;
  .article-info {
    background-color: #e8eaf6;
    color: color.$theme-light-info;
  }
}

.article-container-dark {
  @include article-info;
  .article-info {
    background-color: #616269;
    color: #d9d9d9;
  }
}

.side-tools {
  position: fixed;
  top: 25%;
  transition: all 0.5s ease-in-out;
  display: flex;

  .tool-switch {
    :deep(.v-btn) {
      border-radius: 4px 0 0 4px;
    }
  }

  .tool-edit {
    margin-top: 5px;
    :deep(.v-btn) {
      border-radius: 4px 0 0 4px;
    }
  }
  .catalog {
    width: 300px;
    border-radius: 0 0 0 0;

    .title {
      font-size: 1.2rem;
      height: 36px;
      margin-left: 20px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
