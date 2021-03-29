// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import { Icon } from 'vant';
import { Button } from 'vant';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { MessageBox } from 'mint-ui';
import VueResource from 'vue-resource'
Vue.prototype.HOST = 'http://localhost:4000'
Vue.use(VueResource)
Vue.use(MintUI);
Vue.use(Icon);
Vue.use(Button);




import "./style/public.css";



Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})


// 全局路由守卫
// const auth = {
//     isLogin() {
//         return false;
//     }
// }
// router.beforeEach((to, from, next) => {
//         if (to.path === '/center') {
//             console.log("禁止访问")
//             if (auth.isLogin()) {
//                 next()

//             } else {
//                 next('/login')
//             }

//         } else {
//             next();
//         }
//     })
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.needLogin)) { //判断是否需要登录
        if (sessionStorage['username']) {
            MessageBox.alert('功能待开发', '提示');
        } else {

            MessageBox.confirm('登录后才可购买？').then(action => {
                next({
                    path: "/login",


                })
            }).catch(() => {});

        }

    } else {
        next()
    }
});