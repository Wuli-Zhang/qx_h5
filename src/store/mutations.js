import {
  setLocalStore,
  getLocalStore,
  clear
} from './local'

export default {
  /**
   * 设置用户信息
   * @param {Vue.State} state
   * @param {Object} params
   */
  setUserInfo (state, params) {
    if (params) {
      state.user_info = {
        user_id: params.id,
        user_name: params.name,
        token: params.token,
        user_gender: params.gender,
        user_login: true
      }
      setLocalStore('user_id', state.user_info.user_id)
      setLocalStore('user_name', state.user_info.user_name)
      setLocalStore('user_gender', state.user_info.user_gender)
      setLocalStore('token', state.user_info.token)
      setLocalStore('user_login', state.user_info.user_login)
    } else {
      state.user_info = {
        user_id: null,
        user_name: null,
        user_token: null,
        user_login: false
      }
      let pwd = getLocalStore('user_name')
      let user = getLocalStore('user_pwd')
      let rember = getLocalStore('user_login')
      clear()
      setLocalStore('user_name', pwd)
      setLocalStore('user_pwd', user)
      setLocalStore('user_login', rember)
    }
  },
  setImages (state, params) {
    state.images = {
      item_list: params.item_list,
      total_count: params.total_count
    }
  },
  setRect (state, params) {
    state.rect = params
  },
  setImagesAttr (state, params) {
    state.imagesAttr = {
      product_id: params.product_id || state.imagesAttr.product_id,
      sat_id: params.sat_id || state.imagesAttr.sat_id,
      sensor_id: params.sensor_id || state.imagesAttr.sensor_id
    }
  },
  /** 获取开始/结束时间 **/
  setTime (state, params) {
    state.times = {
      start_time: params.start_time,
      end_time: params.end_time
    }
  }

}
