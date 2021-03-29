<template>
  <div>
    <div class="back "
         @click="toBack">
      <img src="/static/img/to-back.png">
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
    </div>

    <posterSwiper>
      <li class="swiper-slide"
          v-for="(data,index) in filminfo"
          :key="index">
        <img :src="data.poster">

      </li>
      <!-- <li class="swiper-slide">1111</li>
      <li class="swiper-slide">1111</li>
      <li class="swiper-slide">1111</li>
      <li class="swiper-slide">1111</li> -->

    </posterSwiper>

    <!-- <div class="filmList"> -->
    <!-- <div class='swiper-container'>

        <div class="swiper-wrapper">
          <li class="swiper-slide"
              v-for="(data,index) in filminfo"
              :key="index">
            <img :src="data.poster">

          </li>

        </div>
        <div class="swiper-scrollbar"></div>
      </div> -->

    <!-- </div> -->

  </div>
</template>

<script>
import axios from "axios"
import { Indicator } from 'mint-ui'
import posterSwiper from '@/views/cinema/posterSwiper'


// import 'swiper/dist/js/swiper.js';



export default {
  name: 'CinemaDetail',
  components: {
    posterSwiper
  },
  data () {
    return {
      id: this.$route.params.id,
      cinemaInfo: [],
      filminfo: []
    };
  },

  beforeMount () {
    this.$store.commit("hidenTabbar", false)
  },
  mounted () {

    console.log(this.id)
    Indicator.open({
      text: '',
      spinnerType: 'fading-circle'
    });


    axios({

      url: `https://m.maizuo.com/gateway/?cinemaId=${this.id}&k=7321619`,
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

      url: `https://m.maizuo.com/gateway/?cinemaId=${this.id}&k=7288339`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16073211741346815844679681","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then(res => {
      this.filminfo = res.data.data.films
      console.log(this.filminfo)
      Indicator.close();


    });





  },
  beforeDestroy () {
    this.$store.commit("showTabbar", true)
  },
  components: {},

  computed: {},

  methods: {
    toBack () {
      this.$router.go(-1)
    }
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
  width: 40px;
  height: 40px;
}
.back img {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 13px;
  left: 10px;
}
.top {
  height: 320px;
  /* background-color: #ccc; */
  position: relative;
}
.header-title {
  padding-top: 5px;
  text-align: center;
  font-size: 17px;
  color: #191a1b;
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
  font-size: 13px;
  color: #ffb232;
  border: 1px solid #ffb232;
}

.add {
  position: absolute;
  top: 100px;
  font-size: 14px;
  width: 100%;
}

.add p {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

/* .swiper-slide-active + li {
  margin: 0px 15px;
} */
/* .filmList {
  position: absolute;
  width: 100%;
  height: 170px;
  background-color: #ccc;
  bottom: 0;
} */
.swiper-container {
  /* height: 130px;
  width: 100vw;

  
  top: 20px; */
  /* position: absolute; */
}
/* .filmList img {
  width: 100px;
  height: 140px;

  position: absolute;
  bottom: 0px;

  left: 0;
} */

/* .swiper-slide {
  width: 100px;
  height: 140px;
} */
/* .swiper-container li img {
  width: 100px;
  height: 140px;
} */
</style>