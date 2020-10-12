import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    zoom: 0
  },
  mutations: {
    plusClick(state) {
      state.zoom = state.zoom + 10
    },
    minusClick(state) {
      state.zoom = state.zoom - 10
    }
  },
  actions: {
  },
  modules: {
  }
})
