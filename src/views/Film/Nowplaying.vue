<template>
  <div>
    <ul v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="80"
        infinite-scroll-immediate-check='false'>
      <li v-for="(data) in datalist"
          :key="data.filmId"
          @click="handleChangePage(data.filmId)">
        <img :src="data.poster"
             alt="">
        <span class="filmname">{{data.name}}</span><span class="filmtype">{{data.item.name}}</span>
        <div class="gradC">
          <p v-if="data.grade">观众评分：<span class="grade">{{data.grade}}</span></p>
          <p v-else>暂无评分{{data.grade}}</p>
        </div>
        <p class="act"
           v-if="data.actors">主演：{{data.actors | actorsfilter}}</p>
        <p class="act"
           v-else>主演：暂无主演</p>
        <p class="nation">{{data.nation}} | {{data.runtime}}分钟</p>
        <div class="buy"
             @click.stop="onClick">购票</div>

      </li>
    </ul>
    <!-- <div>加载中</div> -->

  </div>

</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { InfiniteScroll } from 'mint-ui';
import { Toast } from 'mint-ui';

Vue.use(InfiniteScroll);

import { Indicator } from 'mint-ui';

Vue.filter("actorsfilter", function (data) {
  let actorname = data.map(item => item.name).join(" ")
  return actorname;
})
export default {
  data () {
    return {
      datalist: [],
      total: 0,

      loading: false,
      current: 1
    };
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });

    // axios.get('https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=8866764').then(res => {
    //   console.log(red.data)
    // })

    axios({

      url: 'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=2343106',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16073211741346815844679681"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data)
      this.datalist = res.data.data.films;
      this.total = res.data.data.total;
      console.log(this.datalist)
      Indicator.close();
    })

  },

  components: {},

  computed: {},

  methods: {
    onClick () {
      alert(11)
    },
    handleChangePage (id) {
      //两种跳转方法
      // this.$router.push(`/detail/${name}`)
      this.$router.push({ name: "detailpage", params: { id: id } })
    },



    loadMore () {
      // console.log("到底了")
      // console.log(this.total)
      console.log(this.datalist.length)
      this.loading = true; //禁用无限滚动条
      this.current++;
      //接口需每天更换，因为每天total不一样，
      if (this.datalist.length === this.total) {

        Toast({
          message: '资源加载完毕哦！！！',
          position: 'center',
          duration: 2000
        });
        return;
      }

      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      axios({

        //接口需每天更换，因为每天total不一样，
        url: `https://m.maizuo.com/gateway?cityId=310100&pageNum=${this.current}&pageSize=10&type=1&k=2343106`,
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16073211741346815844679681"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        console.log(res.data)

        this.datalist = [...this.datalist, ...res.data.data.films]
        this.loading = false  //将每次数据合并到列表中之后，再启用无限滚动条
        // console.log(this.datalist.length)
        Indicator.close();

      })
    }
  },

}
</script>
<style lang='css' scoped>
/* div {
  transform: translateY(-40px);
} */

/* 为了包保证底部导航栏不遮住内容 */
ul::after {
  content: "";
  height: 30px;
  display: block;
}
ul li {
  overflow: hidden;
  padding: 7px 10px;
  /* margin-bottom: 20px; */
}

ul li img {
  width: 150px;
  height: 180px;
  float: left;
  margin-right: 15px;
}
p {
  font-size: 0.9em;
  width: 310px;

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

  border-radius: 3px;
  background-color: #d2d6dc;
  color: #fff;
  opacity: 0.8;
}
.gradC {
  width: 225px;
  margin-left: 150px;
}
.grade {
  color: #ff5f16;
  font-weight: 400;
  font-family: "Microsoft YaHei", Tahoma, Helvetica, Arial, sans-serif;
}
.act {
  width: 450px;
  height: 40px;
  text-overflow: ellipsis;

  white-space: nowrap;

  overflow: hidden;
}
.nation {
  width: 500px;
}
.buy {
  float: right;
  transform: translateY(-95px);
  color: #ff5f16;
  padding: 3px 8px;

  border: solid 1px silver;

  border-radius: 5px;
}
</style>