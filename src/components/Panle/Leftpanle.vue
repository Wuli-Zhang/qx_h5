<template>
  <div id='leftpanle' v-show='hasList'>
    <Leftpanletop/>
    <Leftpanlebody/>
  </div>
</template>
<script>
import Leftpanletop from './Leftpanle-top'
import Leftpanlebody from './Leftpanle-body'
export default {
  components: {
    Leftpanletop,
    Leftpanlebody
  },
  data () {
    return {
    }
  },
  computed: {
    hasList () {
      if (this.$store.state.rect) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    clickItem (data) {
      this.$parent.selectLayerurl(data)
    }
  }
}

</script>
<style lang="less">
@import url('../../style/Panle');

</style>
