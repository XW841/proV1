<template>
  <div class="swiper-container filmswiper">
    <div class="swiper-wrapper">

      <slot></slot>
    </div>

  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css';

export default {
  props: ['perview', 'myclassname'],
  mounted () {
    new Swiper('.' + this.myclassname, {

      slidesPerView: this.perview,
      spaceBetween: this.myclassname === 'actorswiper' ? -10 : 10,
      freeMode: true


    })
  }
}
</script>

<style lang='css' scoped>
</style>