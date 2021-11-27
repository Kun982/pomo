<template>
  <div id="clock" class="progressBar">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <radial-progress-bar
      :diameter="250"
      :completed-steps="completedSteps"
      :total-steps="totalSteps"
      :start-color="startColor"
      :inner-stroke-color="innerStrokeColor"
    >
      <div>現在時間</div>
      <h2>{{hourNow}}:{{minNow}}:{{secNow}}</h2>
    </radial-progress-bar> -->
    <p class="time">{{ hourNow }}:{{ minNow }}:{{ secNow }}</p>
  </div>
</template>

<script>
// import RadialProgressBar from 'vue-radial-progress'
export default {
  name: 'progressBar',
  props: {
    msg: String
  },
  data () {
    return {
      // completedSteps: 3,
      // totalSteps: 10,
      // startColor: '#A2FF00',
      // innerStrokeColor: '#151932',
      hourNow: '',
      minNow: '',
      secNow: ''
    }
  },
  methods: {
    getStartHour () {
      const startHour = this.$store.state.startSet
      if (startHour) {
        const getstartHour = parseInt(startHour.slice(0, 2))
        return getstartHour
      } else {
        return null
      }
    },
    getEndHour () {
      const endHour = this.$store.state.endSet
      if (endHour) {
        const getendHour = parseInt(endHour.slice(0, 2))
        return getendHour
      } else {
        return null
      }
    },
    getMin () {
      const min = this.$store.state.setMin
      if (min) {
        const getmin = min.slice(3)
        return parseInt(getmin)
      } else {
        return null
      }
    },
    getAlarm () {
      return this.$store.state.alarm
    },
    time () {
      // 得到當下時間
      const nowDate = new Date()
      const hour = nowDate.getHours()
      const min = nowDate.getMinutes()
      const sec = nowDate.getSeconds()
      this.hourNow = hour
      this.minNow = min
      this.secNow = sec
      const self = this
      if (this.secNow === 0) {
        self.timeMinCheck()
      }
    },
    // 呼叫計時器
    audioPlay () {
      const audio = new Audio()
      const self = this
      audio.src = './alarms/' + self.getAlarm()
      audio.play()
    },
    // 定時器函數(每秒拿一次時間)
    nowTimes () {
      const self = this
      setInterval(function () {
        self.time()
      }, 1000)
    },
    // 每分鐘判斷一次時間到了沒
    timeMinCheck () {
      const self = this
      // 判斷時間到了沒,到了就呼叫計時器
      if (this.minNow === self.getMin()) {
        if (this.hourNow >= self.getStartHour() && this.hourNow < self.getEndHour()) {
          self.audioPlay()
        }
      }
    }
  },
  // 創建完成時
  created () {
    this.getAlarm()
    this.getStartHour()
    this.getEndHour()
    this.getMin()
  },
  // 掛載完成時
  mounted () {
    // console.log('掛載完成時')
    this.nowTimes()
  },
  components: {
    // RadialProgressBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
