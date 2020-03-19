<template>
  <div class="folloers-container">
    <div v-for="(item, index) in followers" :key="index">
      <user-item :item="item" />
    </div>
  </div>
</template>

<script>
import { getUserFollowers } from '@/api/index'
import UserItem from '@/components/userItem'

let user = ''
export default {
  onLoad (options) {
    user = options.login
    this.getFollowers()
  },
  components: {
    UserItem
  },
  data () {
    return {
      followers: []
    }
  },
  methods: {
    async getFollowers () {
      const data = await getUserFollowers(user)
      this.followers = data
    }
  }
}
</script>

<style scoped lang='scss'>
.folloers-container {
  padding: 10px 20px;
}
</style>
