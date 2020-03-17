<template>
  <div class="star">
    <img src="/static/images/star.png" alt class="star-img">
    <label>{{num}}</label>
  </div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style scoped>
.star {
  display: inline-block;
}
.star-img {
  display: inline-block;
  width: 40rpx;
  height: 40rpx;
  vertical-align: middle;
}
label {
  display: inline-block;
  vertical-align: middle;
}
</style>
