<template>

  <div>
    <div class="back "
         @click="toBack">
      <img src="../../static/img/to-back.png">
    </div>

    <div class="top ">
      <div class="header-title w">
        {{cinemaInfo.name}}
      </div>
      <div class="tips w">
        <ul>
          <li>前台兑换</li>
          <li>儿童票</li>
          <li>停车</li>
          <li>3D眼镜</li>
        </ul>
      </div>
      <div class="add">
        <van-icon name="location-o"
                  size="20" />
        <p>{{cinemaInfo.address}}</p>

        <van-icon name="phone-o"
                  size="20" />

      </div>
      <!-- <div class="filmposter"> -->
      <posterSwiper ref="child">
        <li class="swiper-slide"
            v-for="(data,index) in filminfo"
            :key="index">
          <img :src="data.poster">

        </li>

      </posterSwiper>
      <!-- </div> -->
      <div class="arrow"><img v-show="hid"
             src="../../static/img/arrow.png"
             alt=""></div>
      <!-- 加上显示条件，避免指示箭头在数据没渲染完就显示 -->

    </div>

    <!-- <div class="info">
      <li v-for="(data,index) in filminfo"
          :key="index">
        <p>{{data.name}}</p>
      </li>
    </div> -->
    <br><br><br>

  </div>

</template>

<script>
import axios from "axios"
import { Indicator } from 'mint-ui'
import posterSwiper from '@/views/cinema/posterSwiper'


// import 'swiper/dist/js/swiper.js';



export default {

  components: {
    posterSwiper
  },
  data () {
    return {

      id: this.$route.params.id,
      cinemaInfo: [],
      filminfo: [],
      hid: false,
    };

  },

  beforeCreate () {
    this.$store.commit("hidenTabbar", false)


  },
  mounted () {


    Indicator.open({
      text: '',
      spinnerType: 'fading-circle'
    });

    let cid = localStorage.getItem("cid", this.$route.params.id)
    axios({

      url: `https://m.maizuo.com/gateway/?cinemaId=${cid}&k=7321619`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16073211741346815844679681","bc":"440700"}',
        'X-Host': 'mall.film-ticket.cinema.info'
      }
    }).then(res => {
      this.cinemaInfo = res.data.data.cinema
      console.log(this.cinemaInfo)
      Indicator.close();


    });
    axios({

      url: `https://m.maizuo.com/gateway/?cinemaId=${cid}&k=7288339`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16073211741346815844679681","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then(res => {
      this.filminfo = res.data.data.films
      this.hid = true
      console.log(this.filminfo)
      Indicator.close();


    });





  },
  beforeDestroy () {
    this.$store.commit("showTabbar", true)
  },


  computed: {},

  methods: {
    toBack () {
      this.$router.go(-1)
    },

  }
}
</script>
<style lang='css' scoped>
.w {
  width: 90%;
  /* height: 100vh; */
  margin: 0 auto;
  /* background-color: #ccc; */
}
li {
  list-style: none;
}
.back {
  width: 80px;
  height: 80px;
}
.back img {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 20px;
  left: 20px;
}
.top {
  height: 620px;
  /* background-color: #ccc; */
  position: relative;
}
.top .arrow {
  z-index: 10000;
  position: absolute;
  bottom: 50px;
  width: 100%;
  text-align: center;
}
.top img {
  z-index: 10000;
  margin: 0 auto;
}
.header-title {
  padding-top: 5px;
  text-align: center;
  font-size: 35px;
  color: #191a1b;
  margin-bottom: 10px;
}
.tips {
  position: relative;
}
.tips ul {
  position: absolute;
  width: 100%;
  text-align: center;
  margin-top: 8px;
}
.tips ul li {
  display: inline-block;
  font-size: 20px;
  color: #ffb232;
  border: 1px solid #ffb232;
}

.add {
  position: absolute;
  top: 100px;
  font-size: 25px;
  width: 100%;
  padding: 5px 5px;
  margin: 20px 0;
}

.add p {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}
/* .filmposter {
  position: absolute;
  bottom: 0;
} */
.swiper-slide {
  /* position: absolute; */
  top: 25px;

  width: 10px;
  height: 120px;
  /* margin-right: -30px; */
}

>>> .swiper-slide {
  position: relative;
  height: 300px;
  width: 280px;
  /* transform: translateY(8px); */
}
>>> .swiper-slide img {
  width: 180px;
  height: 210px;
  position: absolute;
  bottom: 0;
}
>>> .swiper-slide-active {
  position: relative;
  height: 300px;
  width: 280px;
  transform: translateY(0px);
}
>>> .swiper-slide-active img {
  width: 180px;
  height: 280px;
  position: absolute;
}

.none {
  display: none;
}
</style>