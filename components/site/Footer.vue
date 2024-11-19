<template>
  <div class="footer-container">
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
      </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.footer-container{
  height: 50px;
  background-color: #0a3d62;
  display: flex;
  justify-content: center;
  align-items: center;

  .copyright-info {
    color: white;
    text-align: center;
    width: 100%;
  }

}


</style>
