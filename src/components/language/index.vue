<template>
  <div class="language" v-if="language">
    <i :class="language" class="circle"></i>
    <span class="title">{{language}}</span>
  </div>
</template>
<script>
export default {
  props: {
    language: {
      default: ''
    }
  }
}
</script>
<style scoped>
.language {
  display: inline-block;
  width: 185rpx;
}
.circle {
  display: inline-block;
  vertical-align: middle;
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  margin: 0 10rpx;
  background-color: #2c3e50;
}
.title {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
}
.JavaScript {
  background-color: #f1e05a;
}
.HTML {
  background-color: #e34c26;
}
.CSS {
  background-color: #563d7c;
}
.TypeScript {
  background-color: #2b7489;
}
.PHP {
  background-color: #4f5d95;
}
.Java {
  background-color: #b07219;
}
.Python {
  background-color: #3572a5;
}
.Ruby {
  background-color: #701516;
}
.CoffeeScript {
  background-color: #244776;
}
.Vue {
  background-color: #2c3e50;
}
.C# {
  background-color: #178600;
}
</style>
