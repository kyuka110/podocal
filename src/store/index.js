import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mainModule = {
  strict: true,
  namespaced: true,
  state: {
    searchBeginTime:  4765100399000, //2120-12-31 23:59:59
    searchEndTime: 0,
    dispDays: 7,
    detailTaskId: 0,
    taskDetailModal: false,
    // dictはタスクのidがkey, 塗る場所のidがvalueで入る。paintIdのみ逆。
    paintId: {},
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
      state.paintId[payload.id] = payload.taskId;
    },
    addTask(state, payload) {
      state.title[payload.taskid] = payload.title;
      state.detail[payload.taskid] = payload.detail;
      state.first[payload.taskid] = payload.first;
    },
    deleteTask(state, payload) {
      delete state.title[payload.taskid];
      delete state.detail[payload.taskid];
      delete state.first[payload.taskid];
      for(var key of Object.keys(state.paintId)){
        if(state.paintId[key] == payload.taskid){
          delete state.paintId[key]
        }
      }
    },
    isDispDetailModal(state, payload) {
      state.taskDetailModal = payload.isOpen;
    },
    changeDetailTaskId(state, payload) {
      state.detailTaskId = payload.detailTaskId;
    }
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
    returnTaskDetailModal(state){
      return state.taskDetailModal;
    },
    returnDetailTaskId(state){
      return state.detailTaskId;
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