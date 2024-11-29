import type { UserState } from "~/ts/interface/stores.interface";
import { stringify, parse } from "zipson";
import type { Ref } from "vue";
import type { LoginResult } from "~/ts/types/api.type";
import { LoginResultSchema } from "~/ts/types/api.type";
import { checkMessage } from "~/composables/useVerify";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const toast = useToastStore();

    const user: UserState = reactive({
      userInfo: undefined,
      isLogin: false,
    });
    const token: LoginResult = reactive({
      accessTime: "",
      accessToken: "",
      refreshTime: "",
      refreshToken: "",
    });

    const siteConfig = useSiteConfig();
    const { isLogin } = storeToRefs(siteConfig);

    /**
     * 用户登录
     * @param username 用户名
     * @param password 密码
     */
    const userLogin = async (username: string, password: string) => {
      console.log(username, password);
      await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      }).then(async (res) => {
        const { data } = await checkMessage(res);
        console.log("获取登录数据", data);
        const { data: loginInfo, success } =
          await LoginResultSchema.safeParseAsync(data?.data);
        console.log("登录数据校验", success);
        if (success && loginInfo) {
          token.accessToken = loginInfo?.accessToken;
          token.accessTime = loginInfo?.accessTime;
          token.refreshToken = loginInfo?.refreshToken;
          token.refreshTime = loginInfo?.refreshTime;
          isLogin.value = true;
          await getUserInfo();
        }
      });
    };

    /**
     * 获取用户信息
     */
    const getUserInfo = async () => {
      await $fetch("/api/auth/info", {
        method: "POST",
        headers: {
          Authorization: token.accessToken,
        },
      })
        .then(async (res) => {
          console.log("获取用户数据", res);
          const { data } = await checkMessage(res);
          if (data?.code !== "200") {
            // 尝试刷新token
            await refreshToken().then(() => {
              if (user.isLogin) {
                getUserInfo();
              }
            });
          } else {
            user.userInfo = data?.data;
            user.isLogin = true;
          }
        })
        .catch((e) => {
          toast.error(e);
        });
    };

    const refreshToken = async () => {
      await $fetch("api/auth/refresh", {
        method: "POST",
        headers: {
          Authorization: token.refreshToken,
        },
      }).then(async (res) => {
        const { data } = await checkMessage(res);
        if (data?.code === "200") {
          const { data: loginInfo, success } =
            await LoginResultSchema.safeParseAsync(data?.data);
          if (success && loginInfo) {
            token.accessToken = loginInfo?.accessToken;
            token.accessTime = loginInfo?.accessTime;
            token.refreshToken = loginInfo?.refreshToken;
            token.refreshTime = loginInfo?.refreshTime;
            isLogin.value = true;
            user.isLogin = true;
            return true;
          }
          return false;
        } else {
          toast.error("登录过期，请重新登录");
          token.accessToken = "";
          token.refreshToken = "";
          token.refreshTime = "";
          token.accessTime = "";
          isLogin.value = false;
          user.isLogin = false;
          return false;
        }
      });
    };

    const getToken = computed(() => {
      return token.accessToken;
    });

    return {
      user,
      token,
      isLogin,
      userLogin,
      getUserInfo,
      refreshToken,
      getToken,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies({
        maxAge: 24 * 60 * 60 * 3,
      }),
      serializer: {
        deserialize: parse,
        serialize: stringify,
      },
      // 只需要保存token和登录状态
      pick: ["token", "isLogin"],
    },
  },
);
