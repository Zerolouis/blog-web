<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title class="bg-accent table-title">
          <div>分类</div>
          <div>
            <v-btn variant="tonal" @click="navigateTo('/manager/write')">
              添加文章
            </v-btn>
          </div>
        </v-card-title>

        <v-data-table
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
          <template #[`item.title`]="{ item }">
            <div v-tooltip:top="item?.description">
              {{ item?.title }}
            </div>
          </template>

          <template #[`item.userId`]="{ item }">
            <v-chip size="small" color="info" pill>
              <v-avatar start>
                <v-img :src="userInfoMap.get(item.userId)?.avatar" />
              </v-avatar>
              {{ userInfoMap.get(item.userId)?.nickname }}
            </v-chip>
          </template>

          <template #[`header.createTime`]>
            <v-chip color="accent" prepend-icon="mdi-clock"> 创建时间 </v-chip>
          </template>
          <template #[`header.updateTime`]>
            <v-chip color="accent" prepend-icon="mdi-clock"> 更新时间 </v-chip>
          </template>
          <template #[`item.createTime`]="{ item }">
            {{ $dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
          <template #[`item.updateTime`]="{ item }">
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
    </v-container>

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
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import {
  type ArticleData,
  type ArticleDataArray,
  ArticleDataArraySchema,
  ArticleDataSchema,
  type CommonMessage,
  type TagQuery,
  type UserSimpleInfo,
  UserSimpleInfoSchema,
} from "~/ts/types/api.type";

definePageMeta({
  layout: "desktop-manager",
  middleware: "auth",
  title: "文章管理",
});

const user = useUserStore();
const toast = useToastStore();

const showDeleteDialog = ref(false);
const dialogLoading = ref(false);
const tableHeaders = [
  {
    title: "文章id",
    value: "id",
    align: "start",
    sortable: true,
    key: "id",
    width: 140,
  },
  { title: "文章标题", value: "title", key: "title", align: "start" },
  {
    title: "发布者",
    value: "userId",
    key: "userId",
    align: "start",
    width: 120,
  },
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
const serverItems: Ref<ArticleDataArray> = ref([]);
const itemsPerPage: Ref<number> = ref(10);
const page: Ref<number> = ref(1);
const userInfoMap = reactive(new Map<UserSimpleInfo>());

const loadItems = async (item: {
  page: number;
  itemsPerPage: number;
  sortBy: string[];
  groupBy: string[];
  search: string;
}) => {
  await queryArticles(item);
};

const queryArticles = async (item: {
  page: number;
  itemsPerPage: number;
  sortBy: string[];
  groupBy: string[];
  search: string;
}) => {
  loading.value = true;
  await $fetch<CommonMessage>("/api/manager/article/page", {
    method: "POST",
    body: item,
    headers: {
      Authorization: user.getToken,
    },
  })
    .then(async (res) => {
      const { data, success } = ArticleDataArraySchema.safeParse(
        res.data.records,
      );
      if (success) {
        //console.log(data);
        serverItems.value = data || [];
        await queryUsers();
        totalItems.value = res.data.total;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const queryUsers = async () => {
  const set = new Set<string>();
  for (let i = 0; i < serverItems.value.length; i++) {
    set.add(serverItems.value[i].userId);
  }
  set.forEach((item) => {
    $fetch<CommonMessage>("/api/blog/user", {
      query: {
        id: item,
      },
    }).then((res) => {
      const { data } = UserSimpleInfoSchema.safeParse(res.data);
      if (data) {
        userInfoMap.set(item, data);
      }
    });
  });
};

const btnCancel = () => {};
const deleteId = ref("");
const btnShowDeleteDialog = (item: ArticleData) => {
  deleteId.value = item.id;
  showDeleteDialog.value = true;
};
const btnShowEditDialog = (item: ArticleData) => {
  navigateTo(`/manager/edit?id=${item.id}`);
};

const btnConfirmDelete = () => {
  dialogLoading.value = true;
  $fetch<CommonMessage>("/api/manager/article", {
    body: {
      id: deleteId.value,
    },
    headers: {
      Authorization: user.getToken,
    },
    method: "DELETE",
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
      showDeleteDialog.value = false;
      queryUsers();
    });
};
</script>

<style scoped lang="scss">
.table-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
