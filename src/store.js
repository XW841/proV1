import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



export default new Vuex.Store({
    state: {
        isTabbarShow: true,
        commingsoonList: [],
        isCityShow: true,
        city: false
    },

    getters: { //getters（相当于计算属性）对状态进行处理，处理完后再赋值给需要的地方
        commingsoonListFilter(state) { //把state传进去，为了方便使用state.commingsoonList
            return state.commingsoonList.filter((item, index) => index < 3)
        }
    },

    mutations: { //唯一修改状态的地方
        hidenTabbar(state, data) {
            state.isTabbarShow = data
        },
        showTabbar(state, data) {
            state.isTabbarShow = data
        },

        commingsoonListMutation(state, data) {
            state.commingsoonList = data

        },

        hidenCity(state, data) {
            state.isCityShow = data
        },
        showCity(state, data) {
            state.isCityShow = data
        },
    },

    actions: {
        getCommingsoonList(store) { //把store传进去，为了方便使用store.commit
            axios({
                url: 'https://m.maizuo.com/gateway?cityId=440700&pageNum=1&pageSize=10&type=2&k=2754793',
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16073211741346815844679681","bc":"440700"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                console.log(res.data)
                store.commit('commingsoonListMutation', res.data.data.films)
            })
        }
    }
})