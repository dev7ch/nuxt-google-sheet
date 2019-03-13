<template>
  <div class="page">
    <h3>Simple Chart Test</h3>
    <div id="result-chart" />
    <h3>Import External csv file</h3>
    <h3>Pizza Chart</h3>
    <div id="pizza-chart" />

    <pre>
          <ul v-if="csvData">
      <li v-for="(v, key) in csvData" :key="key">
            {{ v }}
      </li>
    </ul>
    </pre>
  </div>
</template>
<script>
const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvSeXb1Bovj0AVm-2eWO6Bg1YAaiYFYjhBgqX_y7hD9RxS5vIume8e0yCafalD7SUWRsj74Gx_2cD9/pub?output=csv"

export default {
  data() {
    return {
      csvData: [],
      csvObj: {},
      csvName: [],
      csvTopping: []
    }
  },

  //
  // asyncData(context) {
  //   context.$axios.$get(sheetUrl).then(res => {
  //     context.$store.commit
  //     return console.log(res)
  //   })
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

    this.$d3.csv(sheetUrl, data => {
      this.csvData.push(data)
      //console.log(this.csvData)
    })

    this.$c3.generate({
      bindto: "#pizza-chart",
      data: {
        json: [this.csvData],

        //type: "pie",

        keys: {
          x: "x",
          value: ["name", "toppings"]
        },
        names: {
          value0: "value 0 display",
          value1: "value 1 display"
        }
      }
    })
  },

  methods: {
    prepareData($json) {
      $json.forEach(function(elem) {
        this.csvName.push(elem.name)
        this.csvObj[elem.name] = elem.name
      })
    },

    async getCsvData($url) {
      if (!this.$store.state.csv) {
        await this.$axios.$get($url).then(res => {
          console.log(res)
          this.$store.commit("setCsvData", res)
        })
      }
    }
  }
}
</script>
