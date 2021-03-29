<template>
  <div>
    <ul>
      <li v-for="data in this.$store.state.commingsoonList"
          :key="data.name"
          @click="handleClick(data.isPresale,data.filmId)">
        <img :src="data.poster"
             alt="">
        <span class="filmname">{{data.name}}</span><span class="filmtype">{{data.item.name}}</span>
        <br /> <br />

        <p class="act">主演：{{data.actors | actorsfilter}}</p>
        <p>上映时间：</p>
        <div class="buy"
             @click.stop="onClick"
             v-if="data.isPresale">预购</div>
      </li>

    </ul>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import Vue from 'vue'
// 全局注册
Vue.use(Dialog);


export default {
  data () {
    return {

    };
  },
  mounted () {
    if (this.$store.state.commingsoonList.length == 0) {
      this.$store.dispatch("getCommingsoonList")
    } else {
      // consolo.log("使0用缓存数据")  默认自动使用缓存数据
    }
  },
  components: {},

  computed: {},

  methods: {
    handleClick (data, id) {
      if (!data) {
        // console.log('fashoule')
        // MessageBox({
        //   title: '提示',
        //   message: '该电影还没有排期，看看其他电影吧',
        //   showCancelButton: true,
        //   height: 500
        // }).then(res => {
        //   if (res === 'confirm') {
        //     this.$router.push('/Film/Commingsoon')
        //   }


        // })
        Dialog.confirm({
          title: '提示',
          message: '该电影还没有排期，看看其他电影吧',
          width: 280,



        })
          .then(() => {
            this.$router.push('/Film/Commingsoon') // on confirm
          })
          .catch(() => {
            this.$router.push({ name: "detailpage", params: { id: id } }) // on cancel
          });

      }
      else {
        this.$router.push({ name: "detailpage", params: { id: id } })
      }

    },
    onClick () {
      alert(11)
    }
  }
}
</script>
<style lang='css' scoped>
/* 为了包保证底部导航栏不遮住内容 */
ul::after {
  content: "";
  height: 60px;
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
.act {
  width: 450px;
  height: 40px;
  text-overflow: ellipsis;

  white-space: nowrap;

  overflow: hidden;
}
.buy {
  float: right;
  transform: translateY(-95px);
  color: #ffb232;
  padding: 3px 8px;

  border: 1px solid #ffb232;

  border-radius: 5px;
}
</style>