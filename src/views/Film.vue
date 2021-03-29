<template>
  <div>
    <!-- 轮播 -->
    <!-- <div><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607598161185&di=af24e57e0f0b5b4d80fe46ce2a96c3eb&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171016%2F1008d8f845c640bdb2dae39830cad1a8.jpeg" alt=""></div> -->
    <swiper>
      <!--      
        <li>
          <img src="/static/img/1.jpg" alt="">
       
        </li>
         <li>
          <img src="/static/img/1.jpg" alt="">
       
        </li>
         <li>
          <img src="/static/img/1.jpg" alt="">
       
        </li> -->

      <li class="swiper-slide"
          v-for="(pic,index) in pictrue"
          :key="index"><img :src="pic"></li>
    </swiper>
    <!-- 电影 -->
    <filmheader :class="isFixed?'fixed':''"></filmheader>
    <router-view></router-view>

  </div>
</template>

<script>
import swiper from '@/views/Film/Swiper.vue'
import filmheader from '@/views/Film/Filmheader'
export default {
  data () {
    return {
      pictrue: ['./static/img/1.jpg', './static/img/2.jpg', './static/img/3.jpg', './static/img/4.jpg', './static/img/5.jpg'],
      isFixed: false
    };
  },

  components: {
    swiper,
    filmheader
  },
  beforeMount () {
    this.$store.commit('showCity', true)
  },

  mounted () {
    window.onscroll = this.handleScroll;
  },

  methods: {
    handleScroll () {

      //ref挂载到普通节点上，获取的是整个document；挂载到组件上，获取到的是整个组件。
      //210 若图片大小不定死，在不同尺寸设备上，图片大小会不一样。若ref="myname"属性挂载组件上，先通过this.$refs.myname$el获取原生dom节点,通过this.$refs.myname$el.offsetHeight来获取高度
      if (document.documentElement.scrollTop >= 192) {
        // console.log(document.documentElement.scrollTop)
        this.isFixed = true
        this.$store.commit('showCity', false)
      } else {
        this.isFixed = false
        this.$store.commit('showCity', true)
      }
    }
  },

  beforeDestroy () {
    window.onscroll = null
  },
  computed: {}

}
</script>
<style lang='css' scoped>
img {
  width: 100%;
  height: 380px;
  opacity: 0.9;
}
.fixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 40px;
  background: white;
  z-index: 1;
}
</style>