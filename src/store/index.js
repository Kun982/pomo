import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasData: false,
    startSet: '',
    endSet: '',
    setMin: '',
    alarm: 'alarm1.mp3'
  },
  mutations: {
    setAlarm (state, payload) {
      state.alarm = payload
    },
    setTime (state, payload) {
      state.startSet = payload.startTime
      state.endSet = payload.endTime
      state.setMin = payload.pickTime
      state.hasData = true
    },
    resetTime (state) {
      state.startSet = 0
      state.endSet = 0
      state.setMin = 0
      state.hasData = false
    },
    resetAlarm (state) {
      state.alarm = 'alarm1.mp3'
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
