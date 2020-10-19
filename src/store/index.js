import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    zoom: 0,
    dataSet: {},
    searchBeginTime:  4765100399000,
    searchEndTime: 0
  },
  mutations: {
    plusClick(state) {
      state.zoom = state.zoom + 3
    },
    minusClick(state) {
      state.zoom = state.zoom - 3
    },
    mutateDataSet(state, payload) {
      state.dataSet = payload;
    },
    changeBeginTime(state, payload) {
      if (payload.newtime < state.searchBeginTime){
        state.searchBeginTime = payload.newtime;
      }
    },
    changeEndTime(state, payload) {
      if (payload.newtime > state.searchEndTime){
        state.searchEndTime = payload.newtime;
      }
    }
  },
  actions: {

  },
  getters: {
    getStateDataSet: (state) => state.dataSet,
  },
  modules: {
  }
})
