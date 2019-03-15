<template>
  <div class="component">
    <h1 style="margin-bottom: 15px">
      Play with Public Sheets API
    </h1>

    <p>
      Enter the range in the URL, e.g.
      <a href="/component/?range=pizza%21A1%3AD17">
        https://nuxt-google-sheet.netlify.com/component/?range=pizza!A1:D17
      </a>
    </p>
    <div id="chart-default" style="margin: 60px auto 120px auto">
      <p>
        Do hard reload if you have an CORS issue.
      </p>
    </div>

    <h2 v-if="!!sheetData.values" style="text-align: center">
      {{ sheetData.values[0][0] }}
    </h2>

    <div id="chart-marinara" style="margin: 30px auto">
      <p>
        Do hard reload if you have an CORS issue.
      </p>
    </div>
    <pre>
      Found {{ c3Objects.length }} Objects.
    </pre>
    <pre>
      Append <b>?debug=true</b> to
      see more in dev mode.
    <pre>
    <template v-if="$route.query.debug === 'true'">
      <h3>Sheet Data</h3>
      <pre v-if="params">
      {{ sheetData }}
      </pre>
      <h3>Sheet Info</h3>
      <pre v-if="params">
      {{ sheetInfo }}
      </pre>
    </template>
  </pre></pre>
  </div>
</template>

<script>
//  SOURCE: https://gist.github.com/mornir/56e562e314600b3d37ccb9ab2df641b8
//  your spreadsheet has to be PUBLIC and SHARED with everybody to be accessed this way
//  https://sheets.googleapis.com/v4/spreadsheets/{SPREASHEET_ID}/values/{SHEET_TAB_NAME}!{CELLS}?key={GOOGLE_API_KEY}

const sheetUrl = process.env.GOOGLE_SHEET_API
const key = "?key=" + process.env.GOOGLE_SHEET_KEY
const _ = require("lodash")

export default {
  props: {
    params: {
      default: "pizza!A1:A17",
      type: String
    }
  },

  data() {
    return {
      sheetInfo: null,
      sheetData: {},
      c3Objects: {},
      c3Arrays: []
    }
  },

  created() {
    this.getSheetInfo()
    this.getSheetData()
  },

  methods: {
    async getSheetInfo() {
      let _this = this
      await this.$axios.$get(sheetUrl + key).then(res => {
        _this.sheetInfo = res
      })
    },

    async getSheetData() {
      let _this = this
      let range =
        this.$props.params !== null ? this.$props.params : "pizza!A1:C17"
      try {
        await this.$axios
          .$get(sheetUrl + "/values/" + range + key)
          .then(res => {
            _this.sheetData = res
          })
          .then(() => {
            _this.prepareData(_this.sheetData.values)
          })
      } catch (e) {
        return false
      }
    },

    prepareData($data) {
      let headings = $data.shift()
      let cols = []
      let names = []

      for (const i in $data) {
        cols.push(_.zipObject(headings, $data[i]))
      }

      for (let n = 0; n < 1; n++) {
        names.push(Object.keys(cols[n]))
      }
      this.c3Objects = cols
      this.$store.commit("setComponent", { pizza: cols })

      let arrays = cols.map(col => col.name)
      let _this = this
      let labels = Object.keys(cols[0])
      // String fields to remove from legend
      let forDeletion = ["name", "toppings"]

      Object.keys(cols).forEach(function(key) {
        console.log(arrays[key].toString(), cols[key])
        _this.c3Arrays[arrays[key]] = cols[key]
      })

      cols = cols.filter(item => !forDeletion.includes(item))
      this.$c3.generate({
        bindto: "#chart-marinara",
        data: {
          json: [...cols],
          keys: {
            // x: 'name', // it's possible to specify 'x' when category axis
            value: labels.filter(item => !forDeletion.includes(item))
          },
          type: "donut"
        }
      })

      console.log(labels)

      this.$c3.generate({
        bindto: "#chart-default",
        size: {
          height: 580
        },
        padding: {
          right: 20,
          bottom: 200,
          left: 30,
          top: 30
        },
        data: {
          json: [...this.c3Objects],
          keys: {
            x: this.c3Objects.name,
            value: labels.filter(item => !forDeletion.includes(item))
          },
          type: "bar"
        },
        bar: {
          width: {
            ratio: 0.33
          }
        },
        axis: {
          x: {
            type: "category",
            categories: arrays,
            tick: {
              fit: true,
              format: name => {
                return "🍕 " + arrays[name]
              },
              //width: 300,
              multiline: false,
              culling: {
                max: arrays.length * 2 // or whatever value you need
              }
            }
          }
        }
      })
      // console.log(arrays)
    }
  }
}
</script>
<style lang="scss">
@import "../assets/scss/helpers";
</style>
