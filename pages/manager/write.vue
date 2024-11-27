<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" :xl="9">
          <v-text-field variant="solo-filled" class="text-container" color="info" label="标题"/>
          <v-card>
            <ArticleMarkdownWrite ref="writer"/>
          </v-card>
        </v-col>
        <v-col cols="12" :xl="3">
          <v-card>
            <v-card-title>
              配置
            </v-card-title>
            <v-container>
              <v-form fast-fail @submit.prevent>
                <CommonDatePicker ref="datePicker" label-name="发布时间"/>
                <CommonCategorySelecter />
                <v-select label="分类"/>
                <v-text-field placeholder="留空则使用默认头图" label="头图"/>
                <v-combobox
                    v-model="tagSelected"
                    multiple
                    chips
                    label="标签"
                    :items="tagList"
                />

              </v-form>

            </v-container>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="primary">
                发布
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">

import type {Ref} from "vue";
import {type ArticleMarkdownWrite, CommonDatePicker} from "#components";
import type {Tag} from "~/ts/interface/manager.interface";
import {checkMessage, useUserStore} from "#imports";
import {AllTagsSchema, CategoryListSchema} from "~/ts/types/api.type";

const userStore = useUserStore()

definePageMeta({
  layout: 'desktop-manager',
  middleware: 'auth',
  title: '撰写文章'
})

const formData = reactive({
  title: '',
  picture: '',
  content: '',
  tags: [],
  category: []
})
const writer: Ref<InstanceType<typeof ArticleMarkdownWrite> | null> = ref(null)
const datePicker: Ref<InstanceType<typeof CommonDatePicker> | null> = ref(null)
const tagSelected = ref([])
const tagList: Ref<Array<string>> = ref(['test1'])

const getCategories = async () => {

  const {data} = await useFetch('/api/manager/category', {
    method: "get",
    headers: {
      Authorization: userStore.getToken
    }
  })
  const {data: message} = await checkMessage(data.value)
  const {data: result} = await CategoryListSchema.safeParseAsync(message?.data)
  console.log(result)
}

const getWriterText = () => {
  const text = writer.value?.getText()
}


// 获取标签列表
const getTagList = async () => {
  const {data: res} = await useFetch('/api/manager/tag', {
    method: "get",
    headers: {
      Authorization: userStore.getToken
    }
  })
  const {data: message} = await checkMessage(res.value);
  const map = new Map<string, string>();
  for (const key in message?.data) {
    map.set(key, message?.data[key]);
  }
  console.log(map.keys())
  tagList.value = []

  for (const key of map.keys()) {
    tagList.value.push(key);
  }

}

onMounted(() => {
  getTagList()
  getCategories()
})


</script>

<style scoped lang="scss">

</style>
