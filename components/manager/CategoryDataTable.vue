<template>
  <div>
    <v-card>
      <v-card-title class="bg-accent table-title">
        <div>分类</div>
        <div>
          <v-btn variant="tonal" @click="btnShowAddDialog"> 添加分类 </v-btn>
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
    <v-card :loading="dialogLoading">
      <v-card-title class="bg-info"> {{ editDialogTitle }} </v-card-title>
      <v-container>
        <v-form ref="editForm" @submit.prevent>
          <v-text-field v-model="editFormId" label="id" disabled />
          <v-text-field
            v-model="editFormName"
            :rules="[(value) => checkEmptyName(value, '分类名称')]"
            label="分类名称"
          />

          <v-select
            v-model="editFormParent"
            :items="parentItems"
            item-value="id"
            :rules="[
              (value) => checkEmptyName(value, '父亲分类'),
              (value) =>
                value.id === editFormId ? '父亲节点不能为自己' : true,
            ]"
            return-object
            item-title="name"
            label="父亲分类"
          />

          <v-textarea
            v-model="editFormDescription"
            hint="字数不超过200"
            :rule="[
              (value: string) =>
                value.length > 200 ? '字数不能超过200' : true,
            ]"
            counter
            label="描述"
          />
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
    <v-card :loading="dialogLoading">
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
  CategoryQuerySchema,
} from "~/ts/types/api.type";
import { checkEmpty, checkEmptyName } from "~/composables/useVerify";
import type { VForm } from "vuetify/components";

const user = useUserStore();
const toast = useToastStore();
const emit = defineEmits<{
  updateData: [value: boolean];
}>();
const update: Ref<boolean> = ref(false);

const showEditDialog = ref(false);
const showDeleteDialog = ref(false);
const editDialogTitle = ref("");
const isEdit = ref(false);

const tableHeaders = [
  {
    title: "分类ID",
    value: "id",
    align: "start",
    sortable: true,
    key: "id",
    width: 140,
  },
  { title: "分类名称", value: "name", key: "name", align: "start" },
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

const root: CategoryQuery = {
  createTime: "",
  isDeleted: "",
  parentId: "",
  updateTime: "",
  id: "0",
  name: "根目录",
};

const loading = ref(false);
const search = ref("");
const totalItems: Ref<number> = ref(0);
const serverItems: Ref<Array<CategoryQuery>> = ref([]);
const parentItems: Ref<Array<CategoryQuery>> = ref([]);
const itemsPerPage: Ref<number> = ref(10);
const page: Ref<number> = ref(1);
// 编辑表单
const editForm = ref<VForm>();
const editFormId = ref("");
const editFormParent = ref();
const editFormDescription: Ref<string | null | undefined> = ref("");
const editFormName = ref("");
const dialogLoading = ref(false);

const deleteId = ref("");

const categoryMap: Map<string, CategoryQuery> = reactive(new Map());

const btnShowAddDialog = () => {
  editDialogTitle.value = "添加";
  isEdit.value = false;
  editFormDescription.value = "";
  editFormName.value = "";
  editFormParent.value = root;
  showEditDialog.value = true;
};

const btnShowEditDialog = (item: CategoryQuery) => {
  editFormParent.value = categoryMap.get(item.parentId);
  editFormId.value = item.id;
  editFormName.value = item.name;
  editFormDescription.value = item.description;
  editDialogTitle.value = "编辑";
  isEdit.value = true;
  showEditDialog.value = true;
};

const btnShowDeleteDialog = (item: CategoryQuery) => {
  deleteId.value = item.id;
  showDeleteDialog.value = true;
};

const btnCancel = () => {
  showEditDialog.value = false;
  showDeleteDialog.value = false;
};

const btnConfirmEdit = async () => {
  if (editForm.value) {
    // 输入合法检查
    const { valid } = await editForm.value.validate();
    if (!valid) {
      return;
    }
    dialogLoading.value = true;
    if (isEdit.value) {
      modifyCategory();
    } else {
      addCategory();
    }
  }
};

const btnConfirmDelete = () => {
  removeCategory(deleteId.value);
};

const firstQueryCategory = async () => {
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
  serverItems.value = categoryArray || [];
  parentItems.value = JSON.parse(JSON.stringify(categoryArray));

  categoryMap.set("0", root);
  parentItems.value.push(root);
  for (const category of serverItems.value) {
    categoryMap.set(category.id, category);
  }
  loading.value = false;
};

const queryCategory = () => {
  loading.value = true;
  $fetch<CommonMessage>("/api/manager/category", {
    method: "get",
    headers: {
      Authorization: user.getToken,
    },
  }).then(async (res) => {
    const { data: categoryArray } =
      await CategoryQueryArraySchema.safeParseAsync(res.data);
    serverItems.value = categoryArray || [];
    parentItems.value = JSON.parse(JSON.stringify(categoryArray));
    categoryMap.clear();

    categoryMap.set("0", root);
    parentItems.value.push(root);
    for (const category of serverItems.value) {
      categoryMap.set(category.id, category);
    }
    loading.value = false;
  });
};

const modifyCategory = () => {
  $fetch<CommonMessage>("/api/manager/category", {
    method: "PUT",
    body: {
      id: editFormId.value,
      parentId: editFormParent.value.id,
      description: editFormDescription.value,
      name: editFormName.value,
    },
    headers: {
      Authorization: user.getToken,
    },
  })
    .then((res) => {
      if (res.code === "200") {
        toast.success("修改成功");
      } else {
        toast.error(res.msg);
      }
    })
    .finally(() => {
      dialogLoading.value = false;
      showEditDialog.value = false;
      updateContent();
    });
};

const addCategory = () => {
  $fetch<CommonMessage>("/api/manager/category", {
    method: "POST",
    body: {
      parentId: editFormParent.value.id,
      description: editFormDescription.value,
      name: editFormName.value,
    },
    headers: {
      Authorization: user.getToken,
    },
  })
    .then((res) => {
      if (res.code === "200") {
        toast.success("添加成功");
      } else {
        toast.error(res.msg);
      }
    })
    .finally(() => {
      dialogLoading.value = false;
      showEditDialog.value = false;
      updateContent();
    });
};

const removeCategory = (id: string) => {
  $fetch<CommonMessage>("/api/manager/category", {
    method: "DELETE",
    body: {
      id,
    },
    headers: {
      Authorization: user.getToken,
    },
  })
    .then((res) => {
      if (res.code === "200") {
        toast.success("删除成功");
      } else {
        toast.error(res.msg);
      }
    })
    .finally(() => {
      dialogLoading.value = false;
      showEditDialog.value = false;
      updateContent();
    });
};

const updateContent = () => {
  queryCategory();
  update.value = !update.value;
  emit("updateData", update.value);
};

await firstQueryCategory();
</script>

<style scoped lang="scss">
.table-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
