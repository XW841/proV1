<template>
  <div>
    <nav>
      <ul>
        <!-- to地址书写问题 -->
        <router-link to="/film"
                     tag="li"
                     activeClass="highlight">
          <van-icon name="video" />
          电影
        </router-link>

        <router-link to="/cinema"
                     tag="li"
                     active-class="highlight">
          <van-icon name="shop" />

          影院
        </router-link>

        <router-link to="/center"
                     tag="li"
                     active-class="highlight">
          <van-icon name="manager" />我的
        </router-link>

      </ul>
    </nav>
    <div id="city"
         v-if=" this.$store.state.isCityShow">
      <router-link to="/city"
                   tag="li"
                   active-class="highlight">
        <van-icon name="location"
                  style="transform:translateY(1px)" /><span v-if="this.$store.state.city">{{this.$store.state.city}}

        </span>
        <span v-else>城市</span>
      </router-link>
    </div>

  </div>
</template>

<script>


export default {
  data () {
    return {

    };
  },

  components: {

  },
  mounted () {
    this.$store.state.city = localStorage.getItem('name')
    console.log(localStorage.getItem('cityId'))
    console.log(localStorage.getItem('name'))


  },

  computed: {},

  methods: {}
}
</script>
<style lang='css' scoped>
.highlight {
  color: #ff5f16;
}

nav {
  position: fixed;
  color: #6b6f74;
  font-size: 0.9em;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: white;
  transform: translateY(1px);
  z-index: 1;
  display: block;
  /* margin: 20px; */
}

ul {
  display: flex;
  border-top: solid 0.5px rgba(221, 219, 219, 0.5);

  /* border-top: solid 1px rgb(240, 21, 21); */
}
li {
  flex: 1;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 1.2em;
}
/* li:nth-child(1),
li:nth-child(2) {
  /* border-right: solid 1px rgb(247, 108, 108); */
#city {
  position: fixed;
  top: 0;
  left: 0;
  font-size: 25px;
  margin-left: 10px;
  padding: 0 10px;
  /* color: rgb(10, 10, 10); */
  color: white;
  font-weight: 500;
  /* border: solid 1px rgb(12, 12, 12); */
  border-radius: 20px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  /* opacity: 0.5; */
}
/* span {
  color: rgb(128, 17, 17);
} */
</style>