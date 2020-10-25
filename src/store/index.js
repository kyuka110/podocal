import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    zoom: 0,
    searchBeginTime:  4765100399000, //2120-12-31 23:59:59
    searchEndTime: 0,
    paintId: [],
    dispDays: 7,
    title: [],
    first: []
  },
  mutations: {
    plusClick(state) {
      state.zoom = state.zoom + 5
    },
    minusClick(state) {
      if (state.zoom > 0) {
        state.zoom = state.zoom - 5
      }
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
    changeDispDays(state, payload) {
      state.dispDays = payload.days;
    },
    addPaintId(state, payload) {
      state.paintId.push(payload.id);
    },
    addTask(state, payload) {
      state.title.push(payload.title);
      state.first.push(payload.first);
    },
  },
  actions: {

  },
  getters: {
    returnPaintId(state){
      return state.paintId;
    },
    returnDispDays(state){
      return state.dispDays;
    }
  },
  modules: {
  }
})
