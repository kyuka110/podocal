import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    zoom: 0,
    dataSet: {}
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
    }
  },
  actions: {
    commitDataSet(store) {
      return axios.get('https://jxff6ecyn2.execute-api.ap-northeast-1.amazonaws.com/prod/getsingletask')
          .then(response => {
            store.commit('mutateDataSet', response.data)
          })
          .catch((reason) => {
            console.log(reason.message)
          })
    }
  },
  getters: {
    getStateDataSet: (state) => state.dataSet
  },
  modules: {
  }
})
