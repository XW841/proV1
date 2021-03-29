<template>
  <div class="swiper-container ">
    <div class="swiper-wrapper">

      <slot></slot>
    </div>

  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css';


export default {

  mounted () {
    new Swiper('.swiper-container', {

      slidesPerView: 3,
      spaceBetween: 0,
      freeMode: true


    })
  }
}
</script>

<style lang='css' scoped>
</style>