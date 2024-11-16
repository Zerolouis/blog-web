<template>
<div :class="'markdown-'+currentTheme">
  <div id="vditor" ref="vditorPreview"/>
</div>
</template>

<script setup lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import hljs from 'highlight.js'
import {useTheme} from "vuetify";
const currentTheme = ref('light');
const props = defineProps<{
  content: string
}>()

const theme = useTheme()
watch(theme.global.name,(newValue)=>{
  if (newValue==='dark'){
    renderDark()
    currentTheme.value = 'dark'
  } else{
    renderLight()
    currentTheme.value = 'light'
  }
})
const vditorPreview = ref(null)
// 渲染完成回调
const emits = defineEmits(['ready'])
const articleReady = () => {
  emits('ready', false)
}

const renderLight = () =>{

  Vditor.preview(vditorPreview.value, props.content, {
    mode: 'light',
    theme: {
      current: 'light',
      list: { "ant-design": "Ant Design", dark: "Dark", light: "Light", wechat: "WeChat" }
    },
    preview: {
      delay: 0,
    },
    hljs: {
      style: 'monokai',
      lineNumber: false
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
        list: { "ant-design": "Ant Design", dark: "Dark", light: "Light", wechat: "WeChat" }
      },
      preview: {
        delay: 0,
      },
      hljs: {
        style: 'monokai',
        lineNumber: false
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

onMounted(()=>{
  renderLight()
})
</script>

<style scoped lang="scss">
@use 'assets/scss/vditor-preview';
.markdown-light{
  :deep(#vditor){
    @include vditor-preview.markdown-light
  }
}

.markdown-dark{
  :deep(#vditor){
    @include vditor-preview.markdown-dark
  }
}

</style>
