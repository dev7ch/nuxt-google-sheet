<template>
  <div class="page">
    <h3>Simple Pizza Chart</h3>
    <div id="pizza-chart" />

    <template v-if="$route.query.debug">
      <h3>Simple C3 Chart Test</h3>
      <div id="result-chart" />
      <h3>Demo Chart</h3>
      <div id="demo-chart" />

      <h3>Imported External csv file</h3>
      <pre v-if="csvData">
      <div v-for="(v, key) in csvData" :key="key">
            {{ v }}
      </div>
    </pre>
    </template>
  </div>
</template>
<script>
const sheetUrl = process.env.GOOGLE_CSV_SHEET_URL

export default {
  data() {
    return {
      csvData: []
    }
  },

  watchQuery: true,

  // asyncData(context) {
  //   context.$axios.$get(sheetUrl).then(res => {
  //     context.$store.commit
  //     return co
  // },

  beforeMount() {
    // Simple Chart test

    this.$c3.generate({
      bindto: "#result-chart",
      data: {
        columns: [["data1", 30], ["data2", 120]],
        type: "pie"
      }
    })
  },

  mounted() {
    console.log(this.csvData)

    this.getCsvData(sheetUrl)
    // this.prepareData(this.csvData)
    // console.log(this.csvObj)
    //

    // // useing .env file
    // this.$d3.csv(process.env.GOOGLE_CSV_SHEET_URL, data => {
    //   this.csvData.push(data)
    //   console.log(this.csvData)
    // })

    this.$d3
      .csv(sheetUrl, data => {
        this.csvData.push(data)
        //console.log(this.csvData)
        this.$store.commit("setCsvArray", data)
      })
      .then(() => {
        this.$c3.generate({
          bindto: "#pizza-chart",
          data: {
            type: "bar",
            json: this.$store.state.csvArray,
            keys: {
              x: "name",
              value: ["number of toppings"]
            }
          },
          axis: {
            x: {
              type: "category"
            }
          },
          bar: {
            width: {
              ratio: 0.5
            }
          }
        })
      })
    this.$c3.generate({
      bindto: "#demo-chart",
      data: {
        type: "bar",
        json: [
          { indicator: "X", total: 100 },
          { indicator: "Y", total: 200 },
          { indicator: "Z", total: 300 }
        ],
        keys: {
          x: "indicator",
          value: ["total"]
        }
      },
      axis: {
        x: {
          type: "category"
        }
      },
      bar: {
        width: {
          ratio: 0.5
        }
      }
    })
  },

  methods: {
    async getCsvData($url) {
      if (!this.$store.state.csv) {
        await this.$axios.$get($url).then(res => {
          this.$store.commit("setCsvData", res)
        })
      }
    }
  }
}
</script>
