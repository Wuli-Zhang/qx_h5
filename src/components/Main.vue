<template>
  <div>
    <map-view ref="map_view"></map-view>
    <!-- <User/> -->
    <Toolbar @draw='query()'/>
    <Leftpanle/>
  </div>
</template>
<script>
import MapView from './MapView'
import User from './User/User'
import Toolbar from './Toolbar/Toolbar'
import Leftpanle from './Panle/Leftpanle'
import { mapGetters } from 'vuex'
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
    query (attr) {
      console.log(attr)
      const self = this
      this.$refs.map_view.selectBBox().then(rect => {
        const params = {
          query: {
            start: 0,
            projection: 'EPSG:4326',
            polygon: rect
          },
          image_filter: {
            // product_type: 1001, // --产品
            // start_time: '2018-09-27 18:12:33',
            // end_time: '2018-09-27 18:12:33',
            // resolution: 0, // --分辨率
            // sat_id: -1 // --卫星id
            // +++传感器
          }
        }
        self.$store.commit('setRect', rect)
        const Ajax = self.getAjax()
        $.ajax({
          url: `${Ajax.config.host}${Ajax.config.serviceUrl}/api/layer?mgt_token=${Ajax.config.mgt_token}`,
          success: function (data) {
            self.$store.commit('setImages', data.result)
          }
        })
        // Ajax.ImageByPolygon(
        //   params,
        //   data => {
        //     self.$store.commit('setImages', data)
        //   },
        //   e => {
        //     console.error(e)
        //   }
        // )
      })
    }
  },
  mounted () {
  }
}

</script>
<style lang="less">
@import url("../style/Main.less");

</style>
