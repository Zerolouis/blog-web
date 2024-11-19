<template>
  <div>
      <ul class="catalog-ul">
        <li
            v-for="(item,index) in nodes"
            :key="index"
            :class="`catalog-li catalog-${item.level} ${catalogActive(item)}`"
            @click="toPosition(item)"
        >
          {{ item.text }}
        </li>
      </ul>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { useGoTo } from 'vuetify'

interface CatalogItem {
  level: number
  text: string
  element: any
  offsetTop: number
}

const nodes:Ref<Array<CatalogItem>> = ref([])
const scrollTop = ref(0)
const goTo = useGoTo()
const props = defineProps<{
  ready: boolean
}>()
// 返回上级 窗口大小
const emits = defineEmits<{
  (e: 'catalogHeight',height: number):void
}>()
const height = ref(300)

const handleScroll = () => {
  scrollTop.value = document.documentElement.scrollTop
  // console.log(scrollTop.value)
}

const catalogActive = (item:CatalogItem):string => {
  if (item.offsetTop < scrollTop.value) {
    return 'catalog-active'
  } else {
    return 'catalog-inactive'
  }
}

// 监听滚动事件
onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, true)
    height.value = window.innerHeight
    console.log('窗口高度:',height.value)
    emits('catalogHeight', height.value)
  }
})

// 注销监听滚动事件
onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
// 文章渲染完成开始计算目录
watch(() => props.ready, () => {
  // 仅需要本地运算
  if (import.meta.client) {
    const elements:any = document.getElementById('vditor')?.querySelectorAll('h1,h2,h3,h4,h5,h6')
    calcCatalog(elements)
  }
})

const calcCatalog = (elements:any) => {
  nodes.value = []
  const HList = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
  // console.log(elements)
  for (const item of elements) {
    // 排除引用中的标题
    if (item.offsetParent.nodeName === 'BLOCKQUOTE') {
      continue
    }

    nodes.value.push({
      level: HList.indexOf(item.nodeName) + 1,
      text: item.outerText,
      element: item,
      // 添加偏移量来适配头图高度
      offsetTop: item.offsetTop + 250
    })
  }
  console.log('目录节点',nodes.value)
}

const toPosition = (item:CatalogItem) => {
  goTo(item.element, {
    // 去除顶栏高度
    offset: -60
  })
}

</script>

<style scoped lang="scss">
.catalog-ul{

  overflow: auto;
  height: 600px;

  .catalog-li{
    height: 35px;
    line-height: 35px;
    font-size: 1rem;
    cursor: pointer;
    border-left: 3px solid rgb(var(--v-theme-background));
  }

  .catalog-li:hover{
    color: rgb(var(--v-theme-accent));
    background-color: #dedede;
  }

  .catalog-1{
    padding-left: 20px;
  }

  .catalog-2{
    padding-left: 35px;
  }
  .catalog-3{
    padding-left: 50px;
  }
  .catalog-4{
    padding-left: 65px;
  }
  .catalog-5{
    padding-left: 80px;
  }
  .catalog-6{
    padding-left: 95px;
  }

  .catalog-active{
    color: rgb(var(--v-theme-info));
    border-left: 3px solid rgb(var(--v-theme-info));
  }

}

</style>
