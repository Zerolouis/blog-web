<template>
  <div>
    <v-card :loading="loading" class="register-container" elevation="3">
      <v-card-title> 用户注册 </v-card-title>
      <v-no-ssr>
        <v-window v-model="tabs">
          <v-window-item :value="1">
            <v-container>
              <v-form ref="registerForm">
                <v-row>
                  <v-col :cols="12">
                    <v-text-field
                      v-model="registerInfo.username"
                      :rules="usernameRules"
                      hint="输入用户名"
                      label="用户名"
                      type="mail"
                      variant="underlined"
                    />

                    <v-text-field
                      v-model="registerInfo.email"
                      :rules="emailRules"
                      label="邮箱"
                      type="mail"
                      variant="underlined"
                    />

                    <v-text-field
                      v-model="registerInfo.password"
                      :rules="passRules"
                      label="密码"
                      type="password"
                      variant="underlined"
                    />
                    <v-text-field
                      v-model="registerInfo.confirm"
                      :rules="confirmRules"
                      label="确认密码"
                      type="password"
                      variant="underlined"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-window-item>
          <v-window-item :value="2">
            <v-row justify="center">
              <v-col :cols="12">
                <div style="text-align: center">
                  <span class="text-verify-title">验证你的邮箱</span>
                </div>
              </v-col>
              <v-col :cols="12">
                <div style="text-align: center">
                  <div class="text-verify-subtitle">
                    我们发送了一份验证至您的邮箱，用来验证您的邮箱
                  </div>
                  <div class="text-verify-subtitle">请在下方输入验证码</div>
                </div>
              </v-col>
              <v-col :cols="12">
                <v-otp-input
                  v-model="optCode"
                  :error="opt.error"
                  variant="filled"
                  :loading="opt.loading"
                />
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="3">
            <div class="success-icon">
              <v-icon color="success" icon="mdi-check-circle" size="150" />
            </div>
            <div class="success-text">注册成功</div>
          </v-window-item>
        </v-window>
      </v-no-ssr>
      <v-container>
        <div style="text-align: end">
          <v-btn
            v-if="tabs == 2"
            :disabled="loading"
            class="register-button"
            color="accent"
            variant="flat"
          >
            重新发送
          </v-btn>
          <v-btn
            v-if="tabs == 2"
            :disabled="loading"
            class="register-button"
            color="warning"
            variant="flat"
            @click="tabs--"
          >
            返回
          </v-btn>
          <v-btn
            v-if="tabs == 1"
            :disabled="loading"
            class="register-button"
            color="accent"
            variant="flat"
            @click="navigateTo('/auth/login')"
          >
            返回登录
          </v-btn>
          <v-btn
            v-if="tabs == 1"
            :disabled="loading"
            class="register-button"
            color="primary"
            variant="flat"
            @click="handleRegister"
          >
            下一步
          </v-btn>
          <v-btn
            v-if="tabs == 3"
            :disabled="loading"
            class="register-button"
            color="accent"
            variant="flat"
            @click="navigateTo('/auth/login')"
          >
            前往登录
          </v-btn>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  checkMail,
  checkPassword,
  checkUsername,
} from "~/composables/useVerify";

const tabs = ref(1);
const loading = ref(false);
const opt = ref({
  code: "",
  error: false,
  loading: false,
});
const optCode = ref("");
const registerInfo = ref({
  username: "",
  email: "",
  password: "",
  confirm: "",
  usernameUsed: false,
  emailUsed: false,
});
const registerForm = ref();
const toast = useToastStore();

const passRules = [
  (value: string) => {
    if (checkPassword(value)) {
      return true;
    } else {
      return "需要包含大小写字母、数字且不少于8位";
    }
  },
];

const usernameRules = [
  (value: string) => {
    if (checkUsername(value)) {
      return true;
    } else {
      return "用户名6-15位文字";
    }
  },
];

const emailRules = [
  (value: string) => {
    if (checkMail(value)) {
      return true;
    } else {
      return "邮件格式不正确";
    }
  },
];

const confirmRules = [
  (value: string) => {
    if (value === registerInfo.value.password) {
      return true;
    } else {
      return "两次输入密码不一致";
    }
  },
];

/**
 * 提交用户注册表单
 */
const handleRegister = async () => {
  loading.value = true;
  // 验证数据
  const { valid } = await registerForm.value.validate();
  if (valid) {
    const { data } = await useFetch("/api/user/register", {
      method: "POST",
      body: {
        username: registerInfo.value.username,
        password: registerInfo.value.password,
        email: registerInfo.value.email,
      },
    });
    if (data.value.code === "200") {
      tabs.value = 2;
    } else {
      toast.error(data.value.msg);
    }
  } else {
    toast.error("提交的信息有误");
  }
  loading.value = false;
};

/**
 * 处理邮箱验证
 */
const handleVerifyCode = async () => {
  const { data } = await useFetch("/api/user/verify", {
    method: "POST",
    body: {
      registerQuery: {
        username: registerInfo.value.username,
        password: registerInfo.value.password,
        email: registerInfo.value.email,
      },
      verify: optCode.value,
    },
  });

  if (data.value.code === "200") {
    tabs.value = 3;
  } else {
    opt.value.error = true;
  }
  loading.value = false;
};

watch(optCode, async (newValue) => {
  if (newValue.length === 6) {
    loading.value = true;
    await handleVerifyCode();
  } else if (newValue.length !== 0) {
    opt.value.error = false;
  }
});
</script>

<style scoped lang="scss">
.text-verify {
  &-title {
    font-size: 30px;
    font-weight: bold;
  }

  &-subtitle {
    color: #807e7e;
  }
}

.register-button {
  margin: 0 5px;
}

.success-icon {
  text-align: center;
}

.success-text {
  font-size: 20px;
  text-align: center;
}
</style>
