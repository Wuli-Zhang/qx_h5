<template>
  <div class="user-panle" :style="isClicked">
    <div class="user-panle-info">
      <img :src="user_info.user_img" alt="" />
      <div>
        <div class="user-panle-info-title">名字</div>
        <div class="user-panle-info-content">{{user_info.username}}</div>
      </div>
      <div>
        <div class="user-panle-info-title">性别</div>
        <div class="user-panle-info-content">{{user_info.user_gender}}</div>
      </div>
      <div>
        <div class="user-panle-info-title">邮箱</div>
        <div class="user-panle-info-content">{{user_info.email}}</div>
      </div>
    </div>
    <div class="user-panle-table">
      <Table :data="user_panle_table_data" :columns="user_panle_table_columns" size="small" height="193"></Table>
      <div class="user-panle-page">
        <Page :total="30" :page-size="4" :current="1" @on-change="changePage" size="small"></Page>
      </div>
    </div>
    <div class="user-panle-footer">
      <Checkbox v-model="choose_all">全选</Checkbox>
      <div class="user-panle-footer-action">
        <img @click="deletecutAll" src="./../../assets/delete.png" alt="删除" />
        <img @click="downloadAll" src="./../../assets/download.png" alt="下载">
      </div>
      </Row>
    </div>
  </div>
</template>
<script>
import { getLocalStore } from './../../store/local'

export default {
  components: {},
  data () {
    return {
      show_panle: false,
      user_info: {
        username: '',
        user_gender: '',
        email: '',
        user_img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4101075430,1241384165&fm=58&bpow=1280&bpoh=1280'
      },
      user_panle_table_columns: [{
        title: '文件名',
        key: 'filename',
        align: 'center'
      }, {
        title: '剪裁日期',
        key: 'cutdate',
        align: 'center'
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('img', {
              class: 'table_cell_icon',
              attrs: {
                src: require('./../../assets/delete.png')
              },
              style: {
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.deletecut(params)
                }
              }
            }),
            h('img', {
              class: 'table_cell_icon',
              attrs: {
                src: require('./../../assets/download.png')
              },
              style: {
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.download(params)
                }
              }
            }, '下载')
          ])
        }
      }],
      user_panle_table_data: [{
        filename: '剪裁文件名1',
        cutdate: '2019/08/08 09:30:00'
      }, {
        filename: '剪裁文件名2',
        cutdate: '2019/08/08 09:30:00'
      }, {
        filename: '剪裁文件名3',
        cutdate: '2019/08/08 09:30:00'
      }, {
        filename: '剪裁文件名4',
        cutdate: '2019/08/08 09:30:00'
      }],
      choose_all: false
    }
  },
  mounted () {
  },
  computed: {
    isClicked () {
      if (this.show_panle) {
        return ''
      } else {
        return 'display:none;'
      }
    }
  },
  watch: {
    show_panle: function (isshow) {
      if (isshow) {
        console.log(isshow)
        this.user_info.username = getLocalStore('user_name')
        this.user_info.user_gender = getLocalStore('user_gender') === 1 ? '男' : '女'
        this.user_info.email = getLocalStore('email') || ''
        this.user_info.user_img = 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4101075430,1241384165&fm=58&bpow=1280&bpoh=1280'
      }
    }
  },
  methods: {
    show () {
      this.show_panle = true
    },
    deletecut (params) {
      console.log('单独删除')
      console.log(params)
    },
    deletecutAll () {
      if (this.choose_all) {
        console.log('全选删除')
      }
    },
    download (params) {
      console.log('单独下载')
      console.log(params)
    },
    downloadAll () {
      if (this.choose_all) {
        console.log('全选下载')
      }
    },
    changePage (page) {
      console.log('当前第' + page + '页')
      this.choose_all = false
    },
    cancel () {
      this.show_panle = false
    }
  }
}

</script>
<style lang="less">
@import url('../../style/User');

</style>
