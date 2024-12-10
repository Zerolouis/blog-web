<template>
  <div :class="'markdown-' + currentTheme">
    <div id="vditor" ref="vditorPreview" />
  </div>
</template>

<script setup lang="ts">
import Vditor from "vditor";
import "vditor/dist/index.css";
import hljs from "highlight.js";
import { useCustomTheme } from "~/composables/useCustomTheme";
import { useSiteInfo } from "~/stores/siteInfo";

const props = defineProps<{
  content: string | undefined;
}>();

const vditorPreview = ref(null);
// 渲染完成回调
const emits = defineEmits<{
  (e: "ready", show: boolean): void;
}>();

const renderLight = () => {
  Vditor.preview(vditorPreview.value, props.content, {
    mode: "light",
    theme: {
      current: "light",
      list: {
        "ant-design": "Ant Design",
        dark: "Dark",
        light: "Light",
        wechat: "WeChat",
      },
    },
    preview: {
      delay: 0,
    },
    hljs: {
      style: "monokai",
      lineNumber: true,
    },
    anchor: 2,
    speech: {
      enable: true,
    },
    outline: {
      enable: true,
      position: "right",
    },
  }).then(() => {
    emits("ready", true);
    // articleStore.finish = !articleStore.finish
  });
};

const renderDark = () => {
  Vditor.preview(vditorPreview.value, props.content, {
    mode: "dark",
    theme: {
      current: "dark",
      list: {
        "ant-design": "Ant Design",
        dark: "Dark",
        light: "Light",
        wechat: "WeChat",
      },
    },
    preview: {
      delay: 0,
    },
    hljs: {
      style: "monokai",
      lineNumber: true,
    },
    anchor: 2,
    speech: {
      enable: true,
    },
    outline: {
      enable: true,
      position: "right",
    },
  }).then(() => {
    emits("ready", true);
    // articleStore.finish = !articleStore.finish
  });
};
// 选择渲染样式
const renderTheme = (isDark: boolean) => {
  if (isDark) {
    renderDark();
  } else {
    renderLight();
  }
};

const siteConfig = useSiteInfo();
const { currentTheme } = storeToRefs(siteConfig);

const { vuetifyTheme, vuetifyDark, theme } = useCustomTheme();

onMounted(() => {
  renderTheme(vuetifyDark);
});

watch(vuetifyTheme, (newValue) => {
  if (newValue === "customDarkTheme") {
    emits("ready", false);
    renderDark();
    theme.value = "customDarkTheme";
  } else {
    emits("ready", false);
    renderLight();
    theme.value = "customLightTheme";
  }
});
</script>

<style scoped lang="scss">
@use "assets/scss/vditor-preview";

.markdown-light {
  :deep(#vditor) {
    @include vditor-preview.markdown-light;
  }
}

.markdown-dark {
  :deep(#vditor) {
    @include vditor-preview.markdown-dark;
  }
}
</style>
