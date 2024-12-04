<template>
  <div>
    <v-card
      :disabled="loading"
      :loading="loading"
      class="login-container"
      elevation="3"
    >
      <template #title>
        <div class="panel-title">
          <site-logo />
        </div>
      </template>
      <v-no-ssr>
        <v-tabs
          v-model="tab"
          align-tabs="start"
          class="panel-tabs"
          color="primary"
        >
          <v-tab value="name"> 账号密码登录 </v-tab>
          <v-tab value="mobile"> 验证码登录 </v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="name">
            <v-container>
              <v-form ref="usernameForm">
                <v-row justify="center">
                  <v-col :cols="12">
                    <v-text-field
                      v-model="loginForm.username"
                      :rules="loginNameRules"
                      label="手机号/账号/邮箱"
                      validate-on="blur lazy"
                    />
                    <v-text-field
                      v-model="loginForm.password"
                      :rules="passRules"
                      label="输入密码"
                      type="password"
                      validate-on="blur lazy"
                    />
                  </v-col>
                  <v-spacer />
                  <v-col style="text-align: end">
                    <v-btn color="warning" variant="text"> 忘记密码 </v-btn>
                    <v-btn
                      :loading="loading"
                      color="primary"
                      variant="flat"
                      @click="handleLogin"
                    >
                      登录
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-window-item>
          <v-window-item value="mobile">
            <v-container>
              <v-form>
                <v-row justify="center">
                  <v-col :cols="12">
                    <v-text-field label="输入手机号" type="tel" />

                    <v-text-field label="输入验证码" type="password">
                      <template #append>
                        <!--<v-btn variant="text" @click="handleMobileCode"-->
                        <!--       :disabled="mobileCode.disabled"-->
                        <!--&gt;-->
                        <!--  {{ mobileCode.text }}-->
                        <!--</v-btn>-->
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-spacer />
                  <v-col style="text-align: end">
                    <v-btn color="warning" variant="text"> 忘记密码 </v-btn>
                    <v-btn color="primary" variant="flat"> 登录 </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-window-item>
        </v-window>
      </v-no-ssr>
      <v-card-actions>
        <span class="register-info">还没有账户?</span>
        <v-btn color="info" @click="navigateTo('/auth/register')">
          前往注册
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { checkUsername } from "~/composables/useVerify";
import { rsaEncode } from "~/composables/useSecurity";

const userStore = useUserStore();

const tab: Ref<string> = ref("name");
/** 用户名登录表格 */
const usernameForm = ref();
const loginForm = ref({
  username: "",
  password: "",
});

const userLogin = async () => {
  const username: string = await rsaEncode(loginForm.value.username);
  const password: string = await rsaEncode(loginForm.value.password);
  await userStore.userLogin(username, password);
};

//const auth = useAuthStore()
const toast = useToastStore();
/** 加载 */
const loading = ref(false);

/**
 * 处理用户登录
 */
const handleLogin = async () => {
  loading.value = true;
  console.log(loginForm.value);
  const { valid } = await usernameForm.value.validate();
  if (valid) {
    await userLogin()
      .then(() => {
        navigateTo("/");
      })
      .catch((e) => {
        toast.error(e);
      });
  } else {
    toast.error("请输入正确的登录信息");
  }
  loading.value = false;
};

const loginNameRules = [
  (value: string) => {
    if (checkUsername(value) || checkMail(value) || checkTel(value)) {
      return true;
    } else {
      return "输入的账户有误";
    }
  },
];

const passRules = [(value: string) => !!value || "密码不能为空"];
</script>

<style scoped lang="scss">
.login-container {
  .panel-title {
    text-align: center;
    height: 40px;
    //color: #384c61;

    &-zh {
      font-family: 临海隶书, serif;
      font-size: 30px;
    }

    &-eng {
      font-family: Pacifico, serif;
      font-size: 25px;
      margin: 0 0 0 10px;
    }
  }

  .panel-tabs {
    :deep(.v-slide-group__content) {
      justify-content: center;
    }
  }

  .register-info {
    margin: 0 10px 0 20px;
  }
}
</style>
