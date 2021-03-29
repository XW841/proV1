<template>
  <div>
    <mt-index-list>
      <mt-index-section :index="data.index"
                        v-for="data in dataList"
                        :key="data.index">
        <div @click="handleClick(city.cityId,city.name)"
             v-for="city in data.list"
             :key="city.cityId">
          <mt-cell :title="city.name"></mt-cell>
        </div>

      </mt-index-section>

    </mt-index-list>
  </div>
</template>

<script>
// import Vue from 'vue'
import axios from 'axios'
import { IndexList, IndexSection } from 'mint-ui';

// Vue.component(IndexList.name, IndexList);
// Vue.component(IndexSection.name, IndexSection);
export default {
  data () {
    return {
      dataList: []
    };
  },

  mounted () {
    axios({
      url: 'https://m.maizuo.com/gateway?k=6562757',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16073211741346815844679681","bc":"230800"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data.data.cities)
      this.dataList = this.handleCity(res.data.data.cities)
      console.log(this.dataList)
    })
  },

  methods: {
    handleCity (cities, names) {
      console.log(cities)
      // console.log(cities.pinyin)
      let lettetArr = []
      for (let i = 65; i <= 90; i++) {
        lettetArr.push(String.fromCharCode(i))
      }
      console.log(lettetArr)

      let newlist = []
      for (let j = 0; j < lettetArr.length; j++) {
        let arr = cities.filter(item => item.pinyin.substring(0, 1) === lettetArr[j].toLowerCase())
        // console.log(arr)
        if (arr.length > 0) {
          newlist.push({
            index: lettetArr[j],
            list: arr
          })
        }


      }
      // console.log(newlist)
      return newlist
    },

    handleClick (id, name) {
      console.log(id, name)
      this.$store.state.city = name
      localStorage.setItem('cityId', id);
      localStorage.setItem('name', name);
      this.$router.go(-1)

    }
  },

  components: {},

  computed: {},


}
</script>
<style lang='css' scoped>
div {
  top: 40px;
}
</style>