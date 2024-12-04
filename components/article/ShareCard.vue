<template>
  <div>
    <v-card
      class="file-container"
      :style="{ backgroundColor: bgColor }"
      elevation="0"
      @click="showDialog = !showDialog"
    >
      <v-img
        :key="url"
        class="icon"
        :src="fileColorMap.get(method)?.icon"
        size="25"
      />
      <v-divider class="divider" thickness="2" vertical />
      <div class="text">
        {{ fileColorMap.get(method)?.name }}
      </div>
    </v-card>

    <v-dialog width="30%" v-model="showDialog">
      <v-card>
        <v-card-title class="bg-info"> 下载提示 </v-card-title>
        <v-card-text>
          <div>您即将跳转以下链接, 请确认</div>
          <div
            class="url"
            @click="
              navigateTo(url, {
                open: {
                  target: '_blank',
                },
              })
            "
          >
            {{ url }}
          </div>
        </v-card-text>
        <v-divider> </v-divider>
        <v-card-title> 文件说明 </v-card-title>
        <v-card-text>
          {{
            description && description?.length > 0 ? description : "暂无说明"
          }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import type { ArticleShareItem } from "~/ts/interface/api.interface";
const showDialog = ref(false);

const props = defineProps<ArticleShareItem>();

const fileColorMap = new Map<
  string,
  { name: string; color: string; icon: string }
>([
  [
    "baidu",
    {
      name: "百度网盘",
      color: "#359aef",
      icon: "/_nuxt/assets/icon/baidu.svg",
    },
  ],
  [
    "url",
    { name: "直链", color: "#409991", icon: "/_nuxt/assets/icon/url.svg" },
  ],
  [
    "bt",
    { name: "Bittorrent", color: "#9daccb", icon: "/_nuxt/assets/icon/bt.svg" },
  ],
  [
    "ali",
    { name: "阿里网盘", color: "#787efc", icon: "/_nuxt/assets/icon/ali.svg" },
  ],
  [
    "quark",
    {
      name: "夸克网盘",
      color: "#6658f0",
      icon: "/_nuxt/assets/icon/quark.svg",
    },
  ],
  [
    "115",
    { name: "115网盘", color: "#359aef", icon: "/_nuxt/assets/icon/115.svg" },
  ],
  [
    "lanzou",
    { name: "蓝奏云", color: "#ee650e", icon: "/_nuxt/assets/icon/lanzou.svg" },
  ],
  [
    "onedrive",
    {
      name: "Onedrive",
      color: "#8599bd",
      icon: "/_nuxt/assets/icon/onedrive.svg",
    },
  ],
  [
    "other",
    { name: "其他", color: "#359aef", icon: "/_nuxt/assets/icon/other.svg" },
  ],
]);

const bgColor = computed(() => {
  return fileColorMap.get(props.method)?.color;
});
</script>

<style scoped lang="scss">
.file-container {
  background-color: #359aef;
  display: flex;
  padding: 5px;
  align-items: center;
  .icon {
    width: 30px;
    height: 30px;
    margin: 0 10px 0 5px;
  }
  .text {
    width: 100%;
    text-align: center;
    color: white;
  }
  .divider {
    color: white;
  }
}

.url {
  text-align: center;
  margin: 20px 0 10px 0;
  cursor: pointer;
}
.url:hover {
  text-decoration: underline;
}
</style>
