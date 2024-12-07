<template>
  <div>
    <v-card>
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
      />
    </v-card>
  </div>

  <v-dialog v-model="showEditDialog" persistent width="30%">
    <v-card>
      <v-card-title class="bg-info"> {{ editDialogTitle }} </v-card-title>
      <v-container>
        <v-form @submit.prevent>
          <v-text-field label="分类"></v-text-field>
          <v-text-field label="名称"></v-text-field>
          <v-text-field label="描述"></v-text-field>
          <v-text-field label="父亲分类"></v-text-field>
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
import type { TagQuery } from "~/ts/types/api.type";

const user = useUserStore();
const toast = useToastStore();

const showEditDialog = ref(false);
const showDeleteDialog = ref(false);
const editDialogTitle = ref();

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
  // await queryTagsPage(item);
};

const btnCancel = () => {
  showEditDialog.value = false;
  showDeleteDialog.value = false;
};

const btnConfirmEdit = () => {};

const btnConfirmDelete = () => {};
</script>

<style scoped lang="scss"></style>
