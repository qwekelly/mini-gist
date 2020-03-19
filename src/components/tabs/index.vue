<template>
  <div class="tabs">
    <div @click="pickTab(item, index)"
      v-for="(item, index) in tabs"
      :key="index"
      class="tabs-item">
      {{item.name}}
    </div>
    <div class="slider" :style="{transform: activeTrans, width: activeWidth}"></div>
  </div>
</template>

<script>
  export default {
    created () {
      const len = 100 / this.tabs.length + '%'
      this.activeWidth = len
    },
    props: {
      tabs: {
        type: Array,
        defalt: []
      },
      index: {
        type: Number,
        defalt: 0
      }
    },
    watch: {
      index (index) {
        const len = index * 100 + '%'
        this.activeTrans = `translateX(${len})`
      }
    },
    data () {
      return {
        activeTrans: 'translateX(0)',
        activeWidth: '',
        currentItem: {}
      }
    },
    methods: {
      pickTab (item, index) {
        const len = index * 100 + '%'
        this.activeTrans = `translateX(${len})`
        this.currentItem = item
        this.$emit('changeTab', item)
      }
    }
  }
</script>

<style scoped lang='scss'>
.tabs {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #099;
  color: #ddd;
  .tabs-item {
    width: 100%;
    text-align: center;
    flex: 1;
    line-height: 3;
  }
  .slider {
    position: absolute;
    height: 2px;
    background: #159;
    bottom: 0;
    left: 0;
    transform: translateX(100%);
    transition: .2s all;
  }
}
</style>
