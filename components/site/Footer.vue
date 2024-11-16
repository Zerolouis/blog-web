<template>
  <div>
    <v-row style="background-color: #547690;">
      <div class="copyright-info ">
        <div>
          摸鱼 Blog 2024 @ Zerolouis
          <v-icon
            @click="navigateTo('https://git.jujuh.top:10443/Zerolouis/loaf-fish-next-web/src/branch/graduation-dev',{
              open: {
                target: '_blank'
              }
            })"
        >
          mdi-github
        </v-icon>
        </div>
        <div/>
      </div>
    </v-row>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.copyright-info {
  color: white;
  width: 100%;
  text-align: center;
  padding: 20px;
}
</style>
