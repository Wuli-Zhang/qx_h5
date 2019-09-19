<template>
  <div id='toolbar'>
    <div class="toolbar-box" v-for="(item,index) in icons" :key="index" v-clickoutside="clickItemOut">
      <Tooltip placement="top" :content="item.title" :delay="500">
        <div class="toolbar-box-show_act" @click.stop="handleItemClick(index,item.active_type)">
          <img :src="item.show_src" :alt="item.title" />
        </div>
      </Tooltip>
      <div class="toolbar-minbox">
        <div class="toolbar-item" v-for="(i,key) in item.children" :key="key">
          <Tooltip placement="top" :content="i.title" :delay="500">
            <div class="toolbar-box-show_act" @click.stop="handleItemClick(item.active_type,i.item_type)">
              <img :src="i.show_src" :alt="i.title" />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
    <div class="toolbar-zoom">
      <div>
        <img @click="zoom('zoomIn')" src="./../../assets/zoom-in.png" alt="" />
      </div>
      <div>
        <img @click="zoom('zoomOut')" src="./../../assets/zoom-out.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
const clickoutside = {
  bind (el, binding, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
export default {
  directives: { clickoutside },
  components: {},
  data () {
    return {
      icons: [{
        show_src: require('./../../assets/polygon.png'),
        title: '画图',
        active_type: 'draw',
        children: [{
          show_src: require('./../../assets/rectangle.png'),
          title: '矩形',
          item_type: 'rectangle'
        }, {
          show_src: require('./../../assets/polygon.png'),
          title: '多边形',
          item_type: 'polygon'
        }]
      }, {
        show_src: require('./../../assets/length.png'),
        title: '测量',
        active_type: 'measure',
        children: [{
          show_src: require('./../../assets/area.png'),
          title: '测面',
          item_type: 'area'
        }, {
          show_src: require('./../../assets/length.png'),
          title: '测距',
          item_type: 'surface_distance'
        }]
      // }, {
      //   show_src: require('./../../assets/cut-rectangle.png'),
      //   title: '剪切',
      //   active_type: 'snap',
      //   children: [{
      //     show_src: require('./../../assets/cut-rectangle.png'),
      //     title: '矩形',
      //     item_type: 'rectangle'
      //   }, {
      //     show_src: require('./../../assets/cut-polygon.png'),
      //     title: '多边形',
      //     item_type: 'polygon'
      //   }]
      }, {
        show_src: require('./../../assets/delete.png'),
        title: '清除',
        active_type: 'clear',
        children: []
      // }, {
      //   show_src: require('./../../assets/point.png'),
      //   title: '点击',
      //   active_type: 'point',
      //   children: []
      }]
    }
  },
  methods: {
    clickItemOut (e) {
      // 点击元素之外隐藏
      document.querySelectorAll('.toolbar-minbox').forEach(item => {
        item.style.display = 'none'
      })
    },
    zoom (inorout) {
      this.$parent.changeZoom(inorout)
    },
    handleItemClick (index, item_type) {
      Array.from(document.querySelectorAll('.toolbar-minbox')).forEach(item => {
        item.style.display = 'none'
      })
      if (typeof index === 'number') {
        if (this.icons[index].children.length > 0) {
          document.querySelectorAll('.toolbar-minbox')[index].style.display = 'flex'
        } else {
          // 点击自己
          this.clickItself(item_type)
        }
        return false
      } else {
        switch (index) {
          case 'draw':
            this.draw(item_type)
            break
          case 'snap':
            this.snap(item_type)
            break
          case 'measure':
            this.measure(item_type)
            break
          default:
            break
        }
        // 换图标
        this.icons.forEach(item => {
          if (item.active_type === index) {
            item.children.forEach(i => {
              if (i.item_type === item_type) {
                item.show_src = i.show_src
              }
            })
          };
        })
      }
    },
    clickItself (item_type) {
      switch (item_type) {
        case 'clear':
          this.$parent.clear()
          break
        case 'point':
          break
        default:
          break
      }
    },
    draw (type) {
      this.$parent.query(type)
    },
    // snap (type) {
    //   console.log('切图', type)
    // },
    measure (type) {
      console.log('测距', type)
      this.$parent.measure(type)
    }

  }
}

</script>
<style lang="less">
@import url('../../style/Toolbar');

</style>
