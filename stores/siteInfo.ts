import type { Ref } from "vue";
import type { ManagerRouter } from "~/ts/interface/manager.interface";

export const useSiteInfo = defineStore(
  "siteInfo",
  () => {
    const darkMode = ref(false);
    const currentTheme = ref("light");
    // 是否登录
    const isLogin: Ref<boolean> = ref(false);
    const managerRouter: ManagerRouter = reactive({
      name: "概览",
      path: "/manager/index",
      drawer: true,
    });

    return { darkMode, currentTheme, isLogin, managerRouter };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ["isLogin"],
    },
  },
);
