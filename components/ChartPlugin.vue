<template>
  <div class="row">
    <div class="container container--width">
      <h1 v-if="!!sheetInfo.properties">
        {{ sheetInfo.properties.title }}
      </h1>
      <template v-if="$store.state.component.plugin">
        <chart-line v-if="showLine" :data="chartData" :options="options" />
      </template>

      <template v-if="$store.state.component.plugin">
        <chart-bar v-if="showLine" :data="chartData" :options="options" />
      </template>
    </div>
    <pre>
          {{ $store.state.component.plugin }}
    </pre>
  </div>
</template>

<script>
const _ = require("lodash")
export default {
  props: {
    data: {
      type: Object,
      defaultValue: null
    },
    options: {
      type: Object,
      defaultValue: ""
    },
    params: {
      type: String,
      defaultValue: ""
    }
  },

  data() {
    return {
      showLine: false,
      sheetInfo: {},
      chartData: {
        labels: [],
        datasets: []
      }
    }
  },

  created() {
    this.getSheetInfo()
    this.getSheetData()
  },
  mounted() {
    console.log(this.sheetInfo)
    this.showLine = true // showLine will only be set to true on the client. This keeps the DOM-tree in sync.
  },

  methods: {
    async getSheetInfo() {
      let _this = this
      await this.$axios
        .$get(
          process.env.GOOGLE_SHEET_API + "?key=" + process.env.GOOGLE_SHEET_KEY
        )
        .then(res => {
          _this.sheetInfo = res
        })
    },

    async getSheetData() {
      let _this = this
      let range = "pizza!A1:H17"
      try {
        await this.$axios
          .$get(
            process.env.GOOGLE_SHEET_API +
              "/values/" +
              range +
              "?key=" +
              process.env.GOOGLE_SHEET_KEY
          )
          .then(res => {
            _this.sheetData = res
          })
          .then(() => {
            _this.prepareData(_this.sheetData.values)
          })
      } catch (e) {
        return console.log("Error: ", e.message)
      }
    },

    prepareData($data) {
      let headings = $data.shift()
      let cols = []

      for (const i in $data) {
        cols.push(_.zipObject(headings, $data[i]))
      }
      let arrays = cols.map(col => col.name)
      // String fields to remove from legend
      let forDeletion = ["name", "toppings"]
      let labels = Object.keys(cols[0])
      let filteredLabels = labels.filter(item => !forDeletion.includes(item))

      //console.log(filtered)

      this.$store.commit("setComponent", {
        plugin: { cols, labels: arrays }
      })

      for (let m = 0; m < filteredLabels.length; m++) {
        this.chartData.datasets.push({
          label: filteredLabels[m],
          backgroundColor:
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          data: _.map(cols, filteredLabels[m])
        })
      }
      this.chartData.labels = this.$store.state.component.plugin.labels
    }
  }
}
</script>
