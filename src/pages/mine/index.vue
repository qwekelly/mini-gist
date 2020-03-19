<template>
  <div class="mine">
    <User v-if="auth" :info="myInfo" @signOut="signOut"/>
    <div v-else>
      <div>
        <img class="logo" src="/static/images/user.png" background-size="cover" />
      </div>
      <div class="login-header">
        <h2>Sign in to GitHub</h2>
      </div>
      <section class="login" id="login">
        <form class="login-form">
          <label>Username or email address</label>
          <input v-model="username" type="text" class="login-input" />
          <label>Password</label>
          <input @confirm="login" v-model="password" type="password" class="login-input" />
          <button :loading=loginLoading type="submit" @click="login" class="login-button">Sign in</button>
        </form>
      </section>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/index'
import { base64_encode } from '../../utils/base64'
import User from '../../components/user'

export default {
  components: {
    User
  },
  data () {
    return {
      username: '',
      password: '',
      myInfo: {},
      auth: false,
      loginLoading: false
    }
  },
  onLoad () {

  },
  created () {
    // 从微信存储中查询我的信息
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.auth = true
      this.myInfo = userInfo
    }
  },
  methods: {
    async login () {
      let authorization = ''
      if (!this.username || !this.password) {
        wx.showToast({
          title: '输入不能为空',
          icon: 'loading',
          image: '/static/images/error.png',
          duration: 1200
        })
        return
      }
      this.loginLoading = true
      authorization = 'Basic ' + base64_encode(this.username + ':' + this.password)

      wx.setStorageSync('Authorization', authorization)
      const userInfo = await getUserInfo(this.username)
      this.loginLoading = false
      // const authStr = JSON.stringify(userInfo)
      wx.setStorageSync('userInfo', userInfo)
      this.auth = true
      this.myInfo = userInfo
      console.log('myInfo', userInfo)
    },
    signOut () {
      const that = this
      wx.showModal({
        content: '确认退出登录?',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#7f7f7f',
        confirmText: '确认',
        confirmColor: '#2d8cf0',
        success(res) {
          if (res.confirm) {
            wx.setStorageSync('Authorization', '')
            wx.setStorageSync('userInfo', null)
            that.auth = false
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.mine {
  padding: 10px 20px;
}
.logo {
  display: block;
  width: 128rpx;
  height: 128rpx;
  margin: auto;
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
  /* background-color: #28a745;
  background-image: linear-gradient(-180deg,#34d058,#28a745 90%); */
  background-color: #2F80DA;
  background-image: linear-gradient(-180deg,#2F80DA,#2F80DA 90%);
}
</style>
