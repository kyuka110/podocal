import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    zoom: 0,
    dataSet: {},
    searchBeginTime:  4765100399000, //2120-12-31 23:59:59
    searchEndTime: 0,
    paintId: []
  },
  mutations: {
    plusClick(state) {
      state.zoom = state.zoom + 1
    },
    minusClick(state) {
      if (state.zoom > 0) {
        state.zoom = state.zoom - 1
      }
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
    },
    addPaintId(state, payload) {
      state.paintId.push(payload.id);
    }
  },
  actions: {

  },
  getters: {
    returnPaintId(state){
      return state.paintId;
    }
  },
  modules: {
  }
})
