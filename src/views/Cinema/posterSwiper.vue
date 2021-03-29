<template>

  <div>
    <div class="swiper-container "
         :style="mybg"
         ref="aaa">
      <div class="swiper-wrapper">

        <slot></slot>
      </div>
      <!-- 如果需要分页器 -->

    </div>
    <div class="info"
         v-if="hid">
      <div class="w">
        <ul>
          <div class="filmheader">
            <li>{{filminfo[num].name}}</li>
            <li>{{filminfo[num].grade}}分</li>
          </div>
          <div class="filmdesc">
            <li>{{filminfo[num].category}}</li>
            <li>{{filminfo[num].runtime}}分钟</li>
            <li>{{filminfo[num].director}}</li>
            <li class="actors"><span>{{filminfo[num].actors[0].name}}</span>
              <span>{{filminfo[num].actors[1].name}}</span>
              <span>{{filminfo[num].actors[2].name}}{{filminfo[num].actors[3].name}}</span>
            </li>
          </div>

        </ul>
      </div>
      <img src="/static/img/arrow-right.png"
           @click="tocinemaDetail">

    </div>
    <div class="day">
      <!-- <li v-for="(item,index) in showdate"
          :key="index">{{item}}</li> -->
      <van-tabs>
        <van-tab :title=item
                 v-for="(item,index) in showdate"
                 :key="index"> </van-tab>

      </van-tabs>
      <p class="tips">数据待更新</p>
    </div>

  </div>

</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css';
import axios from "axios"
import Vue from 'vue';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);

