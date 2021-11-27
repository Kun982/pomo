<template>
  <div id="music">
    <ul class="audio">
      <li v-for="item in items" :key="item.name">
        <div>{{item.name}}</div>
        <audio controls muted :src="'./alarms/'+item.file"></audio>
        <el-switch v-model="item.value" active-color="#13ce66" inactive-color="#909399" @change="turnSwitch(item)"></el-switch>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          name: '鈴聲一',
          file: 'alarm1.mp3',
          value: false
        },
        {
          name: '鈴聲二',
          file: 'alarm2.mp3',
          value: false
        },
        {
          name: '鈴聲三',
          file: 'ya.mp3',
          value: false
        }
      ]
    }
  },
  methods: {
    turnSwitch (item) {
      if (item.value) {
        // 關掉其他的按鈕
        this.items.forEach(el => {
          if (el.name !== item.name) {
            el.value = false
          }
        })
        // 將資料送進vuex
        this.$store.commit('setAlarm', item.file)
      } else {
        // 將鈴聲設為預設
        this.items[0].value = true
        this.$store.commit('resetAlarm')
      }
    }
  },
  created () {
    const key = this.$store.state.alarm
    switch (key) {
      case 'alarm1.mp3':
        this.items[0].value = true
        break
      case 'alarm2.mp3':
        this.items[1].value = true
        break
      case 'ya.mp3':
        this.items[2].value = true
        break
      default:
        break
    }
  }
}
</script>
