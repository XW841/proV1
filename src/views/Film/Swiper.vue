<template>
  <div class="swiper-container filmswiper">
    <div class="swiper-wrapper">

      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css';

export default {

  mounted () {
    new Swiper('.filmswiper', {

      loop: true,

      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      //  pagination:'.swiper-pagination',
      pagination: {
        el: '.swiper-pagination',



      },


    })
  }
}
</script>

<style lang='css' scoped>
</style>