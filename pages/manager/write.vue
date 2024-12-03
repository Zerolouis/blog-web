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
          <v-card
            :loading="loading"
            :disabled="loading"
            class="config-container"
          >
            <v-card-title class="bg-info"> 配置</v-card-title>
            <v-container>
              <v-form
                ref="configForm"
                validate-on="blur"
                fast-fail
                @submit.prevent
              >
                <CommonDatePicker ref="datePicker" label-name="发布时间" />
                <CommonCategorySelector ref="categorySelector" />
                <v-text-field
                  v-model="picture"
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
                <v-text-field
                  v-model="picCopyright"
                  append-inner-icon="mdi-copyright"
                  label="头图版权信息"
                  messages="将显示在头图下方"
                  color="info"
                />
                <v-select
                  v-model="tagSelected"
                  multiple
                  chips
                  label="标签"
                  color="info"
                  append-inner-icon="mdi-label"
                  :items="tagList"
                  item-value="id"
                  item-title="name"
                  return-object
                />
                <ManagerCopyrightSelector ref="copyrightSelector" />
                <v-textarea
                  v-model="description"
                  label="手动指定摘要内容"
                  counter
                  messages="留空则默认截取文章内容"
                  append-inner-icon="mdi-format-list-text"
                  :rules="[
                    (value) => (value?.length > 200 ? '字数不能超过200' : true),
                  ]"
                />
                <v-switch
                  v-model="showSharePanel"
                  label="文件分享功能"
                  color="primary"
                />
              </v-form>
            </v-container>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" type="submit" @click="submitArticle">
                发布
              </v-btn>
            </v-card-actions>
          </v-card>
          <ManagerSharePanel v-if="showSharePanel" ref="sharePanel" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import {
  type ArticleMarkdownWrite,
  CommonCategorySelector,
  CommonDatePicker,
  ManagerCopyrightSelector,
  ManagerSharePanel,
} from "#components";
import { checkMessage, useUserStore } from "#imports";
import { checkHttpsAndHttp } from "~/composables/useVerify";
import type { VForm } from "vuetify/components";
import type { ArticleSaveQuery } from "~/ts/interface/api.interface";
import { CopyrightEnum } from "~/ts/enum/api.enum";

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
const sharePanel: Ref<InstanceType<typeof ManagerSharePanel> | null> =
  ref(null);
const copyrightSelector: Ref<InstanceType<
  typeof ManagerCopyrightSelector
> | null> = ref(null);
const categorySelector: Ref<InstanceType<
  typeof CommonCategorySelector
> | null> = ref(null);
const showSharePanel: Ref<boolean> = ref(false);
// 标签
const tagSelected: any = ref([]);
const tagList: Ref<Array<string>> = ref(["test1"]);
const loading: Ref<boolean> = ref(false);
const picture: Ref<string> = ref("");
// 图片版权信息
const picCopyright: Ref<string | undefined> = ref();
// 描述信息
const description: Ref<string | undefined> = ref();
// 表单
const titleForm: any = ref(null);
const configForm: any = ref(null);
const toast = useToastStore();
const { $dayjs } = useNuxtApp();
const user = useUserStore();

// 获取Markdown编辑器文本
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
  tagList.value = message?.data;
};

const getTagSelected = () => {
  const result = [];
  for (const item of tagSelected.value) {
    result.push(item.id);
  }
  return result;
};

// 发布文章
const submitArticle = async () => {
  console.log(getCategoryIds());

  const { valid: titleValid } = await titleForm.value.validate();
  const { valid: configValid } = await configForm.value.validate();
  if (titleValid && configValid) {
    //loading.value = true;
    const body: ArticleSaveQuery = {
      createTime: datePicker.value?.time || $dayjs(new Date()).toISOString(),
      share: sharePanel.value?.fileList || [],
      categories: getCategoryIds(),
      content: getWriterText(),
      copyright: copyrightSelector.value?.copyright || CopyrightEnum.Deny,
      description: description.value || "",
      picture: picture.value || "",
      pictureCopyright: picCopyright.value || "",
      tags: getTagSelected() || [],
      title: title.value,
      uid: user.getUID(),
    };
    await $fetch("/api/manager/article", {
      method: "post",
      headers: {
        Authorization: userStore.getToken,
      },
      body,
    }).then((r) => {
      console.log(r);
    });

    console.log("提交", body);
  } else {
    toast.error("请填写正确的信息");
  }
};

// 返回分类id
const getCategoryIds = () => {
  const ids: string[] = [];
  if (categorySelector.value?.categorySelected) {
    for (const item of categorySelector.value.categorySelected) {
      ids.push(item.id);
    }
  }
  return ids;
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
