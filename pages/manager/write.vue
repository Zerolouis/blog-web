<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" :xl="9">
          <v-form ref="titleForm" validate-on="blur">
            <v-text-field
              v-model="title"
              variant="solo-filled"
              class="text-container"
              color="info"
              label="标题"
              :rules="[(value) => (!value ? '文章标题不能为空' : true)]"
            />
          </v-form>
          <v-card>
            <ArticleMarkdownWrite ref="writer" />
          </v-card>
        </v-col>
        <v-col cols="12" :xl="3">
          <v-card class="config-container">
            <v-card-title class="bg-info"> 配置</v-card-title>
            <v-container>
              <v-form
                ref="configForm"
                validate-on="blur"
                fast-fail
                @submit.prevent
              >
                <CommonDatePicker ref="datePicker" label-name="发布时间" />
                <CommonCategorySelecter />
                <v-text-field
                  append-inner-icon="mdi-panorama-outline"
                  :messages="['留空则使用随机默认头图']"
                  label="头图"
                  color="info"
                  :rules="[
                    (value) =>
                      checkHttpsAndHttp(value) || !value
                        ? true
                        : '地址格式不正确',
                  ]"
                />
                <v-combobox
                  v-model="tagSelected"
                  multiple
                  chips
                  label="标签"
                  color="info"
                  append-inner-icon="mdi-label"
                  :items="tagList"
                />
                <v-text-field
                  label="头图版权说明"
                  :messages="['版权信息将显示在头图下方，留空则不显示']"
                />
                <v-textarea
                  label="手动指定摘要内容"
                  counter
                  messages="留空则默认截取文章内容"
                />
                <v-switch label="文件分享功能" color="primary" />
              </v-form>
            </v-container>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" type="submit" @click="submitArticle">
                发布
              </v-btn>
            </v-card-actions>
          </v-card>

          <ManagerSharePanel />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { type ArticleMarkdownWrite, CommonDatePicker } from "#components";
import { checkMessage, useUserStore } from "#imports";
import { checkHttpsAndHttp } from "~/composables/useVerify";
import type { VForm } from "vuetify/components";

const userStore = useUserStore();

definePageMeta({
  layout: "desktop-manager",
  middleware: "auth",
  title: "撰写文章",
});

const title = ref("");
// Markdown编辑器
const writer: Ref<InstanceType<typeof ArticleMarkdownWrite> | null> = ref(null);
// 发布时间选择器
const datePicker: Ref<InstanceType<typeof CommonDatePicker> | null> = ref(null);
// 标签
const tagSelected = ref([]);
const tagList: Ref<Array<string>> = ref(["test1"]);
// 图片版权信息
const picCopyright: Ref<string | undefined> = ref();
// 描述信息
const description: Ref<string | undefined> = ref();
// 表单
const titleForm: any = ref(null);
const configForm: any = ref(null);

/**
 * 获取编辑器文本
 */
const getWriterText = (): string => {
  return writer.value?.getText();
};

// 获取标签列表
const getTagList = async () => {
  const { data: res } = await useFetch("/api/manager/tag", {
    method: "get",
    headers: {
      Authorization: userStore.getToken,
    },
  });
  const { data: message } = await checkMessage(res.value);
  const map = new Map<string, string>();
  for (const key in message?.data) {
    map.set(key, message?.data[key]);
  }
  console.log(map.keys());
  tagList.value = [];

  for (const key of map.keys()) {
    tagList.value.push(key);
  }
};

// 发布文章
const submitArticle = async () => {
  await titleForm?.value.validate();
  await configForm?.value.validate();
};

onMounted(() => {
  getTagList();
});
</script>

<style scoped lang="scss">
.config-container {
  margin-bottom: 10px;
}
</style>
