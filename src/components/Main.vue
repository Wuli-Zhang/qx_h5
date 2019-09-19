<template>
  <div>
    <map-view ref="map_view"></map-view>
    <!-- <User/> -->
    <Toolbar/>
    <Leftpanle/>
  </div>
</template>
<script>
import MapView from './MapView'
import User from './User/User'
import Toolbar from './Toolbar/Toolbar'
import Leftpanle from './Panle/Leftpanle'
import { mapGetters } from 'vuex'
import seie3d from '../store/seie3d'
export default {
  components: {
    MapView,
    User,
    Toolbar,
    Leftpanle
  },
  data () {
    return {
      main_list: []
    }
  },
  methods: {
    ...mapGetters(['getAjax']),
    query () {
      const self = this
      this.$refs.map_view.selectBBox().then(rect => {
        self.$store.commit('setRect', rect)
        const Ajax = self.getAjax()
        $.ajax({
          url: `${Ajax.config.host}${Ajax.config.serviceUrl}/api/layer?mgt_token=${Ajax.config.mgt_token}&bbox=${self.$store.state.rect}&start_time=${self.$store.state.times.start_time}&end_time=${self.$store.state.times.end_time}`,
          type: 'GET',
          success: function (data) {
            self.$store.commit('setImages', data.result)
          }
        })
      })
    },
    selectLayerurl (data) {
      const _this = this
      const { serviceUrl, mgt_token} = this.getAjax().config
      if (data.length > 0) {
        this.$refs.map_view.clearSelectLayer()
        data.forEach(item => {
          let url = `${this.$store.state.seie3d.options.serviceHost}${serviceUrl}/wmts/layer/${item.data_id}/${item.data_version}?mgt_token=${mgt_token}`
          _this.$refs.map_view.showSelectLayer(url)
        })
      } else {
        this.$refs.map_view.clearSelectLayer()
      }
    },
    changeZoom (type) {
      this.$refs.map_view.changeZoom(type)
    },
    measure (type) {
      this.$refs.map_view.measure(type)
    },
    clear () {
      this.$refs.map_view.clearDraw()
    }
  },
  mounted () {
  }
}

</script>
<style lang="less">
@import url("../style/Main.less");

</style>
