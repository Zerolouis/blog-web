<template>
  <v-card>
    <v-card-title class="bg-info panel-title">
      <span>文件分享</span>
      <v-tooltip location="top" text="添加文件">
        <template #activator="{ props }">
          <v-btn
            size="small"
            variant="tonal"
            icon
            v-bind="props"
            @click="btnShowDialog"
          >
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-card-title>
    <v-data-table
      :headers="shareListHeaders"
      :items="fileList"
      density="compact"
    >
      <template #[`item.actions`]="{ item, index }">
        <v-tooltip location="top" text="编辑">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              density="compact"
              icon
              variant="flat"
              @click="btnEdit(item, index)"
            >
              <v-icon size="small" color="info"> mdi-pencil </v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip location="top" text="删除">
          <template #activator="{ props }"
            ><v-btn
              v-bind="props"
              density="compact"
              icon
              variant="flat"
              @click="btnDelete(index)"
            >
              <v-icon size="small" color="error"> mdi-delete </v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </template>

      <template #[`item.url`]="{ item }">
        {{ item.url }}

        <v-tooltip location="top" text="打开链接">
          <template #activator="{ props }"
            ><v-btn
              density="compact"
              icon
              variant="flat"
              v-bind="props"
              @click="
                navigateTo(item.url, {
                  open: {
                    target: '_blank',
                  },
                })
              "
            >
              <v-icon size="small" color="info">
                mdi-arrow-top-right-bold-box-outline
              </v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </template>

      <template #[`item.method`]="{ item }">
        {{ item.method.title }}
      </template>
    </v-data-table>
  </v-card>

  <!--添加文件对话框-->
  <v-dialog v-model="showDialog" persistent width="500">
    <v-card>
      <v-card-title class="bg-info"> 添加文件 </v-card-title>
      <v-container>
        <v-form ref="form" validate-on="blur">
          <v-select
            v-model="method"
            :rules="[(value) => checkEmptyName(value, '分享方式')]"
            label="分享方式"
            :items="shareMethods"
            item-value="id"
            item-title="title"
            color="info"
            return-object
          />
          <v-text-field
            v-model="url"
            :rules="[
              (value) => checkEmptyName(value, '分享链接'),
              (value) => (checkHttpsAndHttp(value) ? true : '链接格式错误'),
            ]"
            label="分享链接"
            color="info"
          />
          <v-textarea
            v-model="description"
            messages="该说明将显示在下载按钮上"
            label="说明"
            color="info"
            counter
          />
        </v-form>
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn color="warning" @click="btnCancel"> 取消 </v-btn>
        <v-btn
          v-if="editIndex !== undefined"
          color="primary"
          @click="btnConfirmEdit"
        >
          修改
        </v-btn>
        <v-btn
          v-if="editIndex == undefined"
          color="primary"
          @click="btnConfirmAdd"
        >
          新增
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  type FileShareListItem,
  shareCategory,
} from "~/ts/interface/api.interface";
import type { Ref } from "vue";

const showDialog = ref(false);
const shareMethods = reactive(shareCategory);
const method = ref();
const url = ref();
const description = ref();
const form: any = ref(null);
const toast = useToastStore();
const editIndex = ref();

const fileList: Ref<Array<FileShareListItem>> = ref([]);
const shareListHeaders = [
  {
    title: "分享方式",
    value: "method",
    key: "method",
    width: 120,
  },
  {
    title: "地址",
    value: "url",
    key: "url",
  },
  {
    title: "操作",
    value: "actions",
    key: "actions",
    width: 100,
  },
];

const btnShowDialog = () => {
  showDialog.value = true;
  method.value = undefined;
  url.value = undefined;
  description.value = undefined;
};

const btnCancel = () => {
  showDialog.value = false;
  editIndex.value = undefined;
};

const btnConfirmAdd = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    console.log(method.value, url.value, description.value);
    fileList.value.push({
      method: method.value,
      url: url.value,
      description: description.value,
    });
    showDialog.value = false;
    editIndex.value = undefined;
  } else {
    toast.error("请填写正确的信息");
  }
};

const btnConfirmEdit = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    fileList.value[editIndex.value] = {
      method: method.value,
      url: url.value,
      description: description.value,
    };
  } else {
    toast.error("请填写正确的信息");
  }
};

const btnEdit = (item: FileShareListItem, index: number) => {
  console.log(item, index);
  editIndex.value = index;
  method.value = item.method;
  url.value = item.url;
  description.value = item.description;
  showDialog.value = true;
};

const btnDelete = (index: number) => {
  fileList.value.splice(index, 1);
};

defineExpose({
  fileList,
});
</script>

<style scoped lang="scss">
.panel-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.none-text-tip {
  text-align: center;
  margin-top: 20px;
}
</style>
