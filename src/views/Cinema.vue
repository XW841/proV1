<template>
  <div>
    <div>
      <div class="top">
        <p class="aaa"
           @click="aa">影院</p>
        <div class="topB  ignore hairlines ">
          <!-- <p>全城</p>
        <P>APP订票</P>
        <p>距我最近</p> -->
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1"
                               :options="option1"
                               @change="onChange3" />
            <van-dropdown-item v-model="value2"
                               :options="option2"
                               @change="onChange1" />
            <van-dropdown-item v-model="value3"
                               :options="option3"
                               @change="onChange2" />
          </van-dropdown-menu>
        </div>
      </div>

      <div class="cinema"
           :style="mystyle"
           v-if="local !== null">
        <!--动态设置内联样式-->

        <ul>
          <li class="space"></li>
          <li v-for="data in cinemainfo"
              :key="data.name"
              @click="toCinemaDetail(data.cinemaId)">
            {{data.name}}
            <div class="address">
              <h6>
                <van-icon name="location-o" />
                {{data.address}}
              </h6>
            </div>

            <div class="price">
              <p>{{data.lowPrice/100}}元<span>&ensp;起</span></p>
            </div>

            <p class="distance">距离{{parseFloat(data.Distance).toFixed(1)}}km</p>
          </li>
        </ul>

      </div>
      <div v-else
           class="nocity">
        <van-icon name="location" />
        <p>请先选择城市</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui';
import BScroll from 'better-scroll'
import Vue from 'vue';
import { DropdownMenu, DropdownItem } from 'vant';
import { Toast } from 'vant';



Vue.use(Toast);

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {

  data () {
    return {
      local: localStorage.getItem('name'),
      cinemainfo: [],
      cinemainfo2: [],
      mystyle: {
        height: '0px'
      },
      value1: 0,
      value2: 0,
      value3: 0,
      option1: [
        { text: '全城', value: 0 },
        { text: '①市', value: 1 },
        { text: '②市', value: 2 },
        { text: '③市', value: 3 },
      ],
      option2: [
        { text: 'App订票', value: 0 },
        { text: '前台兑换', value: 1 },

      ],
      option3: [
        { text: '默认排序', value: 0 },
        { text: '距我最近', value: 1 },
        { text: '票价最低', value: 2 },
      ],
    };
  },
  beforeMount () {
    this.$store.commit('showCity', true)
  },
  created () {
    // Bus.$on('eventName', value => {
    //   console.log(接收数据)
    //   console.log(111)
    //   console.log(value)

    // })
  },

  mounted () {

    // console.log(document.documentElement.clientHeight)
    Indicator.open({
      text: '',
      spinnerType: 'fading-circle'
    });
    this.mystyle.height = document.documentElement.clientHeight - 40 + 'px'
    let id = localStorage.getItem('cityId', id)
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${id}&ticketFlag=1&k=7461164`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16073211741346815844679681","bc":"440700"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      console.log(res.data.data.cinemas)
      this.cinemainfo = res.data.data.cinemas
      this.cinemainfo2 = res.data.data.cinemas
      Indicator.close();

      this.$nextTick(() => {

        let bscroll = new BScroll('.cinema', {

          fade: true,
          interactive: false,
          click: true,//betterscroll会默认阻止其包含元素的click事件

          pullDownRefresh: {
            threshold: -10   //当下拉长度距离盒子顶部的高度超过10px的时候,就派发一个下拉刷新的事件
          },


        });

        bscroll.on("pullingDown", function () {  //下拉刷新事件
          console.log('下拉刷新数据');

          bscroll.finishPullDown()//可以多次执行下拉刷新，没有这段代码下只会刷新一次
        });
        bscroll.refresh();//初始化demo  当异步加载数据的时候，重新渲染页面，这段代码非常重要

      })
    })


  },
  components: {},


  computed: {},

  methods: {

    toCinemaDetail (cinemaId) {
      // alert(cinemaId)
      this.$router.push({ name: "cinemaDetailpage", params: { id: cinemaId } })
      localStorage.setItem("cid", cinemaId)
    },
    onConfirm () {
      this.$refs.item.toggle(false);
    },

    onChange1 (value) {



      if (value == 1) {
        var arr1 = this.cinemainfo

        var newarr = arr1.filter(item => {
          return item.eTicketFlag == 1
        })
        this.cinemainfo = newarr
      } else {
        this.cinemainfo = this.cinemainfo2
      }


    },
    onChange2 (value) {

      if (value == 1 || value == 0) {
        // console.log(this.cinemainfo)
        let arr1 = this.cinemainfo.sort(function (obj1, obj2) {
          return obj1.Distance - obj2.Distance
        })
        this.cinemainfo = arr1

      } else {
        let arr2 = this.cinemainfo.sort(function (obj1, obj2) {
          return obj1.lowPrice - obj2.lowPrice
        })
        this.cinemainfo = arr2
      }
    },

    onChange3 (value) {

      Toast.fail('功能待开发~~~~~');


    },
    aa () {
      console.log(this.cinemainfo)
    }



  }
}
</script>
<style lang='css' scoped>
* {
  padding: 0;
  margin: 0;
}

li {
  border: solid 0px gray;
  background: rgb(252, 252, 252);
  padding: 30px 15px;
  margin: 0 0 5px 0;
  font-size: 0.9em;
}
ul .space {
  height: 110px;
}
/*  */
.address {
  width: 75%;
}
.price {
  font-size: 0.9em;
  color: #ff5f16;
  float: right;
  transform: translate(-10px, -50px);
}
.distance {
  color: #797d82;
  font-size: 20px;
  float: right;
  transform: translate(80px, -20px);
}
.cinema {
  /* height: 500px; */
  overflow: hidden;
  position: relative;
}

h6 {
  color: #797d82;
  font-size: 20px;
  opacity: 0.6;
  margin-top: 10px;
  display: block;
  max-width: 80%;
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.top {
  /* margin-bottom: 50px; */
  height: 170px;
  /* line-height: 40px; */
  text-align: center;
  background-color: #ff5f16;
  position: fixed;
  width: 100%;
  z-index: 1;
}
.top .aaa {
  line-height: 60px;
}
.top .topB {
  position: absolute;

  bottom: 5px;
  width: 100%;
}
.top .topB p {
  float: left;
  width: 33%;
}
>>> .van-ellipsis {
  font-size: 30px;
  /* font-weight: 600; */
  height: 60px;
  line-height: 60px;
}

>>> .van-dropdown-menu__bar {
  height: 80px;
  box-shadow: none;
}
>>> .van-cell {
  padding: 30px 20px;
}
/* >>>深度选择器，用来修改组件默认样式 */
.nocity {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  opacity: 0.1;
}
.nocity i {
  transform: translate(-150px, -100px);
  font-size: 10em;
}
.nocity p {
  font-size: 80px;

  transform: translateX(-250px);
}
</style>