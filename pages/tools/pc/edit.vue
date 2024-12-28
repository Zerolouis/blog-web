<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>配置单</h1>
          <p>您可以在此页面创建配置单，所有数据均保存在浏览器本地</p>
        </v-col>
        <v-col :cols="12">
          <v-form>
            <v-card elevation="0">
              <v-card-title primary-title> 添加硬件 </v-card-title>
              <v-container>
                <v-form ref="diyForm" fast-fail>
                  <v-select
                    v-model="formDevice"
                    return-object
                    item-title="name"
                    :rules="rules.deviceType"
                    :items="deviceList"
                    label="设备"
                  />
                  <v-text-field
                    v-model="formModel"
                    name="name"
                    :rules="rules.name"
                    label="型号"
                    validate-on="blur"
                  />
                  <v-text-field
                    v-model="formPrice"
                    :rules="rules.price"
                    name="price"
                    validate-on="blur"
                    label="价格"
                  />
                  <v-textarea
                    v-model="formDescription"
                    :rules="rules.other"
                    validate-on="blur"
                    name="other"
                    counter
                    label="备注"
                  />
                </v-form>
              </v-container>

              <v-card-actions class="actions">
                <v-btn
                  class="actions-btn"
                  color="secondary"
                  variant="flat"
                  append-icon="mdi-export"
                >
                  分享
                </v-btn>
                <v-btn
                  class="actions-btn"
                  color="secondary"
                  variant="flat"
                  append-icon="mdi-import"
                >
                  导入
                </v-btn>

                <v-btn
                  class="actions-btn"
                  color="error"
                  variant="flat"
                  @click="btnReset"
                >
                  重置
                </v-btn>
                <v-btn
                  class="actions-btn"
                  color="primary"
                  variant="flat"
                  @click="btnAdd"
                >
                  添加
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
        <v-col :cols="12">
          <ToolsDeviceTable @edit="handleEdit" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useDIYStore } from "~/stores/toolsPC";
import type { VForm } from "vuetify/components";
import type { DiYDeviceItem } from "~/ts/interface/tools.interface";

definePageMeta({
  layout: "desktop-tools",
  title: "配置单",
});

useHead({
  title: "编辑配置单",
});

const diyStore = useDIYStore();
const { tableData, deviceList } = storeToRefs(diyStore);
const diyForm = ref<VForm>();
const toast = useToastStore();

const formDevice = ref();
const formModel = ref("");
const formPrice = ref();
const formDescription = ref();

const rules = {
  deviceType: [(value: object) => !!value || "请选择设备"],
  name: [(value: string) => !!value || "请输入设备型号"],
  price: [(value: string) => !isNaN(Number(value)) || "请输入正确的价格"],
  other: [(value: string) => !value || value.length < 50 || "字数过多"],
};

const btnReset = () => {
  diyForm.value?.reset();
};

const btnAdd = async () => {
  if (diyForm.value) {
    const { valid } = await diyForm.value.validate();
    if (valid) {
      tableData.value?.devices.push({
        category: formDevice.value,
        price: Number(formPrice.value),
        model: formPrice.value,
        description: formDescription.value,
      });
    } else {
      toast.error("输入数据错误");
    }
  }
};

const handleEdit = (item: DiYDeviceItem) => {
  formDescription.value = item.description;
  formModel.value = item.model;
  formPrice.value = item.price;
  formDevice.value = item.category;
};
</script>

<style scoped lang="scss">
.actions {
  display: flex;
  justify-content: end;
  .actions-btn {
    margin: 0 2px;
  }
}
</style>
