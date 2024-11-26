<!--
 * @FileDescription: 文章编写组件
 * @Author: Zerolouis
 * @Date: 2024/4/22 14:22
 -->
<template>
  <div>
    <div id="writer" ref="writer"/>
    <v-dialog v-model="imageUploadDialog" width="600">
      <!--<ArticleUploadImg />-->
    </v-dialog>

    <v-dialog v-model="storeUploadDialog" width="600">
      <!--<ArticleUploadStore />-->
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import Vditor from 'vditor'
import type {Ref} from 'vue'
import hljs from 'highlight.js'
import "vditor/src/assets/less/index.less"

const writer = ref(null)
const imageUploadDialog: Ref<boolean> = ref(false)
const storeUploadDialog: Ref<boolean> = ref(false)

const vditor = ref()

onMounted(() => {
  if (import.meta.client) {
    const showImageDialog = () => {
      imageUploadDialog.value = true
    }

    const showStoreDialog = () => {
      storeUploadDialog.value = true
    }

    vditor.value = new Vditor('writer', {
      minHeight: 600,
      placeholder: '想要说些什么？',
      theme: 'classic',
      counter: {
        enable: true,
        type: 'markdown'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      tab: '\t',
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      // 所见即所得模式(typora)
      mode: 'ir',
      "outline": {
        "enable": true,
        "position": "right"
      },
      toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
        'outline',
        '|',
        {
          name: 'image',
          tipPosition: 's',
          tip: '上传图片',
          className: 'custom-icon',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cloud-upload-outline</title><path d="M6.5 20Q4.22 20 2.61 18.43 1 16.85 1 14.58 1 12.63 2.17 11.1 3.35 9.57 5.25 9.15 5.88 6.85 7.75 5.43 9.63 4 12 4 14.93 4 16.96 6.04 19 8.07 19 11 20.73 11.2 21.86 12.5 23 13.78 23 15.5 23 17.38 21.69 18.69 20.38 20 18.5 20H13Q12.18 20 11.59 19.41 11 18.83 11 18V12.85L9.4 14.4L8 13L12 9L16 13L14.6 14.4L13 12.85V18H18.5Q19.55 18 20.27 17.27 21 16.55 21 15.5 21 14.45 20.27 13.73 19.55 13 18.5 13H17V11Q17 8.93 15.54 7.46 14.08 6 12 6 9.93 6 8.46 7.46 7 8.93 7 11H6.5Q5.05 11 4.03 12.03 3 13.05 3 14.5 3 15.95 4.03 17 5.05 18 6.5 18H9V20M12 13Z" /></svg>',
          click() {
            showImageDialog()
          }
        },
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'edit-mode',
        {
          name: 'more',
          toolbar: [
            'fullscreen',
            'both',
            'preview',
            'info',
            'help'
          ]
        }]
    })
  }
})

/**
 * 获取vditor内容
 */
const getText = () => {
  return vditor.value.getValue();
}

defineExpose({
  vditor,
  getText,
  ImageUploadDialog: imageUploadDialog
})


</script>

<style scoped lang="scss">

</style>
