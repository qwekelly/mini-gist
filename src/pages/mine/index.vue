<template>
  <div class="mine">
    <img class="logo" src="/static/images/user.png" background-size="cover" />
    <div class="login-header">
      <h2>Sign in to GitHub</h2>
    </div>
    <section class="login" id="login">
      <form class="login-form">
        <label>Username or email address</label>
        <input v-model="username" type="text" class="login-input" placeholder="User" />
        <label>Password</label>
        <input @confirm="login" v-model="password" type="password" class="login-input" placeholder="Password" />
        <button :loading=loginLoading type="submit" @click="login" class="login-button">Sign in</button>
      </form>
    </section>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/index'
import { base64_encode } from '../../utils/base64'

export default {
  data () {
    return {
      username: '',
      password: '',
      auth: '',
      loginLoading: false
    }
  },
  onLoad () {

  },
  methods: {
    async login () {
      let authorization = ''
      if (!this.username || !this.password) {
        wx.showToast({
          title: '输入不能为空',
          icon: 'loading',
          image: '/static/img/error.png',
          duration: 1200
        })
        return
      }
      this.loginLoading = true
      authorization = 'Basic ' + base64_encode(this.username + ':' + this.password)

      if (authorization.length !== 0) {
        wx.setStorageSync('Authorization', authorization)
        const auth = await getUserInfo(this.username)
        this.loginLoading = false
        const authStr = JSON.stringify(auth)
        console.log("github拿到的登陆状态", authStr)
      }
      // const auth = await login(this.username, this.password)
      // this.loginLoading = false
      // // 如果 auth 为空，也就是说账户密码错误什么的
      // if (!auth) {
      //   return
      // }
      // const authStr = JSON.stringify(auth)
      // console.log("github拿到的登陆状态", authStr)
      // wx.setStorageSync('auth', authStr)
      // this.comfirmLogin(true)
      // this.auth = true
      // const me = await this.getMe()
      // this.info = me
    },
  }
}
</script>
<style scoped>
.mine {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}
.login-header {
    margin-bottom: 15px;
    color: #333;
    text-align: center;
    text-shadow: none;
    background-color: initial;
    border: 0;
}
.login {
  border-radius: 5px;
  padding: 20px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #d8dee2;
}
.login-form {
  box-sizing: border-box;
}
.login-form label {
  display: block;
  margin-bottom: 7px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
}
.login-input {
  margin-top: 5px;
  margin-bottom: 15px;
  display: block;
  min-height: 34px;
  padding: 6px 8px;
  font-size: 16px;
  line-height: 20px;
  background-color: rgb(232, 240, 254);
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
}
.login-input:hover{
  border-color: #2188ff;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3);
}
.login-button {
  border: none;
  border-radius: 3px;
  font-size: 18px;
  color: #fff;
  background-color: #28a745;
  background-image: linear-gradient(-180deg,#34d058,#28a745 90%);
}
</style>
