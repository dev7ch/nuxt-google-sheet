<template>
  <div class="page">
    <h3>Sheet Component</h3>
    <Sheet />
    <br />
    <br />
    <h3>Simple Chart Test</h3>
    <div id="result-chart" />
    <h3>Import External csv file</h3>
    <h3>Pizza Chart</h3>
    <div id="pizza-chart" />
    <br />
    <br />
    <pre>
          <ul>
      <li v-for="(v, key) in csvData" :key="key">
            {{ v }}
      </li>
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

  asyncData (context) {
    return { project: 'nuxt' }
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
  },

  mounted() {
    console.log(this.csvData)

    this.prepareData(this.csvData)
    console.log(this.csvObj)

    this.$d3.csv(process.env.GOOGLE_CSV_SHEET_URL, data => {
      this.csvData.push(data)
      console.log(this.csvData)
    })

    this.$c3.generate({
      bindto: "#pizza-chart",
      data: {
        json: this.csvData,

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
    }
  }
}
</script>
