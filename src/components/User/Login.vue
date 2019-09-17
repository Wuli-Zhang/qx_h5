<template>
  <div class="user-login" :style="isLogin">
    <div class='user-login-item'>
      <img class="user-login-item-icon" src="./../../assets/username.png"/>
      <input v-model="user_name" placeholder="请输入用户名" />
    </div>
    <div class='user-login-item'>
      <img class="user-login-item-icon" src="./../../assets/password.png"/>
      <input type="password" v-model="user_pwd" placeholder="请输入密码" />
    </div>
    <div class='user-login-item'>
      <img class="user-login-item-icon" src="./../../assets/checkcode.png"/>
      <input v-model="check_code" placeholder="请输入验证码" />
      <div class="check-code" @click="getCode">
        <img class="code-image" :src="code_url" alt="验证码" />
      </div>
    </div>
    <div class="user-login-item user-login-operation">
      <div class="remember">
        <Checkbox v-model="remember_pwd">记住密码</Checkbox>
      </div>
      <div class="forget">忘记密码？</div>
    </div>
    <button class="login-btn" @click="login">立即登录</button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { setLocalStore, getLocalStore, removeLocalStore } from './../../store/local'
import {compileStr, uncompileStr} from './../../util/data'

export default {
  props: [],
  data () {
    return {
      show_login: false,
      user_name: '',
      user_pwd: '',
      check_code: '',
      remember_pwd: false,
      code_url: ''
    }
  },
  mounted () {
    this.getCode()
    const local_user_name = getLocalStore('user_name_')
    const local_user_pwd = getLocalStore('user_pwd')
    const is_remember = getLocalStore('remember_pwd')
    if (is_remember && local_user_name && local_user_pwd) {
      this.remember_pwd = true
      this.user_name = local_user_name
      this.user_pwd = uncompileStr(local_user_pwd)
    } else {
      this.rember_pwd = false
      removeLocalStore('user_name_')
      removeLocalStore('user_pwd')
    }
  },
  computed: {
    isLogin () {
      if (this.show_login) {
        return ''
      } else {
        return 'display:none;'
      }
    }
  },
  watch: {
    remember_pwd: (isremember) => {
      if (isremember) {
        setLocalStore('remember_pwd', true)
      } else {
        setLocalStore('remember_pwd', false)
        removeLocalStore('user_name_')
        removeLocalStore('user_pwd')
      }
    }
  },
  methods: {
    ...mapGetters(['getAjax']),
    show () {
      this.show_login = true
      this.getCode()
    },
    validateUser () {
      if (!/^(\w){2,20}$/.test(this.user_name)) {
        this.$Message.error('用户名长度在2到20个字符之内')
        return false
      }
      if (!/^(\w){6,20}$/.test(this.user_pwd)) {
        this.$Message.error('密码长度在6到20个字符之内')
        return false
      }
      if (!this.check_code) {
        this.$Message.error('请输入验证码')
        return false
      }
      return true
    },
    login () {
      if (this.validateUser()) {
        const Ajax = this.getAjax()
        let _this = this
        Ajax.login({
          account: _this.user_name,
          password: _this.user_pwd,
          captcha: _this.check_code,
          success: data => {
            this.$Message.success('登陆成功')
            if (this.remember_pwd) {
              setLocalStore('user_name_', this.user_name)
              setLocalStore('user_pwd', compileStr(this.user_pwd))
            }
            _this.$store.commit('setUserInfo', data)
            _this.cancel()
          },
          failure: data => {
            this.$Message.error('登陆失败,请检查输入是否正确。')
          }
        })
      }
    },
    getCode () {
      // 获取验证码
      const Ajax = this.getAjax()
      this.code_url = Ajax.getCaptcha()
    },
    cancel () {
      if (!this.remember_pwd) {
        this.user_name = ''
        this.user_pwd = ''
      }
      this.check_code = ''
      this.show_login = false
    }
  }
}

</script>
<style>
</style>
