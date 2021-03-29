<template>
  <div>
    <div class="back "
         @click="toBack">
      <img src="../../static/img/to-back.png">
    </div>
    <div class="main">
      <img src="../../static/img/logo.jpg"
           alt=""
           @click="register">
      <div class="form">
        <van-form @submit="onSubmit">
          <van-field v-model="username"
                     name="username"
                     label="用户名"
                     placeholder="用户名"
                     :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="password"
                     type="password"
                     name="password"
                     label="密码"
                     placeholder="密码"
                     :rules="[{ required: true, message: '请填写密码' }]" />

          <span class="flag"
                v-show="flag">用户名或密码错误，请重新输入！</span>
          <div style="margin: 16px;">
            <van-button round
                        block
                        type="info"
                        native-type="submi">登录</van-button>
          </div>
        </van-form>
        <div class='tips'>
          <p @click="toRigest">还没有账号？点击注册</p>

        </div>
        <!-- <van-button type="primary"
                    text="显示遮罩层"
                    @click="show = true" /> -->

      </div>
      <van-overlay :show="show">
        <div class="box"
             @click.stop>
          <h5>注册账号 <img src="../../static/img/cancel.jpg"
                 @click="toCancel"></h5>
          <div class="boxt">
            <van-form @submit="onRegist">
              <van-field v-model="username"
                         name="username"
                         label="用户名"
                         placeholder="用户名"
                         :rules="[{ required: true, message: '请填写用户名' }]" />
              <van-field v-model="password"
                         type="password"
                         name="password"
                         label="密码"
                         placeholder="密码"
                         :rules="[{ required: true, message: '请填写密码' }]" />

              <span class="flag"
                    v-show="flag">用户名或密码错误，请重新输入！</span>
              <div style="margin: 16px;">
                <van-button round
                            block
                            type="info"
                            native-type="submi">点击注册</van-button>
              </div>
            </van-form>
          </div>
        </div>
      </van-overlay>
    </div>

  </div>
</template>

<script>

import Vue from 'vue';
import { Form } from 'vant';
import { Field } from 'vant';
import { Toast } from 'vant';
import Bus from '@/bus/index.js'
import axios from "axios"
import { Overlay } from 'vant';

Vue.use(Overlay);


Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(Toast);
export default {
  data () {
    return {
      username: '',
      password: '',

      flag: false,
      show: false

    };
  },
  beforeMount () {
    this.$store.commit('hidenTabbar', false)
  },
  mounted () {


  },

  components: {

  },

  computed: {},

  methods: {
    toBack () {
      this.$router.go(-1)
    },
    toCancel () {
      this.show = false
    },
    toRigest () {
      this.show = true

      // this.$router.push("/center")
    },
    register () {

    },


    onRegist () {


      axios.post(this.HOST + '/api/register', { username: this.username, password: this.password })
        .then(result => {
          Toast.loading({
            message: '正在注册....',
            forbidClick: true,
          });
          // console.log(result.data)
          // this.msg = result.data.msg
          if (result.data.status == 1) {


            setTimeout(() => {
              Toast.success('注册成功');
              this.password = ''
              this.show = false

            }, 2000);
          } else {
            setTimeout(() => {
              Toast.fail('用户名已存在！');
              this.username = ''
              this.password = ''


            }, 2000);
          }


        }).catch(err => {
          console.log(err)
        })
    },

    onSubmit () {
      this.flag = false //保证每次点击登录，密码错误提示都会消失
      axios.post(this.HOST + '/api/login', { username: this.username, password: this.password })
        .then(result => {
          console.log(result.data.status)
          // this.msg = result.data.msg
          Toast.loading({
            message: '登录中....',
            forbidClick: true,
          });
          if (result.data.status === 0) {
            setTimeout(() => {
              this.flag = true
              Toast.fail('登录失败');

            }, 2000);
          } else {

            setTimeout(() => {
              let info = result.data.data[0]
              //  console.log(result.data.data)
              sessionStorage.setItem("username", info.user_name);
              sessionStorage.setItem("avatar", info.avatar);
              Toast.success('登录成功');
              console.log(result.data.data)

              this.$router.push("/center")
            }, 2000);
          }


        })
        .catch(err => {
          console.log(err)

        })
    },


    // onSubmit () {
    //   console.log(this.username)
    //   axios.get('http://localhost:3000/').then((response) => {
    //     var name_arr = []
    //     var pwd_arr = []
    //     var id_arr = []
    //     response.data.forEach((item, index) => {

    //       name_arr.push(item.user_name)
    //       pwd_arr.push(item.password)
    //       id_arr.push(item.user_id)


    //     })
    //     Toast.loading({
    //       message: '登录中....',
    //       forbidClick: true,
    //     });

    //     // console.log(name_arr, pwd_arr)
    //     if (name_arr.indexOf(this.username) == -1) {

    //       setTimeout(() => {
    //         this.flag1 = true

    //       }, 2000);



    //     } else {
    //       this.flag1 = false
    //       this.flag2 = false
    //       let index = name_arr.indexOf(this.username)
    //       if (this.password == pwd_arr[index]) {
    //         let user_id = id_arr[index]
    //         sessionStorage.setItem("userid", user_id);
    //         sessionStorage.setItem("username", this.username);

    //         setTimeout(() => {
    //           Toast.success('登录成功');

    //           this.$router.push("/center")
    //         }, 2000);
    //       } else {


    //         setTimeout(() => {
    //           this.flag2 = true
    //           Toast.fail('登录失败');

    //         }, 2000);
    //       }


    //     }

    //   })
    // }
  },

}
</script>
<style lang='css' scoped>
.back {
  width: 80px;
  height: 80px;
}
.back img {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 20px;
  left: 20px;
}
.main {
  margin-top: 100px;
  position: relative;
}
.main img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  left: 40%;
}
.main .form {
  position: absolute;
  width: 100%;
  top: 100px;
}
.van-button--info {
  background-color: #ff5f16;
  border: 1px solid #ff5f16;
}
Center {
}
.flag {
  padding-left: 30px;
  color: red;
  font-size: 11px;
}
.tips {
  float: right;
  padding-right: 15px;
  font-size: 20px;
  color: #ff5f16;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-200px);
  height: 100%;
}

.boxt {
  background-color: #fff;
  border-radius: 20px;
}
h5 {
  color: #fff;
  font-size: 1.5em;
}
h5 img {
  transform: translate(325px, 20px);
  width: 5.8vw !important;
  height: 5.8vw !important;
}
</style>