export default {

  data () {
    return {
      num: 0,
      hid: false,

      id: this.$route.params.id,
      filmid: '',

      filminfo: [],
      filmposter: [],
      showdate: [],
      mybg: {
        backgroundImage: "url(" + '' + ")",
        backgroundSize: 'cover',

        // filter: 'blur(5px)',
        position: 'relative'




      }
    }
  },


  // watch: {
  //   id (curVal, oldVal) {
  //     if (curVal) {

  //       this.id = curVal;
  //       console.log(this.id)

  //     }
  //   },
  // },
  beforeCreate () {
    // localStorage.setItem("cid", this.$route.params.id)
  },
  created () {

    let cid = localStorage.getItem("cid", this.$route.params.id)
    console.log(cid)
    axios({

      url: `https://m.maizuo.com/gateway/?cinemaId=${cid}&k=7288339`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16073211741346815844679681","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then(res => {
      this.filminfo = res.data.data.films
      // this.poster = res.data.data.films.poster
      console.log(this.filminfo)
      this.hid = true


      this.filminfo.forEach((item, index) => {
        // console.log(item.poster)
        this.filmposter.push(item.poster)
      })

      let self = this
      new Swiper('.swiper-container', {

        direction: 'horizontal',
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView: 3.5,
        // spaceBetween: -100,

        centeredSlides: true,
        //  pagination:'.swiper-pagination',
        // on: {
        //   click: function () {
        //     console.log(this.index);
        //   },
        // },
        // runCallbacksOnInit: true, //如果不想触发，将此设置为false
        // on: {
        //   slideChangeTransitionStart: function () {
        //     alert('触发了回调');
        //   },
        // },
        // initialSlide: 2,


        on: {
          init: function (swiper) {
            //Swiper初始化了
            console.log(this.activeIndex)

            self.num = this.activeIndex

            // console.log(self.num)
            // console.log(self.filminfo[this.activeIndex].filmId)
            self.filmid = self.filminfo[this.activeIndex].filmId
            // console.log(self.filminfo[this.activeIndex].name)
            console.log(self.filminfo[this.activeIndex].poster)
            self.mybg.backgroundImage = "url(" + self.filminfo[this.activeIndex].poster + ")"
            console.log(self.filminfo[this.activeIndex].showDate)
            var da = self.filminfo[this.activeIndex].showDate
            var dateArr = []

            da.forEach(item => {
              item = new Date(item * 1000);
              var year = item.getFullYear() + '年';
              var month = item.getMonth() + 1 + '月';
              var date = item.getDate() + '日';
              dateArr.push([year, month, date].join('').slice(5, 10))
            })
            console.log(dateArr)
            self.showdate = dateArr

            // console.log('当前的slide序号是' + this.activeIndex);//或者swiper.activeIndex，swiper与this都可指代当前swiper实例
            // this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件，需要先设置transitionEnd

          },
          slideChange: function () {
            // console.log(this.activeIndex);
            // // console.log(self.$route.params.id)
            // console.log(self.filmposter)
            // this.activeIndex+1
            // self.mybg.background = self.filmposter[this.activeIndex]
            // "url('/static/img/1.jpg')"
            // self.mybg.background = "url(" + "/static/img/1.jpg" + ")"
            self.mybg.backgroundImage = "url(" + self.filmposter[this.activeIndex] + ")"

            // console.log(self.mybg.backgroundImage)
            console.log(this.activeIndex)
            self.num = this.activeIndex
            self.filmid = self.filminfo[this.activeIndex].filmId
            // console.log(self.num)
            // console.log(self.filminfo[this.activeIndex].name)
            // console.log(self.filminfo[this.activeIndex].filmId)
            // console.log(self.filminfo[this.activeIndex].showDate)

            var da = self.filminfo[this.activeIndex].showDate
            var dateArr = []

            da.forEach(item => {
              item = new Date(item * 1000);
              var year = item.getFullYear() + '年';
              var month = item.getMonth() + 1 + '月';
              var date = item.getDate() + '日';
              dateArr.push([year, month, date].join('').slice(5, 10))
            })
            console.log(dateArr)
            self.showdate = dateArr



          },


        },

      })



    });

  },


  mounted () {

    // axios({

    //   url: `https://m.maizuo.com/gateway/?cinemaId=${this.id}&k=7288339`,
    //   headers: {
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16073211741346815844679681","bc":"110100"}',
    //     'X-Host': 'mall.film-ticket.film.cinema-show-film'
    //   }
    // }).then(res => {
    //   this.filminfo = res.data.data.films
    //   // this.poster = res.data.data.films.poster
    //   console.log(this.filminfo)
    //   this.hid = true


    //   this.filminfo.forEach((item, index) => {
    //     // console.log(item.poster)
    //     this.filmposter.push(item.poster)
    //   })

    //   let self = this
    //   new Swiper('.swiper-container', {

    //     direction: 'horizontal',
    //     observer: true, //修改swiper自己或子元素时，自动初始化swiper
    //     observeParents: true, //修改swiper的父元素时，自动初始化swiper
    //     slidesPerView: 3.5,
    //     // spaceBetween: -100,

    //     centeredSlides: true,
    //     //  pagination:'.swiper-pagination',
    //     // on: {
    //     //   click: function () {
    //     //     console.log(this.index);
    //     //   },
    //     // },
    //     // runCallbacksOnInit: true, //如果不想触发，将此设置为false
    //     // on: {
    //     //   slideChangeTransitionStart: function () {
    //     //     alert('触发了回调');
    //     //   },
    //     // },
    //     // initialSlide: 2,


    //     on: {
    //       init: function (swiper) {
    //         //Swiper初始化了
    //         console.log(this.activeIndex)

    //         self.num = this.activeIndex

    //         // console.log(self.num)
    //         // console.log(self.filminfo[this.activeIndex].filmId)
    //         self.filmid = self.filminfo[this.activeIndex].filmId
    //         // console.log(self.filminfo[this.activeIndex].name)
    //         console.log(self.filminfo[this.activeIndex].poster)
    //         self.mybg.backgroundImage = "url(" + self.filminfo[this.activeIndex].poster + ")"


    //         // console.log('当前的slide序号是' + this.activeIndex);//或者swiper.activeIndex，swiper与this都可指代当前swiper实例
    //         // this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件，需要先设置transitionEnd

    //       },
    //       slideChange: function () {
    //         // console.log(this.activeIndex);
    //         // // console.log(self.$route.params.id)
    //         // console.log(self.filmposter)
    //         // this.activeIndex+1
    //         // self.mybg.background = self.filmposter[this.activeIndex]
    //         // "url('/static/img/1.jpg')"
    //         // self.mybg.background = "url(" + "/static/img/1.jpg" + ")"
    //         self.mybg.backgroundImage = "url(" + self.filmposter[this.activeIndex] + ")"

    //         // console.log(self.mybg.backgroundImage)
    //         console.log(this.activeIndex)
    //         self.num = this.activeIndex
    //         self.filmid = self.filminfo[this.activeIndex].filmId
    //         console.log(self.num)
    //         console.log(self.filminfo[this.activeIndex].name)
    //         console.log(self.filminfo[this.activeIndex].filmId)



    //       },


    //     },

    //   })



    // });



  },
  methods: {
    tocinemaDetail () {
      // this.$router.push({ name: "detailpage" })
      // console.log(this.filmid)
      let filmId = this.filmid

      this.$router.push({ name: "detailpage", params: { id: filmId } })
      // this.$router.push('/detail:id')
    }
  }
}
</script>

<style lang='css' scoped>
.swiper-container {
  top: 110px;
  height: 350px;
  z-index: 1;
  margin-top: 30px;
  /* visibility: hidden; */
}
.swiper-container:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: inherit;
  filter: blur(15px);
}
.swiper-wrapper {
  background-repeat: no-repeat;
}
.info {
  position: fixed;
  top: 650px;
  width: 100%;
  text-align: center;
  margin: 20px 0;
}

.info .filmheader {
  text-align: center;
}
.info .filmheader li {
  display: inline;
}
.info .filmheader li:first-child {
  font-size: 15px;
  color: #191a1b;
  padding-right: 5px;
}
.info .filmheader li:nth-child(2) {
  font-size: 16px;
  font-style: italic;
  color: #ffb232;
}
.info .filmdesc {
  text-align: center;
  height: 38px;
  width: 550px;
  color: #797d82;
  font-size: 13px;

  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info .filmdesc li {
  display: inline;
  padding-right: 5px;
  border-right: solid 2px #ccc;
}
.info .filmdesc li:last-child {
  border-right: none;
}
.w {
  width: 80%;
  margin: 0 auto;
}
.info img {
  position: absolute;
  right: 15px;
  top: -20px;
  margin-top: 36px;
  width: 15px;
  /* aspect-ratio: auto 4 / 8; */
  height: 15px;
  opacity: 0.5;
}
.day {
  transform: translateY(280px);
  border-top: solid 2px red;
}
>>> .van-tabs__line {
  background-color: #ff5f16;
}
>>> .van-tab__text {
  font-size: 30px;
}
>>> .van-tab--active .van-tab__text {
  color: #ff5f16;
}
.tips {
  font-size: 20px;
  margin-left: 10px;
}
</style>