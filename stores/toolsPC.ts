import { defineStore } from "pinia";
import type {
  DiYDeviceItem,
  DIYDeviceType,
  DiYList,
} from "~/ts/interface/tools.interface";

export const useDIYStore = defineStore(
  "toolsPCStore",
  () => {
    // 设备种类
    const deviceList: Ref<Array<DIYDeviceType>> = ref([
      {
        name: "板U",
        level: 0,
        color: "#2d53a5",
        icon: "mdi-chip",
      },
      {
        name: "CPU",
        level: 0,
        color: "#d1103b",
        icon: "mdi-cpu-64-bit",
      },
      {
        name: "显卡",
        level: 1,
        color: "#76b900",
        icon: "mdi-expansion-card",
      },
      {
        name: "内存",
        level: 2,
        color: "#FFB07F",
        icon: "mdi-memory",
      },
      {
        name: "硬盘",
        level: 3,
        color: "#504099",
        icon: "mdi-harddisk",
      },
      {
        name: "主板",
        level: 0,
        color: "#3AA6B9",
        icon: "mdi-devices",
      },
      {
        name: "显示器",
        level: 4,
        color: "#f660b9",
        icon: "mdi-monitor",
      },
      {
        name: "机箱",
        level: 5,
        color: "#81689D",
        icon: "mdi-package-variant-closed",
      },
      {
        name: "电源",
        level: 5,
        color: "#8ACDD7",
        icon: "mdi-power-plug-outline",
      },
      {
        name: "散热器",
        level: 5,
        color: "#5272F2",
        icon: "mdi-fan",
      },
      {
        name: "外设",
        level: 5,
        color: "#FF4B91",
        icon: "mdi-mouse-variant",
      },
      {
        name: "其他",
        level: 6,
        color: "info",
        icon: "mdi-more",
      },
    ]);
    // 表单数据
    const tableData: Ref<DiYList> = ref({
      devices: [
        {
          category: {
            name: "CPU",
            level: 0,
            color: "#d1103b",
            icon: "mdi-cpu-64-bit",
          },
          price: 1200,
          model: "7800X3D",
          description: "单配置单",
        },
      ],
      total: 0,
      name: "默认配置单",
    });

    // 默认排序
    const compareTo = (a: DiYDeviceItem, b: DiYDeviceItem) => {
      return a.category.level - b.category.level;
    };

    watch(
      tableData,
      () => {
        tableData.value.devices.sort(compareTo);
        let totalPrice = 0;
        tableData.value.devices.forEach((device: DiYDeviceItem) => {
          totalPrice += device.price;
        });
        tableData.value.total = totalPrice.toFixed(2);
      },
      { deep: true, immediate: true },
    );

    const deleteDevice = (idx: number) => {
      tableData.value.devices.splice(idx, 1);
    };

    const resetDevices = () => {
      tableData.value.devices = [];
    };

    return {
      deviceList,
      tableData,
      deleteDevice,
      resetDevices,
    };
  },
  {
    // 直接使用localStorage存储
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ["tableData"],
    },
  },
);
