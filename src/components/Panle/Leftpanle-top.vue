<template>
  <div class='leftpanle-top'>
    <div class="leftpanle-title">
      <img src="./../../assets/date.png" alt="日期"/>
      <span>{{choose_time}}~{{format_current_time}}</span>
    </div>
    <Select class="select-data" v-model="choose_time" size="small" @on-change="changeTime">
      <Option v-for="item in times" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
  </div>
</template>
<script>
import {getPreviousDate} from '../../util/data'
import { mapGetters } from 'vuex'
export default {
  name: 'Leftpanle-top',
  components: {},
  data () {
    let today = getPreviousDate()
    let yesterday = getPreviousDate(7)
    let beforethreedays = getPreviousDate(30)
    return {
      current_time: new Date(),
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
  },
  computed: {
    format_current_time () {
      let Y = this.current_time.getFullYear() + '-'
      let M = (this.current_time.getMonth() + 1 < 10 ? '0' + (this.current_time.getMonth() + 1) : this.current_time.getMonth() + 1) + '-'
      let D = (this.current_time.getDate() < 10 ? '0' + (this.current_time.getDate()) : this.current_time.getDate()) + '\xa0'
      let H = (this.current_time.getHours() < 10 ? '0' + (this.current_time.getHours()) : this.current_time.getHours()) + ':'
      let MM = (this.current_time.getMinutes() < 10 ? '0' + (this.current_time.getMinutes()) : this.current_time.getMinutes()) + ':'
      let S = (this.current_time.getSeconds() < 10 ? '0' + (this.current_time.getSeconds()) : this.current_time.getSeconds())
      return Y + M + D + H + MM + S
    },
    product_id () {
      return this.$store.state.imagesAttr.product_id
    },
    sat_id () {
      return this.$store.state.imagesAttr.sat_id
    },
    sensor_id () {
      return this.$store.state.imagesAttr.sensor_id
    },
    rect () {
      return this.$store.state.rect
    }
  },
  methods: {
    ...mapGetters(['getAjax']),
    changeTime (value) {
      let _this = this
      const Ajax = _this.getAjax()
      let params = {
        start_time: value,
        end_time: this.format_current_time
      }
      $.ajax({
        url: `${Ajax.config.host}${Ajax.config.serviceUrl}/api/layer?mgt_token=${Ajax.config.mgt_token}&start_time=${params.start_time}${params.end_time ? '&end_time=' + params.end_time : ''}
        ${this.rect ? '&bbox=' + this.rect : ''}${this.sat_id ? '&sat_id=' + this.sat_id : ''}${this.product_id ? '&image_type=' + this.product_id : ''}
        ${this.sensor_id ? '&sensor_id=' + this.sensor_id : ''}`
      })
      this.$store.commit('setTime', params)
    }
  },
  mounted () {
    let _this = this
    this.timer = setInterval(() => {
      let params = {
        start_time: _this.choose_time,
        end_time: _this.format_current_time
      }
      _this.current_time = new Date()
      _this.$store.commit('setTime', params)
    }, 1000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}

</script>
<style lang="less">
@import url('../../style/Panle');

</style>
