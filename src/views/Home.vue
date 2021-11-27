<template>
  <div id="home">
    <progressBar msg=""/>
    <p v-if="this.$store.state.hasData">已設定在{{start}}-{{end}},每小時的{{minute}}分會提醒</p>
  </div>
</template>

<script>
// @ is an alias to /src
import progressBar from '@/components/progressBar.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    progressBar
  },
  computed: mapState({
    start: state => state.startSet,
    end: state => state.endSet,
    minute: state => state.setMin
  })
}
</script>
