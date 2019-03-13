<template>
  <div class="page">
    <Sheet />
    <h3>Simple Chart Test</h3>
    <div id="result-chart" />
    <h3>Import External csv file</h3>
    <h3>Pizza Chart</h3>
    <div id="pizza-chart" />
    <br />
    <br />
    <pre>
          <ul>
      <li v-for="(v, key) in csvData" :key="key" v-text="v" />
    </ul>
    </pre>
  </div>
</template>
<script>
import Sheet from "~/components/Sheet.vue"

export default {
  components: {
    Sheet
  },

  data() {
    return {
      csvData: [],
      csvObj: {},
      csvName: [],
      csvTopping: []
    }
  },
  beforeMount() {
    // Simple Chart test

    this.$c3.generate({
      bindto: "#result-chart",
      data: {
        columns: [["data1", 30], ["data2", 120]],
        type: "pie"
      }
    })

    this.$d3.csv(process.env.GOOGLE_CSV_SHEET_URL, data => {
      this.csvData.push(data)
    })
  },

  mounted() {
    console.log(this.csvData)

    this.prepareData(this.csvData)
    console.log(this.csvObj)

    this.$c3.generate({
      bindto: "#pizza-chart",
      data: {
        json: [this.csvObj],

        type: "pie",
        keys: {
          value: this.csvName
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
    }
  }
}
</script>
