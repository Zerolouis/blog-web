<template>
  <div>
    <v-card>
      <v-card-title class="bg-accent table-title">
        <div>分类</div>
        <div>
          <v-btn @click="btnShowEditDialog" variant="tonal"> 添加分类 </v-btn>
        </div>
      </v-card-title>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="tableHeaders"
        :items="serverItems"
        :loading="loading"
        :search="search"
        item-value="name"
      >
        <template #[`item.name`]="{ item }">
          <div v-tooltip:top="item?.description">
            {{ item?.name }}
          </div>
        </template>

        <template #[`header.createTime`]>
          <v-chip color="info" prepend-icon="mdi-clock"> 创建时间 </v-chip>
        </template>
        <template #[`header.updateTime`]>
          <v-chip color="info" prepend-icon="mdi-clock"> 更新时间 </v-chip>
        </template>
        <template #[`item.createTime`]="{ item, index }">
          {{ $dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
        <template #[`item.updateTime`]="{ item, index }">
          {{ $dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>

        <template #[`item.actions`]="{ item, index }">
          <v-btn
            v-tooltip:top="'编辑'"
            color="accent"
            variant="text"
            icon="mdi-pencil"
            size="small"
            @click="btnShowEditDialog(item)"
          />
          <v-btn
            v-tooltip:top="'删除'"
            color="error"
            variant="text"
            icon="mdi-delete"
            size="small"
            @click="btnShowDeleteDialog(item)"
          />
        </template>
      </v-data-table>
    </v-card>
  </div>

  <v-dialog v-model="showEditDialog" persistent width="30%">
    <v-card>
      <v-card-title class="bg-info"> {{ editDialogTitle }} </v-card-title>
      <v-container>
        <v-form @submit.prevent>
          <v-text-field label="id" disabled></v-text-field>
          <v-text-field label="分类名称" v-model="editFormName"></v-text-field>
          <v-text-field
            label="描述"
            v-model="editFormDescription"
          ></v-text-field>
          <v-select
            :items="serverItems"
            item-value="id"
            return-object
            item-title="name"
            label="父亲分类"
            v-model="editFormParent"
          ></v-select>
        </v-form>
      </v-container>
      <v-divider />
      <v-card-actions>
        <v-btn color="warning" @click="btnCancel">取消</v-btn>
        <v-btn color="primary" @click="btnConfirmEdit">确定</v-btn>
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
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import {
  CategoryQueryArraySchema,
  type CategoryList,
  type CategoryQuery,
  type CommonMessage,
  type TagQuery,
  type CategoryArray,
} from "~/ts/types/api.type";

const user = useUserStore();
const toast = useToastStore();

const showEditDialog = ref(false);
const showDeleteDialog = ref(false);
const editDialogTitle = ref("");

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
const serverItems: Ref<Array<CategoryQuery>> = ref([]);
const itemsPerPage: Ref<number> = ref(10);
const page: Ref<number> = ref(1);

const editFormId = ref("");
const editFormParent = ref();
const editFormDescription = ref("");
const editFormName = ref("");

const categoryMap: Map<string, CategoryQuery> = reactive(new Map());

const btnShowAddDialog = () => {
  editDialogTitle.value = "添加";
  editFormDescription.value = "";
  editFormName.value = "";
  showEditDialog.value = true;
};

const btnShowEditDialog = (item: CategoryQuery) => {
  editFormParent.value = categoryMap.get(item.parentId);
  // console.log(editFormParent.value);

  editFormId.value = item.id;
  editFormName.value = item.name;
  editFormDescription.value = item.description;
  editDialogTitle.value = "编辑";
  showEditDialog.value = true;
};

const btnShowDeleteDialog = (item: CategoryQuery) => {
  showDeleteDialog.value = true;
};

const btnCancel = () => {
  showEditDialog.value = false;
  showDeleteDialog.value = false;
};

const btnConfirmEdit = () => {};

const btnConfirmDelete = () => {};

const queryCategory = async () => {
  loading.value = true;
  const { data } = await useFetch<CommonMessage>("/api/manager/category", {
    method: "get",
    headers: {
      Authorization: user.getToken,
    },
  });

  const { data: categoryArray } = await CategoryQueryArraySchema.safeParseAsync(
    data.value?.data,
  );
  console.log();

  serverItems.value = categoryArray || [];
  console.log(serverItems.value);
  for (const category of serverItems.value) {
    categoryMap.set(category.id, category);
  }
  loading.value = false;
};

await queryCategory();

console.log(categoryMap);
</script>

<style scoped lang="scss">
.table-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
