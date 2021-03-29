<template>
  <div class="container">
    <div class="main">

      <div class="top">

        <div class="topt">
          <div @click="toLogin">
            <img src="../../static/img/headimg.png"
                 alt=""
                 ref="logo"
                 v-if="username==null">
            <img src="../../static/img/monkey.png"
                 v-else>
            <p v-if="username== null">请先登录</p>
            <p v-else
               style="font-size:1.4em">{{username}}</p>

          </div>
        </div>
        <div class="topb">
          <ul>
            <li><img src="../../static/img/center/dingdan.png"
                   alt=""><span>电影订单</span> </li>
            <li><img src="../../static/img/center/dingdan1.png"
                   alt=""><span>浏览记录</span> </li>
          </ul>

        </div>
      </div>
      <div class="bottom">
        <ul>
          <li><img src="../../static/img/center/yue.png"
                 class="icon"><span>余额</span> <img src="../../static/img/arrow-right.png"> </li>
          <li><img src="../../static/img/center/maizuoquan.png"
                 class="icon"><span>优惠券</span> <img src="../../static/img/arrow-right.png"> </li>
          <li><img src="../../static/img/center/hongbao.png"
                 class="icon"><span>观影红包</span> <img src="../../static/img/arrow-right.png"></li>

          <li><img src="../../static/img/center/shezhi.png"
                 class="icon"><span>个性设置</span> <img src="../../static/img/arrow-right.png"></li>
        </ul>
      </div>

    </div>

  </div>

</template>

<script>

import Vue from "vue"
import { Toast } from 'vant';
Vue.use(Toast)

export default {


  data () {
    return {
      username: '',
      avatar: ''
    };
  },
  // 局部路由守卫
  beforeCreate () {
    this.$store.commit('showTabbar', true)
    // this.username = sessionStorage.getItem("username");
    // this.avatar = sessionStorage.getItem("avatar");
  },
  beforeMount () {
    this.$store.commit('hidenCity', false)
  },



  mounted () {
    this.username = sessionStorage.getItem("username");
    // this.avatar = sessionStorage.getItem("avatar");




    // this.$http.get('/api/getFilm').then(res => {
    //   console.log(res.data)
    //   this.userinfo = res.data.data.data
    //   // console.log(this.userinfo)
    // })
  },


  components: {

  },

  computed: {},

  methods: {




    toLogin () {
      if (sessionStorage.getItem("username")) {
        Toast('您已登陆');

      } else {
        this.$router.push("/login")
      }


    },





  },
  beforeDestroy () {
    // Bus.$off('passInfo')
  },

  // beforeRouteEnter (to, from, next) {
  //   console.log("检查a")
  //   if (false) {
  //     next()

  //   } else {

  //     Toast("请先登录i")
  //     // next('/login')
  //   }
  // },
}
</script>
<style lang='css' scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
}
.main {
  /* position: relative; */
  width: 100%;
  height: 700px;
}
.main .top {
  height: 450px;
  background-color: white;
  margin-bottom: 10px;
}
.main .top .topt {
  height: 300px;

  background: url("../../static/img/centerbg.png");
  background-size: cover;
}
.main .topt div {
  width: 50%;
  position: relative;
}
.main .topt img {
  width: 153px;
  height: 153px;
  border-radius: 50%;
  margin-right: 20px;
  border: 2px solid #fff;
  margin-top: 100px;
  margin-left: 100px;
}
.main .topt p {
  float: right;
  margin-top: 150px;
  /* margin-right: 00px; */
  color: white;
  font-size: 22px;
}
.main .topb li {
  width: 40%;
  float: left;
  margin: 10px 20px;
  text-align: center;
}
.main .topb img {
  width: 70px;
  height: 70px;
}
.main .topb li span {
  color: #797d82;
  font-size: 30px;
  display: block;
}
.bottom {
  background-color: white;
}
.bottom li {
  height: 100px;
  border-bottom: solid 1px #f4f4f4;
  line-height: 80px;
  padding-left: 15px;
  position: relative;
}

.bottom li .icon {
  width: 40px;
  /* aspect-ratio: auto 20 / 20; */
  height: 40px;
  transform: translateY(8px);
}
.bottom li span {
  margin-left: 15px;
  color: #191a1b;

  -ms-flex: 1;
  flex: 1;
}
.bottom li span + img {
  position: absolute;
  right: 10px;
  top: 50%;
  width: 10px;
  height: 15px;
  /* opacity: 0.2; */
}
</style>