<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-sheet elevation="2">
            <v-data-table-server
              v-model:items-per-page="itemsPerPage"
              :headers="tableHeaders"
              :items="serverItems"
              :items-length="totalItems"
              :loading="loading"
              :search="search"
              item-value="name"
              @update:options="loadItems"
            >
              <template #top>
                <v-container>
                  <div class="table-top-container">
                    <h2 class="font-weight-bold">标签表</h2>
                    <v-spacer />
                    <v-btn color="primary" variant="flat" @click="btnShowAdd">
                      添加标签
                    </v-btn>
                  </div>
                </v-container>
              </template>

              <template #[`item.actions`]="{ item, index }">
                <v-btn
                  v-tooltip:top="'编辑'"
                  color="accent"
                  variant="text"
                  icon="mdi-pencil"
                  size="small"
                  @click="btnShowEdit(item)"
                />
                <v-btn
                  v-tooltip:top="'删除'"
                  color="error"
                  variant="text"
                  icon="mdi-delete"
                  size="small"
                  @click="btnShowDelete(item)"
                />
              </template>
              <template #[`item.createTime`]="{ item, index }">
                {{ $dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss") }}
              </template>
              <template #[`item.updateTime`]="{ item, index }">
                {{ $dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
              </template>
            </v-data-table-server>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="showEditDialog" width="30%" persistent>
      <v-card>
        <v-card-title class="bg-info"> {{ dialogTitle }} </v-card-title>
        <v-container>
          <v-form @submit.prevent>
            <v-text-field
              v-model="editForm.id"
              :disabled="true"
              label="标签id"
            />

            <v-text-field v-model="editForm.name" label="标签名称" />
          </v-form>
        </v-container>
        <v-divider />
        <v-card-actions>
          <v-btn color="warning" @click="btnCancel">取消</v-btn>
          <v-btn color="primary" @click="btnConfirm">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { CommonMessage, TagQuery } from "~/ts/types/api.type";

definePageMeta({
  layout: "desktop-manager",
  title: "标签",
});
const user = useUserStore();
const showEditDialog = ref(false);
const editForm: Ref<{
  isEdit: boolean;
  title: string;
  id: string;
  name: string;
}> = ref({
  isEdit: false,
  title: "",
  id: "",
  name: "",
});

const dialogIsEdit = ref(false);
const dialogTitle = ref("");
const dialogFormId = ref("");
const dialogFormName = ref("");

const deleteId: Ref<string> = ref();
const tableHeaders = [
  {
    title: "标签ID",
    value: "id",
    align: "start",
    sortable: true,
    key: "id",
    width: 120,
  },
  { title: "标签名称", value: "name", key: "name", align: "end" },
  {
    title: "创建时间",
    value: "createTime",
    key: "createTime",
    sortable: false,
    align: "end",
  },
  {
    title: "修改时间",
    value: "updateTime",
    key: "updateTime",
    align: "end",
    sortable: false,
    width: 200,
  },
  {
    title: "操作",
    value: "actions",
    key: "actions",
    align: "end",
    sortable: false,
    width: 200,
  },
];

const loading = ref(false);
const search = ref("");
const totalItems: Ref<number> = ref(0);
const serverItems: Ref<Array<TagQuery>> = ref([]);
const itemsPerPage: Ref<number> = ref(10);
const loadItems = async (item: {
  page: number;
  itemsPerPage: number;
  sortBy: string[];
  groupBy: string[];
  search: string;
}) => {
  loading.value = true;
  await queryTagsPage(item);
  loading.value = false;
};
// 请求数据
const queryTagsPage = async (item: {
  page: number;
  itemsPerPage: number;
  sortBy: string[];
  groupBy: string[];
  search: string;
}) => {
  const { data } = await useFetch<CommonMessage>("/api/manager/tag/all", {
    method: "POST",
    body: item,
    headers: {
      Authorization: user.getToken,
    },
  });
  totalItems.value = data.value?.data.total;
  serverItems.value = data.value?.data.records;
};

const btnShowAdd = () => {
  editForm.value.id = "";
  dialogTitle.value = "添加标签";
  editForm.value.isEdit = false;
  showEditDialog.value = true;
};

const btnShowEdit = (item: TagQuery) => {
  dialogTitle.value = "编辑标签";
  editForm.value.isEdit = true;
  showEditDialog.value = true;
};

const btnConfirm = () => {};
const btnShowDelete = (item: TagQuery) => {
  deleteId.value = item.id;
};

const btnConfirmDelete = (item: TagQuery) => {};

const btnCancel = () => {
  showEditDialog.value = false;
};
</script>

<style scoped lang="scss">
.table-top-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
