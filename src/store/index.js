/*
 * @Date: 2019-08-09 17:22:09
 * @LastEditors: daiyujie
 * @LastEditTime: 2019-08-09 17:30:33
 * @Author: daiyujie
 * @Description: file content
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getter'
import actions from './actions'
import seie3d from './seie3d'

Vue.use(Vuex)

window.s3d = seie3d

seie3d.Ajax.setConfig({
  mgt_token: '7be49279ea411a18dd6aface64ede5a2'
})

export default new Vuex.Store({
  state: {
    seie3d: seie3d,
    user_info: { // 用户信息
      user_id: null,
      user_name: null,
      user_token: null,
      user_login: null
    },
    images: {
      item_list: []
    },
    rect: null,
    imagesAttr: {
      product_id: '',
      sat_id: '',
      sensor_id: ''
    }
  },
  getters,
  actions,
  mutations
})
