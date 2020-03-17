<template>
  <div class="badge">{{num}}</div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  watch: {
    num: {
      handler(v) {
        if (v >= 100) {
          return '99+';
        }
      }
    }
  },
}
</script>
<style scoped>
.badge {
  display: inline-block;
  text-align: center;
  width: 30rpx;
  height: 30rpx;
  line-height: 30rpx;
  padding: 5rpx;
  border-radius: 50%;
  border: 1px solid #aaa;
  font-size: 12px;
  background: #aaa;
  color: #fff;
}
</style>
