<template>
  <div id="app">
    <Button type="primary" @click="isShowAreaModel = !isShowAreaModel">城市多选</Button>
    <Modal v-model="isShowAreaModel" title="城市多选" :mask-closable="false" :scrollable="false">
      <div class="area-wrapper">
        <area-multi-selection @areaData="receiveAreaData" :AreaData="areaIndexArr"></area-multi-selection>
      </div>
    </Modal>
    <div class="result-pannel">
      <h2 class="title">选择结果</h2>
      <div class="index-wrapper">
        <span class="label">下标结果：</span>
        <p class="result">{{areaIndexArr}}</p>
      </div>
      <div class="name-wrapper">
        <span class="label">名称结果：</span>
        <p class="result">{{areaNameArr}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import areaMultiSelection from './components/area/area';
export default {
  name: 'app',
  components: {
    'area-multi-selection': areaMultiSelection
  },
  data() {
    return {
      isShowAreaModel: false,
      areaIndexArr: [],
      areaNameArr: []
    };
  },
  methods: {
    receiveAreaData(data) {
      this.areaIndexArr = data.index;
      this.areaNameArr = data.name;
    }
  }
};
</script>

<style lang="stylus">
body
  background #f0f2f5

#app
  padding 20px

  .result-pannel
    margin-top 20px
    padding 20px
    background #fff
    border 1px solid #dde2e8

    .title
      margin-bottom 20px

    .index-wrapper, .name-wrapper
      display flex

      .label
        flex 80px 0 0

    .name-wrapper
      margin-top 20px
</style>


