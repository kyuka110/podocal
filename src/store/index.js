import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mainModule = {
  strict: true,
  namespaced: true,
  state: {
    searchBeginTime:  4765100399000, //2120-12-31 23:59:59
    searchEndTime: 0,
    paintId: [],
    dispDays: 7,
    title: {},
    detail: {},
    first: {},
  },
  mutations: {
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
      state.title[payload.taskid] = payload.title;
      state.detail[payload.taskid] = payload.detail;
      state.first[payload.taskid] = payload.first;
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
    },
    returnFirst(state){
      return state.first;
    },
    returnTitle(state){
      return state.title;
    },
    returnDetail(state){
      return state.detail;
    },
  },
  modules: {
  }
}

const scaleModule = {
  strict: true,
  namespaced: true,
  state: {
    zoom: 0,
  },
  mutations: {
    plusClick(state) {
      state.zoom = state.zoom + 5
    },
    minusClick(state) {
      if (state.zoom > 0) {
        state.zoom = state.zoom - 5
      }
    }
  }
}

export default new Vuex.Store({
  modules: {
    mm: mainModule,
    sm: scaleModule
  }
});