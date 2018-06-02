<template>
  <div class="area clearfix">
    <div class="region-wrapper" v-for="(province,index) in data" :key="index">
      <Poptip placement="right-start" width="250" trigger="hover">
        <div class="provice-wrapper">
          <Checkbox :value="province.checkAll" @click.prevent.native="handleCheckProvince(province)">{{province.label}}</Checkbox>
        </div>
        <div class="city-wrapper" slot="content">
          <Checkbox class="city-item" v-for="(city,childIndex) in province.children" :key="childIndex" :value="city.isCheck" @click.prevent.native="handleCheckCity(province,city)">{{city.label}}</Checkbox>
        </div>
      </Poptip>
      <span class="select-count" v-if="province.childrenCount !== province.isCheckChildrenCount">{{province.isCheckChildrenCount}} / {{province.childrenCount}}</span>
    </div>
  </div>
</template>
<script>
import areaData from './area-producer';

export default {
  name: 'area-multi-selection',
  props: {
    AreaData: Array
  },
  data() {
    return {
      data: [],
      rstAreaData: []
    };
  },
  mounted() {
    this.data = areaData.get2LevelArea();
    if (this.AreaData.length !== 0 && this.AreaData.length !== 397) {
      for (let j in this.data) {
        let curValue = this.data[j].value + '';
        if (this.AreaData.indexOf(curValue) < 0) {
          this.data[j].checkAll = false;
        }
        let count = 0;
        for (let k in this.data[j].children) {
          let curChildValue = this.data[j].children[k].value + '';
          if (this.AreaData.indexOf(curChildValue) < 0) {
            this.data[j].children[k].isCheck = false;
          } else {
            ++count;
          }
        }
        this.data[j].isCheckChildrenCount = count;
      }
    }
  },
  methods: {
    handleCheckProvince(param) {
      if (!param.checkAll) {
        // children的isCheck全部设为true
        for (let i in param.children) {
          param.children[i].isCheck = true;
        }
        param.isCheckChildrenCount = param.childrenCount;
      } else {
        for (let i in param.children) {
          param.children[i].isCheck = false;
        }
        param.isCheckChildrenCount = 0;
      }
      param.checkAll = !param.checkAll;
      this.emitData();
    },
    handleCheckCity(parent, param) {
      param.isCheck = !param.isCheck;
      let childrenLen = parent.children.length;
      let count = 0;
      for (let i in parent.children) {
        if (parent.children[i].isCheck === true) {
          ++count;
        }
      }
      if (count === childrenLen) {
        parent.checkAll = true;
      } else {
        parent.checkAll = false;
      }
      parent.isCheckChildrenCount = count;
      this.emitData();
    },
    emitData() {
      let vm = this;
      let rstAreaData = {
        index: [],
        name: []
      };
      for (let j in vm.data) {
        if (vm.data[j].checkAll === true) {
          rstAreaData.index.push(vm.data[j].value);
          rstAreaData.name.push(vm.data[j].label);
        }
        for (let k in vm.data[j].children) {
          if (vm.data[j].children[k].isCheck === true) {
            rstAreaData.index.push(vm.data[j].children[k].value);
            rstAreaData.name.push(vm.data[j].children[k].label);
          }
        }
      }
      this.$emit('areaData', rstAreaData);
    }
  }
};
</script>
<style lang="stylus">
.clearfix
  zoom 1

  &:after
    content ' '
    display block
    height 0
    clear both
    overflow hidden

.region-wrapper
  float left
  margin-bottom 15px
  width 25%

  .city-pop
    width 200px

  .city-wrapper
    overflow hidden

    .city-item
      float left
      margin 5px 0 5px 10px
      width 80px

  .select-count
    color #2d8cf0
</style>
