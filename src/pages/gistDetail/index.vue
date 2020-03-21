<template>
  <div class="gists-container">
    <!-- <div class="gists-item" v-for="(item, index) in gists" :key="index" @click=handleGistItem(item.files)>
      <img class="item-avatar" lazy-load :src="item['avatar_url']" alt="avatar">
      <div class="item-info">
        <p class="item-name">{{item['login']}}
          <span>/</span><span class="file-name">{{item['files']['filename']}}</span>
        </p>
        <p class="created-time desc">{{item['created_at']}}</p>
        <p class="file-name desc">{{item['description']}}</p>
      </div>
    </div> -->
     <div class="gists-item">
      <div class="item-info">
        <p class="item-name">
          <span class="file-name">{{fileDetail['filename']}}</span>
        </p>
        <p class="created-time desc">{{fileDetail['type']}}</p>
        <p class="file-name desc">{{fileDetail['language']}}</p>
        <p class="file-name desc">{{fileDetail['size']}}</p>
      </div>
    </div>
    <wemark :md="md" link highlight type="wemark"></wemark>
  </div>
</template>

<script>
import { getGistDetail } from '@/api/index'
import { formatTime } from '@/utils'
import testMd from './test.md'

export default {
  data () {
    return {
      fileDetail: {},
      md: `
        \`\`\`javascript
        // 代码啊

        console.log(123);
        \`\`\`
      `
    }
  },
  onLoad () {
    console.log(testMd)
    // 从微信存储中拿到当前gist的信息
    let fileDetail = wx.getStorageSync('gist-files')
    if (fileDetail) {
      this.fileDetail = fileDetail
    }
    console.log(fileDetail)
    this.getGistDetail(fileDetail['raw_url'])
  },
  // 离开当前详情页 把微信存储的gistDetail数据清掉
  onUnload () {
    wx.setStorageSync('gist-files', null)
  },
  methods: {
    // 处理gist数据结构
    // dealGist (data) {
    //   return {
    //     avatar_url: data['owner']['avatar_url'],
    //     login: data['owner']['login'],
    //     created_at: this.createdTime(data['created_at']),
    //     description: data['description'],
    //     files: Object.values(data['files'])[0]
    //   }
    // },
    async getGistDetail (url) {
      const data = await getGistDetail(url)
      console.log('代码内容', data)
    },
    // createdTime (time) {
    //   let date = new Date(time)
    //   let yy = formatTime(date)
    //   return yy
    // },
    // handleGistItem (obj) {
    //   console.log(obj)
    //   wx.showToast({
    //     title: '开发中...',
    //     icon: 'loading',
    //     duration: 1500
    //   })
    // }
  }
}
</script>

<style scoped lang='scss'>
.gists-container {
  padding: 0 20px;
}
.gists-item {
  display: flex;
  padding: 10px;
  line-height: 1.5;
  margin-top: 10px;
  border-bottom: 1px solid rgba(178,186,194,.35);
  .item-avatar {
    width: 50px;
    height: 50px;
    border-radius: 3px;
    margin-right: 10px;
  }
  .item-name {
    max-width: 200px;
    font-size: 16px;
    color: #2F80DA;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .file-name {
      margin-left: 5px;
      font-weight: 600;
    }
  }
  .desc {
    font-size: 14px;
  }
}
</style>
