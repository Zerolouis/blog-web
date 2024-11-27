<template>
  <div>
    <v-text-field v-model="dateTotal" :label="labelName" append-inner-icon="mdi-clock" @click="showPicker"/>

    <v-dialog v-model="isShowPicker" width="700">
      <v-card>
        <v-card-title>
          时间选择
        </v-card-title>
        <v-container>
          <div class="date-container">
            {{ dateTotal }}
          </div>
          <v-row>
            <v-col cols="6">
              <v-date-picker v-model="dateSelected" color="info"/>
            </v-col>
            <v-col cols="6">
              <v-time-picker v-model="timeSelected" format="24hr" color="info"/>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn @click="reset" color="info">
            使用当前时间
          </v-btn>
          <v-btn color="primary" @click="confirm">
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  // 标签名称
  labelName: string
}>(), {
  labelName: '时间'
})

const {$dayjs} = useNuxtApp()

const date = useDate()
const isShowPicker = ref(false)
const dateSelected = ref(new Date())
const timeSelected = ref(date.format(new Date(), 'fullTime24h'))
const time = ref('')



const dateTotal = computed(() => {
  return date.format(dateSelected.value, 'keyboardDate') + ' ' + timeSelected.value
})

watch(dateTotal, (newValue) => {
  console.log(newValue)
  time.value = $dayjs(newValue).toISOString()
}, {immediate: true})

function showPicker() {
  isShowPicker.value = true
}

// 获取ISO格式时间
const getTime = () => {
  return time.value
}

const confirm = () => {
  isShowPicker.value = false
}

const reset = () => {
  dateSelected.value = new Date()
  timeSelected.value = date.format(new Date(), 'fullTime24h')
  isShowPicker.value = false
}

defineExpose({
  getTime
})
</script>

<style scoped lang="scss">
.date-container {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}
</style>
