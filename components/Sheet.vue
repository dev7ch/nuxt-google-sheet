<template>
  <div>
    <h1>Play with Public Sheets API</h1>
    <pre>
      {{ sheetData }}
    </pre>
    <template v-if="$route.query.debug === 'true'">
      <h3>Sheet Info</h3>
      <pre v-if="params">
      {{ sheetInfo }}
      </pre>
    </template>
  </div>
</template>

<script>
//  SOURCE: https://gist.github.com/mornir/56e562e314600b3d37ccb9ab2df641b8
//  your spreadsheet has to be PUBLIC and SHARED with everybody to be accessed this way
//  https://sheets.googleapis.com/v4/spreadsheets/{SPREASHEET_ID}/values/{SHEET_TAB_NAME}!{CELLS}?key={GOOGLE_API_KEY}

const sheetUrl =
  "https://sheets.googleapis.com/v4/spreadsheets/18SHABqiyvh9QbDX0utwxu-ScmRpQ6QFfOAIKMjBg97E"
const key = "?key=" + process.env.GOOGLE_SHEET_KEY

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
      sheetData: null,
      articles: []
    }
  },

  beforeMount() {
    this.getSheetInfo()
    this.getSheetData()
  },

  mounted() {
    console.log(this.articles)
    console.log(this.$store.state)
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
      await this.$axios.$get(sheetUrl + "/values/" + range + key).then(res => {
        _this.sheetData = res
      })
    }
  }
}
</script>
