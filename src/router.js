import Vue from 'vue'
import Router from 'vue-router'
import Film from '@/views/Film'
import Nowplaying from '@/views/Film/nowplaying'
import Commingsoon from '@/views/Film/commingsoon'
import Center from '@/views/Center'
import Login from '@/views/Login'
import Cinema from '@/views/Cinema'
import Detail from '@/views/Detail'
import City from '@/views/City'
import CinemaDetail from '@/views/CinemaDetail'
import posterSwiper from '@/views/cinema/posterSwiper'
import Buy from '@/views/buy'



// // 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }



Vue.use(Router)

export default new Router({
    routes: [{
            path: '/film',
            meta: { index: 0 },
            component: Film,
            children: [{
                    path: "nowplaying",

                    component: Nowplaying
                },
                {
                    path: "commingsoon",
                    component: Commingsoon
                }, {
                    path: "",
                    redirect: "nowplaying"
                }
            ]
        },
        {
            path: '/cinema',
            meta: { index: 1 },
            component: Cinema
        },
        {
            path: '/cinemaDetail',
            component: CinemaDetail,
            name: "cinemaDetailpage",

        },
        {
            path: '/posterSwiper',
            component: posterSwiper,

        },
        {
            path: '/detail/:id',

            component: Detail,
            name: "detailpage"
        },
        {
            path: '/center',

            component: Center
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/city',
            component: City
        },
        {
            path: '/buy',
            component: Buy,
            meta: {
                needLogin: true
            }
        },
        {
            path: '*',
            redirect: '/film'
        },

    ]

})