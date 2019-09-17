<template>
  <div id="main-map"></div>
</template>

<script>
import seie3d from '../store/seie3d'
export default {
  name: 'Main',
  data () {
    return {
      activeWk: null
    }
  },
  methods: {
    initMap () {
      seie3d.openWorkspace(g_config.activeWk, wk => {
        this.activeWk = wk
      })
    },
    selectBBox () {
      return new Promise((resolve, reject) => {
        if (!this.activeWk) {
          reject('工作空间尚未准备好。')
          return
        }
        this.activeWk.toolmgr.active({
          mode: 'polygon',
          onMeasureEnd: function (data) {
            resolve(
              data.positions.map(function (dkr3) {
                var carti = Seie3d.Caculate.dkr2latlon(dkr3)
                return {
                  y: carti.lat,
                  x: carti.lon
                }
              })
            )
          },
          modeOptions: {
            followSurface: true
          }
        })
      })
    },
    clearSelect () {
      if (!this.activeWk) {
        return
      }
      this.activeWk.toolmgr.clear()
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
