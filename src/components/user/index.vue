<template>
  <div class="info-container">
    <div id="top" class="top" :style="{backgroundImage: 'url(' + info['avatar_url'] + ')'}">
      <div class="bg-wrapper"></div>
      <div class="content">
        <img class="avatar" :src="info['avatar_url']" alt="avatar">
        <div class="top-r">
          <p class="login">{{info.login}}</p>
          <p>{{info.location}}</p>
          <p>Joined at {{info['created_at']}}</p>
        </div>
      </div>
      <div class="sign-out" @click=signOut>Sign out</div>
      <!-- corner -->
      <!-- <div @click="follow" v-if="isCornerShow" class="corner">
        <fixed-corner :content="followContent"></fixed-corner>
      </div> -->
    </div>
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
    }
  }
}
</script>
<style scoped lang="scss">
.info-container {
  // display: flex;
  // flex-direction: column;
}
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
    background: rgba(0,153,153,.8);
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
  .sign-out {
    position: absolute;
    top: 0;
    right: 0;
    padding: 17px 10px 10px;
    z-index: 10;
  }
  .corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
}

</style>
