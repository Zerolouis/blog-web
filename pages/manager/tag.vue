<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-sheet elevation="2">
            <v-data-table-server
              v-model:items-per-page="itemsPerPage"
              v-model:page="page"
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

              <template #[`item.name`]="{ item }">
                <v-chip color="primary" variant="flat" prepend-icon="mdi-label">
                  {{ item.name }}
                </v-chip>
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

              <template #[`header.createTime`]>
                <v-chip color="info" prepend-icon="mdi-clock">
                  创建时间
                </v-chip>
              </template>
              <template #[`header.updateTime`]>
                <v-chip color="info" prepend-icon="mdi-clock">
                  更新时间
                </v-chip>
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
              v-model="dialogFormId"
              :disabled="true"
              label="标签id"
            />

            <v-text-field v-model="dialogFormName" label="标签名称" />
          </v-form>
        </v-container>
        <v-divider />
        <v-card-actions>
          <v-btn color="warning" @click="btnCancel">取消</v-btn>
          <v-btn color="primary" @click="btnConfirm">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showDeleteDialog" width="30%">
      <v-card>
        <v-card-title class="bg-error text-white"> 确认删除？ </v-card-title>
        <v-card-text>
          将删除该标签和该标签关联的关联信息，是否确定？
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" @click="btnCancel">取消</v-btn>
          <v-btn color="primary" @click="btnConfirmDelete">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { CommonMessage, TagQuery } from "~/ts/types/api.type";
import { checkMessage } from "#imports";

definePageMeta({
  layout: "desktop-manager",
  title: "标签",
});
const user = useUserStore();
const toast = useToastStore();

const showEditDialog = ref(false);
const showDeleteDialog = ref(false);

const dialogIsEdit = ref(false);
const dialogTitle = ref("");
const dialogFormId = ref("");
const dialogFormName = ref("");

const deleteId: Ref<string> = ref("");
const tableHeaders = [
  {
    title: "标签ID",
    value: "id",
    align: "start",
    sortable: true,
    key: "id",
    width: 140,
  },
  { title: "标签名称", value: "name", key: "name", align: "start" },
  {
    title: "创建时间",
    value: "createTime",
    key: "createTime",
    sortable: false,
    align: "start",
    width: 200,
  },
  {
    title: "修改时间",
    value: "updateTime",
    key: "updateTime",
    align: "start",
    sortable: false,
    width: 200,
  },
  {
    title: "操作",
    value: "actions",
    key: "actions",
    align: "start",
    sortable: false,
    width: 120,
  },
];

const loading = ref(false);
const search = ref("");
const totalItems: Ref<number> = ref(0);
const serverItems: Ref<Array<TagQuery>> = ref([]);
const itemsPerPage: Ref<number> = ref(10);
const page: Ref<number> = ref(1);
const loadItems = async (item: {
  page: number;
  itemsPerPage: number;
  sortBy: string[];
  groupBy: string[];
  search: string;
}) => {
  await queryTagsPage(item);
};
// 请求数据
const queryTagsPage = async (item: {
  page: number;
  itemsPerPage: number;
  sortBy?: string[];
  groupBy?: string[];
  search?: string;
}) => {
  loading.value = true;

  const { data } = await useFetch<CommonMessage>("/api/manager/tag/all", {
    method: "POST",
    body: item,
    headers: {
      Authorization: user.getToken,
    },
  });
  totalItems.value = data.value?.data.total;
  serverItems.value = data.value?.data.records;
  loading.value = false;
};

const btnShowAdd = () => {
  dialogTitle.value = "添加标签";
  dialogFormId.value = "";
  dialogFormName.value = "";
  dialogIsEdit.value = false;
  showEditDialog.value = true;
};

const btnShowEdit = (item: TagQuery) => {
  dialogTitle.value = "编辑标签";
  dialogFormId.value = item.id;
  dialogFormName.value = item.name;
  dialogIsEdit.value = true;
  showEditDialog.value = true;
};

const btnConfirm = () => {
  if (dialogIsEdit.value) {
    $fetch("/api/manager/tag", {
      method: "PUT",
      headers: {
        Authorization: user.getToken,
      },
      body: {
        id: dialogFormId.value,
        name: dialogFormName.value,
      },
    }).then(async (res) => {
      const { data } = await checkMessage(res);
      if (data?.code === "200") {
        toast.success("修改成功");
        const item = {
          page: page.value,
          itemsPerPage: itemsPerPage.value,
        };
        await queryTagsPage(item);
      } else {
        toast.error(data?.msg);
      }
    });
  } else {
    $fetch("/api/manager/tag", {
      method: "POST",
      headers: {
        Authorization: user.getToken,
      },
      body: {
        tags: [dialogFormName.value],
      },
    }).then(async (res) => {
      const { data } = await checkMessage(res);
      if (data?.code === "200") {
        toast.success("添加成功");
        const item = {
          page: page.value,
          itemsPerPage: itemsPerPage.value,
        };
        await queryTagsPage(item);
      } else {
        toast.error(data?.msg);
      }
    });
  }

  showEditDialog.value = false;
};
const btnShowDelete = (item: TagQuery) => {
  deleteId.value = item.id;
  showDeleteDialog.value = true;
};

const btnConfirmDelete = () => {
  $fetch("/api/manager/tag", {
    method: "DELETE",
    headers: {
      Authorization: user.getToken,
    },
    body: {
      id: deleteId.value,
    },
  }).then(async (res) => {
    const { data } = await checkMessage(res);
    if (data?.code === "200") {
      toast.success("删除成功");
      const item = {
        page: page.value,
        itemsPerPage: itemsPerPage.value,
      };
      await queryTagsPage(item);
    } else {
      toast.error("标签可能已经被删除");
    }
  });
  showDeleteDialog.value = false;
};

const btnCancel = () => {
  showDeleteDialog.value = false;
  showEditDialog.value = false;
  dialogFormId.value = "";
  dialogFormName.value = "";
};
</script>

<style scoped lang="scss">
.table-top-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
