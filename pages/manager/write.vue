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
              <CommonDatePicker ref="datePicker" label-name="发布时间"/>
              <v-select label="分类"/>
            </v-container>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">

import type {Ref} from "vue";
import {type ArticleMarkdownWrite, CommonDatePicker} from "#components";

definePageMeta({
  layout: 'desktop-manager',
  middleware: 'auth',
  title: '撰写文章'
})

const writer: Ref<InstanceType<typeof ArticleMarkdownWrite> | null> = ref(null)
const datePicker: Ref<InstanceType<typeof CommonDatePicker> | null> = ref(null)

const getWriterText = () => {
  const text = writer.value?.getText()
  console.log(text)
}

</script>

<style scoped lang="scss">

</style>
