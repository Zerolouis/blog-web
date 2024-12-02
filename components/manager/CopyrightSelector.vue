<template>
  <div>
    <v-text-field
      v-model="ccShow"
      label="头图版权说明"
      :messages="['版权信息将显示在头图下方，留空则不显示']"
      append-inner-icon="mdi-copyright"
      @click="showDialog = !showDialog"
    />
    <v-dialog v-model="showDialog" width="50%" persistent>
      <v-card>
        <v-card-title class="bg-info"> 版权信息 </v-card-title>
        <v-container>
          <v-form>
            <v-select v-model="A0" :items="Q0" label="许可协议" />
            <div v-if="A0 === CopyrightEnum.CC">
              <v-select
                v-model="A1"
                :items="Q1"
                label="是否允许依据你的创作进行的再创作被分享？"
              />
              <v-select
                v-model="A2"
                :items="Q2"
                label="是否允许你的创作应用于商业用途？"
              />
            </div>
          </v-form>
          {{ ccShow }}
        </v-container>
        <v-card-actions>
          <v-btn color="warning" @click="btnCancel"> 取消 </v-btn>
          <v-btn color="primary" @click="btnConfirm"> 确认 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { CCMap, CopyrightEnum, CopyrightMap } from "~/ts/enum/api.enum";
import type { Ref } from "vue";

const showDialog = ref(false);
const A0 = ref(CopyrightEnum.Deny);
const A1: Ref<string> = ref("A");
const A2: Ref<string> = ref("A");

const Q0 = [
  {
    title: "禁止转载",
    value: CopyrightEnum.Deny,
  },
  {
    title: "按照CC许可证协议",
    value: CopyrightEnum.CC,
  },
  {
    title: "允许任意转载",
    value: CopyrightEnum.Allow,
  },
];
const Q1 = [
  {
    title: "是",
    value: "A",
  },
  {
    title: "否",
    value: "B",
  },
  {
    title: "是，只要在相同的授权条件下",
    value: "C",
  },
];
const Q2 = [
  {
    title: "是",
    value: "A",
  },
  {
    title: "否",
    value: "B",
  },
];

const btnCancel = () => {
  showDialog.value = false;
};

const btnConfirm = () => {
  showDialog.value = false;
};

const copyright = computed((): number => {
  if (A0.value === CopyrightEnum.CC) {
    return CCMap.get(A1.value + A2.value) || 3;
  } else {
    return A0.value;
  }
});
const ccShow = computed(() => {
  if (Number(copyright.value) >= 0) {
    return CopyrightMap.get(copyright.value);
  } else {
    return "尚未选择";
  }
});

defineExpose({
  copyright,
});
</script>

<style scoped lang="scss"></style>
