<template>
  <div id='user'  v-clickoutside="func">
    <div class="user-logo" @click="showUserInfo">
      <Avatar icon="ios-person" size="large" :style="isLogin" />
    </div>
    <Userinfo ref="panle" />
    <Login ref="login"/>
  </div>
</template>
<script>
import Userinfo from './User-info'
import Login from './Login'
import { getLocalStore } from './../../store/local'

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

  directives: {clickoutside},
  components: {
    Userinfo,
    Login
  },
  data () {
    return {

    }
  },
  mounted () {
    if (getLocalStore && getLocalStore('user_id')) {
      this.$store.commit('setUserInfo', {
        id: getLocalStore('user_id'),
        name: getLocalStore('user_name'),
        user_gender: getLocalStore('user_gender'),
        token: getLocalStore('user_token'),
        user_login: getLocalStore('user_login')
      })
    }
  },
  computed: {
    isLogin () {
      if (this.$store.state.user_info.user_login) {
        return 'background:#6979f8;'
      } else {
        return 'background:#cccccc;'
      }
    }

  },
  methods: {
    func () {
      this.$refs.login.cancel()
      this.$refs.panle.cancel()
    },
    showUserInfo () {
      if (this.$store.state.user_info.user_login) {
        this.$refs.panle.show()
      } else {
        this.$refs.login.show()
      }
    }
  }
}

</script>
<style lang="less">
@import url('../../style/User');

</style>
