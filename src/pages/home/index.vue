<template>
  <div class="search">
    <div class="userinfo">
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />
    </div>
    <div class="search-input-content">
      <div class="search-choose">
        <picker
          @change="bindPickerChange"
          :value="index"
          range-key="name"
          :range="array"
          mode="selector"
          class="search-choose-picker"
        >
          <view>{{array[index].name}}</view>
        </picker>
      </div>
      <input type="text" class="search-input" v-model="input">
      <span class="search-btn">搜索</span>
      <!-- <span class="search-btn" @click="handleSearch">搜索</span> -->
    </div>
    <div class="search-result">
       <!-- repo搜索 -->
      <!-- <ul v-if="index === 0">
        <li v-for="item in repoList" :key="item.id" class="search-item">
          <ul class="search-item-content">
            <li class="search-item-left">
              <div class="search-item-left-name">{{item.full_name}}</div>
              <div class="search-item-left-desc" v-if="item.description">{{item.description}}</div>
              <div class="search-item-left-update">Update on {{item.update}}</div>
            </li>
            <li class="search-item-right">
              <span>{{item.stars}}</span>
              <language :language="item.language"></language>
            </li>
          </ul>
        </li>
      </ul> -->
      <!-- 用户名搜索 -->
      <!-- <ul v-if="index === 1">
        <li v-for="item in userList" :key="item.id" class="search-item" @click="handleToUser(item.login)">
          <ul class="search-item-content">
            <li class="search-item-left">
              <div class="search-item-left-name">{{item.login}}</div>
            </li>
            <li class="search-item-right">
              <img :src="item.avatar_url" alt class="search-item-right-img">
            </li>
          </ul>
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script>
import { getSearchUser, getSearchRepo } from '@/api/index'
import language from '@/components/language/index.vue'
import { formaDate, changeStar } from '@/utils/index'
export default {
  data() {
    return {
      index: 1,
      array: [
        {
          id: 0,
          name: 'repo'
        },
        {
          id: 1,
          name: 'user'
        }
      ],
      currenChoose: '',
      input: '',
      repoList: [],
      userList: []
    }
  },
  components: { language },
  mounted() {
    // this.handleSearch()
  },
  methods: {
    // 搜索
    handleSearch() {
      if (this.index === 0) {
        // 搜索仓库
        getSearchRepo({ q: this.input }).then(res => {
          if (res.items.length > 0) {
            this.repoList = res.items
            this.repoList.map(v => {
              v.update = formaDate(new Date(v.updated_at))
              v.stars = changeStar(v.stargazers_count)
            })
          } else {
            this.repoList = []
          }
        })
      } else {
        // 搜索用户
        getSearchUser({ q: this.input }).then(res => {
          if (res.items.length > 0) {
            this.userList = res.items
          } else {
            this.userList = []
          }
        })
      }

    },
    bindPickerChange(e) {
      this.index = e.target.value * 1
    },
    handleToUser(login) {
      // wx.navigateTo({
      //   url: `/pages/user-detail/main?login=${login}`
      // })
    }
  }
}
</script>
<style scoped>
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10rpx;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}
.search-img-content {
  margin: 0 auto;
  width: 300rpx;
  height: 300rpx;
}
.search-img {
  display: block;
  width: 100%;
  height: 100%;
}
.search-input-content {
  display: flex;
  align-content: center;
  margin: 0 auto;
}
.search-choose {
  width: 100rpx;
  text-align: left;
}
.search-choose-picker {
  height: 60rpx;
  line-height: 60rpx;
}
.search-input {
  height: 60rpx;
  line-height: 60rpx;
  padding: 5rpx;
  border: 1rpx solid #000;
}
.search-btn {
  display: inline-block;
  padding: 5px 10px;
  width: 150rpx;
  height: 50rpx;
  line-height: 50rpx;
  font-size: 16px;
}
.search-result {
  width: 100%;
  padding: 20rpx 10rpx;
}
.search-item {
  padding: 20rpx 10rpx;
  margin: 20rpx 10rpx;
  border: 1px solid #ebeef5;
  border-radius: 10rpx;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.search-item-content {
  display: flex;
  align-items: top;
  justify-content: space-between;
}
.search-item-left {
  padding: 10rpx;
  flex:1 0;
}
.search-item-left-name {
  color: #0366d6;
}
.search-item-left-desc {
  text-align: left;
  font-size: 16px;
  color: #999;
}
.search-item-left-update {
  font-size: 14px;
  color: #586069;
}
.search-item-right {
  text-align: right;
}
.search-item-right-img {
  width: 150rpx;
  height: 150rpx;
}
.title {
  display: inline-block;
  margin: 0 10rpx 0 0;
  font-size: 14px;
}
</style>
