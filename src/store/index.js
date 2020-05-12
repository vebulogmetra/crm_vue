import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },

  actions: {
    async fetchCurr() {
      //делаем запрос (можно через axios кинуть запрос к api, получить json)
      //но можно и через fixer, который и так отдаёт валютки в jsone
      const key = process.env.VUE_APP_FIXER
      //fetch возвращает промис
      const res = await fetch (`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      //распарсить джейсон 
      return await res.json()
    }
  },

  getters: {
    error: s => s.error
  },
  modules: {
    auth, info
  }
})
