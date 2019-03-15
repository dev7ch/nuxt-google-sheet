import Vuex from "vuex"

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      csv: null,
      csvArray: [],
      component: {}
    }),
    mutations: {
      setCsvData(state, data) {
        state.csv = data
      },
      setCsvArray(state, data) {
        state.csvArray.push(data)
      },
      setComponent(state, data) {
        state.component = data
      }
    }
  })
}

export default createStore
