<template>
  <div id="settings">
    <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <!-- 如果之後有時間可以加上班別的選擇 -->
      <!-- <el-form-item label="班別選擇">
        <el-select v-model="ruleForm.value" placeholder="班別選擇" @change="time(ruleForm.value)">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="起始時間">
        <el-time-select v-model="ruleForm.startTime" :picker-options="{ start: '07:00',step: '01:00',end: '23:00',maxTime: ruleForm.endTime}" placeholder="起始時間">
        </el-time-select>
      </el-form-item>

      <el-form-item label="結束時間">
        <el-time-select v-model="ruleForm.endTime" :picker-options="{ start: '07:00',step: '01:00',end: '23:00',minTime: ruleForm.startTime}" placeholder="結束時間">
        </el-time-select>
      </el-form-item>

      <el-form-item label="選擇時刻">
        <el-time-select v-model="ruleForm.pickTime" :picker-options="{ start: '00:00',step: '00:01',end: '59:00'}" placeholder="選擇時刻">
        </el-time-select>
      </el-form-item>

      <el-form-item class="submitBtn">
          <el-button type="primary" @click="submit(ruleForm)">確定</el-button>
          <el-button type="primary" plain @click="reset(ruleForm)">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- <div style="color:white;text-align:center">{{data}}}</div> -->
  </div>

</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '07:00-15:00',
        label: '早班 07:00-15:00'
      }, {
        value: '15:00-23:00',
        label: '中班 15:00-23:00'
      }, {
        value: '23:00-07:00',
        label: '晚班 23:00-07:00'
      }],
      ruleForm: {
        value: '',
        startTime: '',
        endTime: '',
        pickTime: ''
      }
    }
  },
  computed: {
    data () {
      return this.$store.state
    }
  },
  created () {
    if (this.$store.state.startSet && this.$store.state.endSet) {
      const setValue = this.$store.state.startSet + '-' + this.$store.state.endSet
      this.ruleForm.value = setValue
      this.ruleForm.startTime = this.$store.state.startSet
      this.ruleForm.endTime = this.$store.state.endSet
      this.ruleForm.pickTime = this.$store.state.setMin
    }
  },
  methods: {
    submit (ruleForm) {
      if (ruleForm.startTime === '' || ruleForm.endTime === '' || ruleForm.pickTime === '') {
        this.$message({
          offset: -1,
          message: '請設定完整',
          type: 'warning',
          center: true
        })
      } else {
        this.$store.commit('setTime', ruleForm)
        this.$message({
          offset: -1,
          message: '設定成功!',
          type: 'success',
          center: true
        })
      }
    },
    reset (ruleForm) {
      // 畫面清除
      for (const item in ruleForm) {
        ruleForm[item] = ''
      }
      // 資料清除
      this.$store.commit('resetTime')
    },
    time (value) {
      this.ruleForm.startTime = value.slice(0, 5)
      this.ruleForm.endTime = value.slice(6)
    }
  }

}
</script>
