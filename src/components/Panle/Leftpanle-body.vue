<template>
  <div class="leftpanle-body">
    <div class="select-type">
      <Row>
        <Col span="8" style="text-align:center;border-right:1px solid #C6CAE0">
        <Dropdown trigger="click" @on-click="clickProductItem" class="first-drop">
          <a href="javascript:void(0)" class="droptitle" type="primary">
            <img src="./../../assets/product.png" alt="产品" />
            <span>产品
              <Icon type="ios-arrow-down" /></span>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem class="dropitemtitle">
              <Row>
                <Col span="8">名称</Col>
                <Col span="8">编码</Col>
                <Col span="8">全称</Col>
              </Row>
            </DropdownItem>
            <vue-scroll>
              <div style="display:inline-block;height:565px;width:100%;">
                <DropdownItem v-for="(item,index) in product_list" :name="item.name" :key="index">
                  <Row>
                    <Col span="8">{{item.name}}</Col>
                    <Col span="8">{{item.code}}</Col>
                    <Col span="8">{{item.description}}</Col>
                  </Row>
                </DropdownItem>
              </div>
            </vue-scroll>
          </DropdownMenu>
        </Dropdown>
        </Col>
        <Col span="8" style="text-align:center;border-right:1px solid #C6CAE0">
        <Dropdown trigger="click" @on-click="clickSatelliteItem">
          <a href="javascript:void(0)" class="droptitle">
            <img src="./../../assets/satellite.png" alt="产品" />
            <span>卫星
              <Icon type="ios-arrow-down" /></span>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem class="dropitemtitle">隶属卫星</DropdownItem>
            <DropdownItem v-for="(item,index) in satellite_list" :name="item" :key="index">{{item.name}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </Col>
        <Col span="8" style="text-align:center;">
        <Dropdown trigger="click" @on-click="clickSensorItem">
          <a href="javascript:void(0)" class="droptitle">
            <img src="./../../assets/sensor.png" alt="产品" />
            <span>传感器
              <Icon type="ios-arrow-down" /></span>
          </a>
          <DropdownMenu slot="list" v-show='sensor_list.length>0'>
            <DropdownItem class="dropitemtitle">字符方式标识</DropdownItem>
            <DropdownItem v-for="(item,index) in sensor_list" :name="item" :key="index">{{item.name}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </Col>
      </Row>
    </div>
    <div class="main-list">
      <Checkbox class="main-list-checkbox" :indeterminate="checkbox.indeterminate" :value="checkbox.checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
      <CheckboxGroup v-model="checkbox.checkAllGroup" @on-change="checkAllGroupChange">
        <vue-scroll>
          <div v-for="(item,index) in main_list" :key="index" class="main-list-item">
            <!-- <img :src="item.image_url" /> -->
            <div class="main-list-item-describe">
              <h3 :title='item.name'>{{item.name}}</h3>
              <h4 :title='item.projection'>{{item.projection}}</h4>
              <h4 :title='item.sat_id'>{{item.sat_id}}</h4>
            </div>
            <div class="main-list-item-checkbox">
              <Checkbox :label="item">选择</Checkbox>
            </div>
          </div>
        </vue-scroll>
      </CheckboxGroup>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Leftpanle-body',
  data () {
    return {
      product_list: [],
      satellite_list: [],
      sensor_list: [],
      checkbox: {
        indeterminate: false,
        checkAll: false,
        checkAllGroup: []
      }
    }
  },
  computed: {
    main_list () {
      return this.$store.state.images.item_list
    }
  },
  methods: {
    ...mapGetters(['getAjax']),
    clickProductItem (name) {
      console.log(name)
    },
    clickSatelliteItem (item) {
      const _this = this
      const Ajax = this.getAjax()
      Ajax.querySensor({ sat_id: item.data_id }, (data) => {
        _this.sensor_list = data.item_list
      })
      this.$store.commit('setImagesAttr', { sat_id: item.data_id })
      this.ajax()
    },
    clickSensorItem (item) {
      console.log(item)
      this.$store.commit('setImagesAttr', { sensor_id: item.data_id })
      this.ajax()
    },

    handleCheckAll () {
      let allchecked = []
      this.main_list.forEach(item => {
        allchecked.push(item)
      })
      if (this.checkbox.indeterminate) {
        this.checkbox.checkAll = false
      } else {
        this.checkbox.checkAll = !this.checkbox.checkAll
      }
      this.checkbox.indeterminate = false

      if (this.checkbox.checkAll) {
        this.checkbox.checkAllGroup = allchecked
      } else {
        this.checkbox.checkAllGroup = []
      }
    },
    // 点击单个
    checkAllGroupChange (data) {
      if (data.length === this.main_list.length) {
        this.checkbox.indeterminate = false
        this.checkbox.checkAll = true
      } else if (data.length > 0) {
        this.checkbox.indeterminate = true
        this.checkbox.checkAll = false
      } else {
        this.checkbox.indeterminate = false
        this.checkbox.checkAll = false
      }

      this.$parent.clickItem(data)
    },
    ajax (attr) {
      const _this = this
      // const params = {
      //   query: {
      //     start: 0,
      //     projection: 'EPSG:4326',
      //     polygon: this.$store.state.rect
      //   },
      //   image_filter: {
      //     product_type: this.$store.state.imagesAttr.product_id, // --产品
      //     // start_time: '2018-09-27 18:12:33',
      //     // end_time: '2018-09-27 18:12:33',
      //     // resolution: 0, // --分辨率
      //     sat_id: this.$store.state.imagesAttr.sat_id, // --卫星id
      //     sensor: this.$store.state.imagesAttr.sensor_id // +++传感器
      //   }
      // }
      const Ajax = this.getAjax()
      $.ajax({
        url: `${Ajax.config.host}${Ajax.config.serviceUrl}/api/layer?mgt_token=${Ajax.config.mgt_token}`,
        success: function (data) {
          self.$store.commit('setImages', data.result)
        }
      })
    }
  },
  mounted () {
    const _this = this
    const Ajax = this.getAjax()
    $.ajax({
      url: `${Ajax.config.host}${Ajax.config.serviceUrl}/api/image_type?mgt_token=${Ajax.config.mgt_token}`,
      type: 'GET',
      success: function (data) {
        _this.product_list = data.result.item_list
      }
    })
    Ajax.querySatellite('', (data) => {
      _this.satellite_list = data.item_list
    })
  }

}

</script>
<style lang="less">
@import url('../../style/Panle');

</style>
