<template>
  <div @click="toInfo" class="user-item">
    <img class="user-avatar" lazy-load :src="item['avatar_url']" alt="avatar">
    <p class="user-name">{{item['login']}}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: 'Object',
      default: {}
    }
  },
  methods: {
    toInfo () {
      console.log(this.item.login)
      // wx.navigateTo({
      //   url: `/pages/info/info?login=${this.item.login}`
      // })
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../styles/mixin.scss';

.user-item {
  display: flex;
  padding: 10px;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
  align-items: center;
  background: rgba(47, 128, 218, 0.5);
  border-radius: 3px;
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 3px;
    margin-right: 10px;
  }
}
</style>