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
            <div class="toolbar-box-show_act" @click.stop="handleItemClick(item.active_type,i.show_src)">
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
import { mapGetters } from 'vuex'
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
          title: '矩形'
        }, {
          show_src: require('./../../assets/polygon.png'),
          title: '多边形'
        }]
      }, {
        show_src: require('./../../assets/length.png'),
        title: '测量',
        active_type: 'measure',
        children: [{
          show_src: require('./../../assets/area.png'),
          title: '测面'
        }, {
          show_src: require('./../../assets/length.png'),
          title: '测距'
        }]
      }, {
        show_src: require('./../../assets/cut-rectangle.png'),
        title: '剪切',
        active_type: 'snap',
        children: [{
          show_src: require('./../../assets/cut-rectangle.png'),
          title: '矩形'
        }, {
          show_src: require('./../../assets/cut-polygon.png'),
          title: '多边形'
        }]
      }, {
        show_src: require('./../../assets/point.png'),
        title: '点击',
        active_type: 'point',
        children: []
      }]
    }
  },
  methods: {
    ...mapGetters(['getActiveWorkspace']),
    clickItemOut (e) {
      // 点击元素之外隐藏
      document.querySelectorAll('.toolbar-minbox').forEach(item => {
        item.style.display = 'none'
      })
    },
    zoom (inorout, param) {
      const wk = this.getActiveWorkspace()
      if (wk && inorout && wk[inorout] && typeof wk[inorout] === 'function') {
        wk[inorout](param)
      }
    },
    handleItemClick (index, show_src) {
      Array.from(document.querySelectorAll('.toolbar-minbox')).forEach(item => {
        item.style.display = 'none'
      })
      if (typeof index === 'number') {
        if (this.icons[index].children.length > 0) {
          document.querySelectorAll('.toolbar-minbox')[index].style.display = 'flex'
        } else {
          // 点击自己
          this.clickItself(show_src)
        }
        return false
      } else {
        switch (index) {
          case 'draw':
            this.draw(show_src)
            break
          case 'snap':
            this.snap(show_src)
            break
          case 'measure':
            this.measure(show_src)
            break
          default:
            break
        }
        // 换图标
        this.icons.forEach(item => {
          if (item.active_type == index) {
            item.show_src = show_src
            return
          };
        })
      }
    },
    clickItself (item_type) {
      console.log('clickItself点击自己', item_type)
    },
    draw (type) {
      console.log('画', type)
      this.$parent.query()
    },
    snap (type) {
      console.log('切图', type)
    },
    measure (type) {
      console.log('测距', type)
    }

  }
}

</script>
<style lang="less">
@import url('../../style/Toolbar');

</style>
