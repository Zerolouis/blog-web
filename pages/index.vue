<template>
  <div>
    <v-parallax
        src="https://img.home.zeroh.top:12443/i/2024/11/15/fog-4436636-673637e8d717a.jpg"
        height="400"
        class="blog-intro-pic"
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
        <SiteLogo class="blog-logo" />
        <div class="blog-description">
          {{ $t('blogInfo.description') }}
        </div>
      </div>
    </v-parallax>
  </div>
</template>

<script setup lang="ts">
const { setLocale } = useI18n()
definePageMeta({
  layout: 'desktop-home'
})

useHead({
  title: '摸鱼Blog - 首页'
})
</script>

<style lang="scss" scoped>
.blog-intro-pic{
  margin-top: -50px;
}

.blog-logo{
  font-size: 4rem;
}
.blog-description{
  font-size: 1.2rem;
}
</style>
