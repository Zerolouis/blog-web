import { defineStore } from "pinia";

export const usePCSourcesStore = defineStore(
  "toolsPCStore",
  () => {
    // 设备种类
    const deviceList = ref([]);
    // 表单数据
    const tableData = ref([]);
    // 共价格
    const totalPrice: Ref<number> = ref(0);
    const tableName: Ref<string> = ref("默认配置单");
    return {
      deviceList,
      tableData,
      totalPrice,
      tableName,
    };
  },
  {
    // 直接使用localStorage存储
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
);
