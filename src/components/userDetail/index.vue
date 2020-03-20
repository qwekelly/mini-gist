<template>
  <div class="info-container">
    <div id="top" class="top" :style="{backgroundImage: 'url(' + info['avatar_url'] + ')'}">
      <div class="bg-wrapper"></div>
      <div class="content">
        <img class="avatar" :src="info['avatar_url']" alt="avatar">
        <div class="top-r">
          <p class="login">{{info.login}}</p>
          <p><mp-icon icon="location"></mp-icon>{{info.location}}</p>
          <p>{{info['bio']}}</p>
        </div>
      </div>
    </div>
    <div class="ghchart" :style="{backgroundImage: 'url(https://ghchart.rshah.org/409ba5/' + info['login'] + ')'}"></div>
    <div class="info-card">
      <div class="follow-area">
        <p v-if="info.name" class="name">Name: {{info.name}}</p>
        <p v-else class="name">login name: {{info.login}}</p>
      </div>
      <p v-if="info.bio">{{info.bio}}</p>
      <p v-if="info.company"><span class="icon-users icon"></span>{{info.company}}</p>
      <p v-if="info.email"><span class="icon-envelop icon"></span>{{info.email}}</p>
      <p v-if="info.blog"><span class="icon-earth icon"></span>{{info.blog}}</p>
    </div>
    <button class="info-tab" @click="toRepos()">Repositories<span class="num">{{info['public_repos']}}</span></button>
    <button class="info-tab" @click="toGists()">Gists<span class="num">{{info['public_gists']}}</span></button>
    <button class="info-tab" @click="toFollowers()">Followers<span class="num">{{info['followers']}}</span></button>
    <button class="info-tab" @click="toFollowing()">Following<span class="num">{{info['following']}}</span></button>
    <button @click="signOut" class="signOut-button">Sign out</button>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: {}
    },
    followContent: {
      type: String,
      default: 'FOLLOW'
    }
  },
  data () {
    return {
      isMe: false,
      isCornerShow: false,
    }
  },
  methods: {
    signOut () {
      this.$emit('signOut')
    },
    toRepos () {
      wx.showToast({
        title: '开发中...',
        icon: 'loading',
        duration: 1500
      })
    },
    toGists () {
      if (this.info['public_gists']) {
        wx.navigateTo({
          url: `/pages/gists/main?login=${this.info['login']}`
        })
      }
    },
    toFollowers () {
      if (this.info['followers']) {
        wx.navigateTo({
          url: `/pages/followers/main?login=${this.info['login']}`
        })
      }
    },
    toFollowing () {
      wx.showToast({
        title: '开发中...',
        icon: 'loading',
        duration: 1500
      })
    }
  }
}
</script>
<style scoped lang="scss">
.top {
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #fff;
  height: 100px;
  width: 100%;
  .bg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(47, 128, 218, 0.8);
  }
  .content {
    position:absolute;
    top: 0;
    left: 0;
    padding: 10px;
    display: flex;
    z-index: 10;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .top-r {
      font-size: 14px;
      margin-left: 10px;
      flex: 1;
      .login {
        font-size: 20px;
        font-weight: bold;
        line-height: 2;
      }
    }
  }
  .corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
}
.ghchart {
  height: 50px;
  width: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: contain;
  margin-top: 20px;
}
.info-card {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  line-height: 2;
  border-radius: 3px;
  background: rgba(47, 128, 218, 0.5);
  .follow-area {
    display: flex;
    .corner {
      position: absolute;
      right: 0;
      align-self: center;
    }
  }
  .name {
    font-size: 18px;
  }
  .icon {
    padding-right: 15px
  }
}
.info-tab {
  margin-top: 10px;
  border-radius: 3px;
  font-size: 18px;
  background-color: rgba(47, 128, 218, 0.5);
  .num {
    padding: 4px;
    background-color: rgba(27,31,35,.38);
    border-radius: 20px;
    margin-left: 7px;
  }
}
.signOut-button {
  margin-top: 20px;
  border: none;
  border-radius: 3px;
  font-size: 18px;
  color: #fff;
  background-color: #2F80DA;
  background-image: linear-gradient(-180deg,#2F80DA,#2F80DA 90%);
}
</style>
