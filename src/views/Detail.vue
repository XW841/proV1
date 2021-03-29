<template>

  <div v-if="filminfo">
    <div class="back"
         @click="toBack">
      <img src="../../static/img/to-back.png">
    </div>
    <div class="fname">{{filminfo.name}}</div>
    <div class="img"><img :src="filminfo.poster"
           :class="isHeight?'transform':''"
           id="poster"
           ref="refname"></div>
    <div>
      <div class="dish ">
        <span class="filmname">{{filminfo.name}}</span><span class="filmtype">{{filminfo.filmType.name}}</span>
        <p>{{filminfo.category}}</p>

        <p>{{filminfo.language}}</p>
        <p><span>{{filminfo.nation}}</span>&nbsp;|&nbsp;{{filminfo.runtime+"分钟"}}<span></span></p>
        <p class="grade"
           v-if="filminfo.grade">{{filminfo.grade+'分'}}</p>

        <div id="detail">
          <p class="detail">&ensp;&ensp;{{filminfo.synopsis}}</p>
        </div>
      </div>
      <div class="line"></div>

      <div class="act dish">
        <h4>演职人员</h4>
        <swiper perview="4"
                class="actorswiper"
                myclassname="actorswiper">
          <div class="swiper-slide"
               v-for="data in filminfo.actors"
               :key="data.name">
            <img :src="data.avatarAddress"
                 class="actorsphoto">
            <p>{{data.name}}</p>
          </div>
        </swiper>
      </div>
      <div class="line"></div>
      <div class="test dish">
        <h4>剧照</h4>
        <span>全部{{filminfo.photos.length}}张>></span>
        <swiper perview="3"
                class="photoswiper"
                myclassname="photoswiper">
          <div class="swiper-slide"
               v-for="data in filminfo.photos"
               :key="data">
            <img :src="data"
                 class="contentphoto">

          </div>
        </swiper>
      </div>

      <div class="buy"
           v-if="filminfo.isSale"
           @click="toBuy">选座购票</div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import swiper from './Detail/DetailSwiper.vue'
// import bus from '@/bus/index.js'
// import swiper2 from './Detail/DetailSwiper-2.vue'

export default {
  props: [''],
  data () {
    return {
      img: './static/img/to-back.png',
      id: this.$route.params.id,
      filminfo: null,

      isHeight: true,
      mytransfrom: {
        translateY: '0px'
      }

    };
  },

  components: {
    swiper,
    // swiper2
  },
  beforeCreate () {
    this.$store.commit('showCity', false)
    this.$store.commit('hidenTabbar', false)


  },
  beforeMount () {
    // this.$store.commit('hidenTabbar', false)
    // this.$store.commit('showCity', false)

    console.log(this.$route.params.id, this.id)
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.id}&k=1104379`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16073211741346815844679681","bc":"440700"}',
        'X-Host': 'mall.film-ticket.film.info',

      }
    }).then(res => {
      // console.log(res.data)
      this.filminfo = res.data.data.film

      console.log(this.filminfo)

      //根据图片高度，决定是否需要将图片向上移动
      //因为受网速影响，图片加载回来延迟时间不等
      //因此settimeout方法不好
      // setTimeout(() => {
      //   // console.log(this.$refs.refname.offsetHeight)
      //   if (this.$refs.refname.offsetHeight < 278) {
      //     this.isHeight = false

      //   }
      // }, 0);
      this.$nextTick(() => {
        console.log(this.$refs.refname.offsetHeight)
        if (this.$refs.refname.offsetHeight < 250) {
          this.isHeight = false

        }
      })

    })
  },
  // watch: {
  //   filminfo: function () {
  //     this.$nextTick(function () {
  //       console.log(this.$refs.refname.clientHeight)
  //     })
  //   },

  // },
  beforeDestroy () {
    this.$store.commit('showTabbar', true)
  },





  computed: {},

  methods: {
    toBack () {
      this.$router.go(-1)
    },
    scroll () {
      if (document.documentElement.scrollTop > 5) {
        document.getElementsByClassName('fname')[0].style.display = 'block'
        console.log(111)
      } else {
        document.getElementsByClassName('fname')[0].style.display = 'none'
      }
    },
    toBuy () {
      this.$router.push('/buy')
    }

  },

  mounted () {
    window.onscroll = this.scroll
    // console.log(this.$route)
    // // console.log("电影名字是：", this.$route.params.name)

  },
  // watch: {
  //   filminfo (d, a) {
  //     // console.log([...new Set(d.actors.name)])
  //     let arr = d.actors
  //     console.log(arr)

  //     console.log(new Set(arr))
  //     // arr.forEach((item, index) => {
  //     //   console.log(item.name, index)
  //     // });

  //   }

  // }

}
</script>
<style lang='css' scoped>
.back {
  position: relative;
}
.back img {
  width: 50px;
  height: 50px;
  position: fixed;
  top: 13px;
  left: 10px;
  z-index: 111;
  border-radius: 50%;
  padding: 3px;
  background-color: rgb(255, 255, 255, 0.4);
}
.img {
  height: 420px;
  overflow: hidden;
}
.img img {
  display: block;
}
.dish {
  padding: 0 10px;
}
#poster {
  width: 100%;
}
.transform {
  transform: translateY(-150px);
}
.actorsphoto {
  width: 110px;
  height: 150px;
}
.contentphoto {
  width: 100%;
}
.grade {
  float: right;
  transform: translateY(-65px);
  font-style: italic;
  color: #ff5f16;
  font-weight: 400;
  font-family: "Microsoft YaHei", Tahoma, Helvetica, Arial, sans-serif;
}
p {
  font-size: 0.9em;
  padding: 2px 0;
  color: #797d82;
}
.filmname {
  font-weight: 400;
}
.filmtype {
  font-size: 0.5em;
  /*  */
  margin-left: 10px;
  padding: 0.5px 2px;
  /* border: solid 1px gray; */
  border-radius: 3px;
  background-color: #d2d6dc;
  color: #fff;
  opacity: 0.8;
}
.detail {
  overflow: scroll;
  height: 80px;
  /* width: 400px; */
  width: 100%;
}
.line {
  height: 10px;
  background-color: rgb(245, 244, 244);
}

h3 {
  width: 70%;
}
.act {
  position: relative;
}

.buy {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100%;
  text-align: center;
  background-color: #ff5f16;
  color: #fff;
  font-size: 30px;
  line-height: 80px;
  z-index: 2;
}
.test {
  position: relative;
}

.test::after {
  content: "";
  height: 60px;
  display: block;
}
.test span {
  position: absolute;
  top: 2px;
  right: 0;
  font-size: 13px;
  color: #797d82;
}
.fname {
  position: fixed;
  background-color: #fff;
  width: 100%;
  height: 70px;
  line-height: 70px;
  font-size: 1.2em;
  text-align: center;
  z-index: 100;
  display: none;
}
</style>