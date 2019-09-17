<template>
  <div id='leftpanle'>
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
    return { }
  }
}

</script>
<style lang="less">
@import url('../../style/Panle');

</style>
