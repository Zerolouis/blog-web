<template>
  <div class="logo-container">
        <SiteLogo class="bar-logo" />
        <div class="btn-container">
          <v-btn variant="text">测试1</v-btn>
          <v-btn variant="text">测试2</v-btn>
        </div>
      </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.logo-container {
    margin: 0 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .bar-logo {
      font-size: 1.2rem;
    }
  }
</style>