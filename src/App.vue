<template>
  <div>
    <tabbar v-if="isTabbarShow" />
    <router-view></router-view>

  </div>
</template>

<script>

import Tabbar from './components/Tabbar'
// import bus from '@/bus/index.js'
import { mapState } from 'vuex' //在computed中，使用mapState直接匹配到想要拿到的状态：...
mapState([''])


export default {
  data () {
    return {
      isShow: true
    };
  },

  components: {
    Tabbar
  },
  beforeMount () {

  },
  computed: {
    ...mapState(['isTabbarShow'])
  },

  methods: {}
}
</script>
<style  scoped>
/* @import "./style/public.css"; */
</style>