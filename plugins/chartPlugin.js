import Vue from "vue"
import { Line, Bar, Radar } from "vue-chartjs"

Vue.component("chart-line", {
  extends: Line,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})

Vue.component("chart-bar", {
  extends: Bar,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})

Vue.component("chart-radar", {
  extends: Radar,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options)
  }
})
