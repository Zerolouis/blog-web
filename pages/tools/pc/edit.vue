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
                <v-form ref="itemForm">
                  <v-select
                    item-value="value"
                    item-title="title"
                    :rules="rules.deviceType"
                    label="设备"
                  />
                  <v-text-field name="name" :rules="rules.name" label="型号" />
                  <v-text-field
                    :rules="rules.price"
                    name="price"
                    label="价格"
                  />
                  <v-textarea
                    :rules="rules.other"
                    name="other"
                    counter
                    label="备注"
                  />
                </v-form>
              </v-container>

              <v-card-actions>
                <v-container style="text-align: right">
                  <v-btn color="accent" variant="flat" append-icon="mdi-export">
                    分享
                  </v-btn>
                  <v-btn color="accent" variant="flat" append-icon="mdi-import">
                    导入
                  </v-btn>
                  <v-btn color="error" variant="flat"> 清空 </v-btn>
                  <v-btn color="warning" variant="flat"> 重置 </v-btn>
                  <v-btn color="info" variant="flat"> 添加 </v-btn>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
        <v-col :cols="12">
          <ToolsDeviceTable />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "desktop-tools",
  title: "配置单",
});

useHead({
  title: "编辑配置单",
});

const deviceType = ref([
  {
    title: "CPU",
    level: 0,
    color: "#d1103b",
    icon: "mdi-cpu-64-bit",
  },
  {
    title: "显卡",
    level: 1,
    color: "#76b900",
    icon: "mdi-expansion-card",
  },
  {
    title: "内存",
    level: 2,
    color: "#FFB07F",
    icon: "mdi-memory",
  },
  {
    title: "硬盘",
    level: 3,
    color: "#504099",
    icon: "mdi-harddisk",
  },
  {
    title: "主板",
    level: 3,
    color: "#3AA6B9",
    icon: "mdi-devices",
  },
  {
    title: "显示器",
    level: 4,
    color: "#FFD0EC",
    icon: "mdi-monitor",
  },
  {
    title: "机箱",
    level: 5,
    color: "#81689D",
    icon: "mdi-package-variant-closed",
  },
  {
    title: "电源",
    level: 5,
    color: "#8ACDD7",
    icon: "mdi-power-plug-battery-outline",
  },
  {
    title: "散热器",
    level: 5,
    color: "#5272F2",
    icon: "mdi-fan",
  },
  {
    title: "外设",
    level: 5,
    color: "#FF4B91",
    icon: "mdi-mouse-variant",
  },
  {
    title: "其他",
    level: 6,
    color: "info",
    icon: "mdi-more",
  },
]);

const rules = {
  deviceType: [
    () => {
      return true;
      //// console.log(modelType.value)
      //if (modelType.value === 0 || modelType.value) {
      //  return true;
      //} else {
      //  return "请选择硬件类型";
      //}
    },
  ],
  name: [(value: string) => !!value || "请输入设备型号"],
  price: [(value: string) => !!value || "请输入价格"],
  other: [(value: string) => !value || value.length < 50 || "字数过多"],
};
</script>

<style scoped lang="scss"></style>
