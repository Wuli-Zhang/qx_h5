<template>
  <div class='leftpanle-top'>
    <div class="leftpanle-title">
      <img src="./../../assets/date.png" alt="日期"/>
      <span>{{choose_time}}~{{today}}</span>
    </div>
    <Select class="select-data" v-model="choose_time" size="small">
      <Option v-for="item in times" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
  </div>
</template>
<script>
import {getPreviousDate} from '../../util/data'
export default {
  name: 'Leftpanle-top',
  components: {},
  data () {
    let today = getPreviousDate()
    let yesterday = getPreviousDate(7)
    let beforethreedays = getPreviousDate(30)
    return {
      today: today,
      choose_time: today,
      times: [{
        value: today,
        label: '今天'
      }, {
        value: yesterday,
        label: '前7天'
      }, {
        value: beforethreedays,
        label: '前30天'
      }]
    }
  }
}

</script>
<style lang="less">
@import url('../../style/Panle');

</style>
