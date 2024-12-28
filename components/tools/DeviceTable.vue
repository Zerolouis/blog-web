<template>
  <div>
    <v-card variant="flat">
      <v-card-title class="card-title">
        <div>
          <span> {{ tableData.name }} </span>
          <v-btn
            v-tooltip:top="'编辑配置单名称'"
            size="small"
            icon
            variant="flat"
            @click="showEditNameDialog = true"
          >
            <v-icon color="accent"> mdi-pencil </v-icon>
          </v-btn>
          <v-btn
            v-tooltip:top="'重置配置单'"
            size="small"
            icon
            variant="flat"
            @click="diyStore.resetDevices()"
          >
            <v-icon color="warning"> mdi-restore </v-icon>
          </v-btn>
        </div>
        <div class="price">
          <span class="price-text">总价格:</span>
          <span class="price-number">{{ tableData?.total }}</span>
        </div>
      </v-card-title>
      <v-data-table
        density="compact"
        :items="tableData.devices"
        :headers="tableHeaders"
        items-per-page="0"
        hide-default-footer
      >
        <template #[`item.actions`]="{ item, index }">
          <v-btn icon variant="flat" size="small" @click="btnEdit(item)">
            <v-icon color="info"> mdi-content-copy </v-icon>
          </v-btn>

          <v-btn
            icon
            variant="flat"
            size="small"
            @click="diyStore.deleteDevice(index)"
          >
            <v-icon color="error"> mdi-delete-outline </v-icon>
          </v-btn>
        </template>
        <template #[`item.category`]="{ item }">
          <v-chip class="chip" pill :color="item.category.color">
            <v-icon class="chip-pre-icon">
              {{ item.category.icon }}
            </v-icon>
            {{ item.category.name }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="showEditNameDialog" width="500">
      <v-card>
        <v-card-title class="bg-info"> 修改配置单名称 </v-card-title>
        <v-container>
          <v-form ref="editNameForm">
            <v-text-field
              :rules="[(value) => checkEmptyName(value, '配置单名称')]"
              v-model="formName"
              :placeholder="tableData.name"
            />
          </v-form>
        </v-container>
        <v-divider />
        <v-card-actions>
          <v-btn color="warning" @click="showEditNameDialog = false">
            取消
          </v-btn>
          <v-btn color="primary" @click="confirmEditName"> 确定 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import type { DiYDeviceItem } from "~/ts/interface/tools.interface";
import { checkEmptyName } from "~/composables/useVerify";
import type { VForm } from "vuetify/components";

const tableHeaders = [
  {
    title: "配件类型",
    key: "category",
    value: "category",
    sortable: false,
    width: 150,
  },
  {
    title: "型号",
    key: "model",
    sortable: false,
  },
  {
    title: "价格",
    key: "price",
    sortable: true,
    width: 150,
  },
  {
    title: "备注",
    key: "description",
    sortable: false,
  },
  {
    title: "操作",
    key: "actions",
    width: 150,
    sortable: false,
  },
];
const toast = useToastStore();
const diyStore = useDIYStore();
const { tableData } = storeToRefs(diyStore);
const showEditNameDialog = ref(false);
const editNameForm = ref<VForm>();
const formName = ref("");
const confirmEditName = async () => {
  if (editNameForm.value) {
    const { valid } = await editNameForm.value.validate();
    if (valid) {
      tableData.value.name = formName.value;
      showEditNameDialog.value = false;
    } else {
      toast.error("配置单名称不能为空");
    }
  }
};

const emits = defineEmits<{
  (e: "edit", item: DiYDeviceItem): void;
}>();

const btnEdit = (item: DiYDeviceItem) => {
  emits("edit", item);
};
</script>

<style scoped lang="scss">
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .price {
    &-text {
    }
    &-number {
      color: rgb(62, 114, 186);
      font-weight: 700;
      margin-left: 10px;
    }
  }
}

.chip {
  align-items: center;
  .chip-pre-icon {
    margin-right: 5px;
  }
}
</style>
