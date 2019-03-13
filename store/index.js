import Vuex from "vuex"

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      csv: null,
      csvArray: []
    }),
    mutations: {
      setCsvData(state, data) {
        state.csv = data
      },
      setCsvArray(state, data) {
        state.csvArray.push(data)
      }
    }
  })
}

export default createStore
