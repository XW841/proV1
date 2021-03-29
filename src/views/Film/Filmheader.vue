<template>
  <div>
    <ul>
      <!-- to地址书写问题 -->
      <router-link to="/film/nowplaying"
                   tag="li"
                   activeClass="highlight">

        正在热播
      </router-link>
      <router-link to="/film/commingsoon"
                   tag="li"
                   activeClass="highlight">

        即将上映
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },

  components: {},

  computed: {},

  methods: {}
}
</script>
<style lang='css' scoped>
ul {
  display: flex;
}
ul > li {
  flex: 1;
  height: 65px;
  line-height: 65px;
  text-align: center;
  background: white;
}
.highlight {
  color: red;
  border-bottom: solid 1px red;
}
</style>