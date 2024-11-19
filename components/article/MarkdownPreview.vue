<template>
  <div :class="'markdown-'+currentTheme">
    <div id="vditor" ref="vditorPreview"/>
  </div>
</template>

<script setup lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import hljs from 'highlight.js'
import {useCustomTheme} from "~/composables/useCustomTheme";

const props = defineProps<{
  content: string
}>()

const siteConfig = useSiteConfig()
const {$vuetify} = useNuxtApp()
const {currentTheme} = storeToRefs(siteConfig)

const vditorPreview = ref(null)
// 渲染完成回调
const emits = defineEmits(['ready'])
const articleReady = () => {
  emits('ready', false)
}

const renderLight = () => {

  Vditor.preview(vditorPreview.value, props.content, {
    mode: 'light',
    theme: {
      current: 'light',
      list: {"ant-design": "Ant Design", dark: "Dark", light: "Light", wechat: "WeChat"}
    },
    preview: {
      delay: 0,
    },
    hljs: {
      style: 'monokai',
      lineNumber: true
    },
    anchor: 2,
    speech: {
      enable: true
    },
    outline: {
      enable: true,
      position: 'right'
    }
  }).then(() => {
    articleReady()
    // articleStore.finish = !articleStore.finish
  })
}

const renderDark = () => {

  Vditor.preview(vditorPreview.value, props.content, {
    mode: 'dark',
    theme: {
      current: 'dark',
      list: {"ant-design": "Ant Design", dark: "Dark", light: "Light", wechat: "WeChat"}
    },
    preview: {
      delay: 0,
    },
    hljs: {
      style: 'monokai',
      lineNumber: true
    },
    anchor: 2,
    speech: {
      enable: true
    },
    outline: {
      enable: true,
      position: 'right'
    }
  }).then(() => {
    articleReady()
    // articleStore.finish = !articleStore.finish
  })

}

const renderTheme = (isDark: boolean) => {
  if (isDark){
    renderDark()
  }else{
    renderLight()
  }
}

const {vuetifyDark} = useCustomTheme()

onMounted(()=>{
  renderTheme(vuetifyDark)
})

watch($vuetify.theme.global.name, (newValue) => {
  if (newValue === 'customDarkTheme') {
    renderDark()
    currentTheme.value = 'dark'
  } else {
    renderLight()
    currentTheme.value = 'light'
  }
})
</script>

<style scoped lang="scss">
@use 'assets/scss/vditor-preview';

.markdown-light {
  :deep(#vditor) {
    @include vditor-preview.markdown-light
  }
}

.markdown-dark {
  :deep(#vditor) {
    @include vditor-preview.markdown-dark
  }
}

</style>
