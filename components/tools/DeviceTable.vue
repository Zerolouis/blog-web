<template>
  <div>
    <v-card variant="flat">
      <v-card-title class="card-title">
        默认配置单
        <div class="price">
          <span class="price-text">总价格:</span>
          <span class="price-number">10000</span>
        </div>
      </v-card-title>
      <v-data-table :headers="tableHeaders" hide-default-footer />
    </v-card>
  </div>
</template>

<script setup lang="ts">
const tableHeaders = [
  {
    title: "配件类型",
    key: "category",
    value: "category",
  },
  {
    title: "名称",
    key: "name",
  },
  {
    title: "价格",
    key: "price",
  },
  {
    title: "备注",
    key: "description",
  },
];
</script>

<style scoped lang="scss">
.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .price {
    &-text {
    }
    &-number {
      color: rgb(62, 114, 186);
      font-weight: 700;
      margin-left: 10px;
    }
  }
}
</style>
