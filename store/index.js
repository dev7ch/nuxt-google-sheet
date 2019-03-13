import Vuex from "vuex"

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      csv: null
    }),
    mutations: {
      setCsvData(state, data) {
        state.csv = data
      }
    }
  })
}

export default createStore
