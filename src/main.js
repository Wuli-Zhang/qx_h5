import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import Vuescroll from 'vuescroll'
import store from './store'

import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(Vuescroll, {
  ops: {
    bar: {
      background: '#B4B7BE'
    },
    mode: 'native',
    disable: true,
    scrollPanel: {
      scrollingX: false
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store
})
