<template>
  <div id="main-map"></div>
</template>
<script>
import seie3d from '../store/seie3d'
import { mapGetters } from 'vuex'
export default {
  name: 'Main',
  data () {
    return {
      activeWk: null
    }
  },
  methods: {
    ...mapGetters(['getActiveWorkspace']),
    initMap () {
      seie3d.openWorkspace(g_config.activeWk, wk => {
        this.activeWk = wk
      })
    },
    selectBBox () {
      this.clearDraw()
      return new Promise((resolve, reject) => {
        if (!this.activeWk) {
          reject('工作空间尚未准备好。')
          return
        }
        this.activeWk.toolmgr.active({
          mode: 'polygon',
          onMeasureEnd: function (data) {
            var array = data.positions.map(function (dkr3) {
              var carti = Seie3d.Caculate.dkr2latlon(dkr3)
              return {
                y: carti.lat,
                x: carti.lon
              }
            })
            let minx = array[0].x
            let maxx = array[0].x
            let miny = array[0].y
            let maxy = array[0].y
            array.forEach(item => {
              minx = Math.min(minx, item.x)
              maxx = Math.max(maxx, item.x)
              miny = Math.min(miny, item.y)
              maxy = Math.max(maxy, item.y)
            })
            resolve(`${minx},${miny},${maxx},${maxy}`)
          },
          modeOptions: {
            followSurface: true
          }
        })
      })
    },
    clearDraw () {
      if (!this.activeWk) {
        return
      }
      this.activeWk.toolmgr.clear()
      this.$store.commit('setRect', '')
      this.$store.commit('setImagesAttr', {product_id: '', sat_id: '', sensor_id: ''})
      this.$store.commit('setImages', {item_list: []})
    },
    showSelectLayer (url) {
      if (!this.activeWk) {
        return
      }
      let viewer = this.getActiveWorkspace().viewer
      let provider = new Seie3d.$Cesium.WebMapTileServiceImageryProvider({
        url: url,
        layer: 'search',
        format: 'image/png',
        tileMatrixSetID: 'GoogleCRS84Quad',
        tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
        style: '',
        tilingScheme: new Seie3d.$Cesium.GeographicTilingScheme()
      })

      let layer = new Seie3d.$Cesium.ImageryLayer(provider, { })
      viewer.imageryLayers.add(layer)
    },
    clearSelectLayer (fn) {
      let viewer = this.getActiveWorkspace().viewer
      let layers = viewer.imageryLayers._layers
      for (let i = layers.length - 1; i > 0; i--) {
        if (layers[i].imageryProvider._layer === 'search') viewer.imageryLayers.remove(layers[i])
      }
    },
    changeZoom (type, param) {
      const wk = this.getActiveWorkspace()
      if (wk && type && wk[type] && typeof wk[type] === 'function') {
        wk[type](param)
      }
    },
    measure (type) {
      const wk = this.getActiveWorkspace()
      if (wk) {
        wk.beginMeasure(type)
      }
    }
  },
  mounted () {
    this.initMap()
  }
}

</script>
<style>
#main-map {
  width: 100vw;
  height: 100vh;
}

</style>
