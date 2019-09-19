/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 11:17:29
 * @LastEditTime: 2019-08-09 17:16:19
 * @LastEditors: daiyujie
 */
import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Main',
    component: Main
  }]
})
