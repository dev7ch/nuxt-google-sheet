<template>
  <div>
    <h1>Play with the store</h1>

    {{ articles }}
    <div v-for="article in articles" :key="article.index()" class="article">
      <h2>{{ article.name }}</h2>
      <p>{{ article.content }}</p>
    </div>
    <pre>
      {{ sheetInfo }}
    </pre>
  </div>
</template>

<script>
//const _ = require("lodash")
const sheetUrl =
  "https://sheets.googleapis.com/v4/spreadsheets/18SHABqiyvh9QbDX0utwxu-ScmRpQ6QFfOAIKMjBg97E"
const key = "?key=" + process.env.GOOGLE_SHEET_KEY
//  SOURCE: https://gist.github.com/mornir/56e562e314600b3d37ccb9ab2df641b8
//  your spreadsheet has to be PUBLIC and SHARED with everybody to be accessed this way
//  https://sheets.googleapis.com/v4/spreadsheets/{SPREASHEET_ID}/values/{SHEET_TAB_NAME}!{CELLS}?key={GOOGLE_API_KEY}

export default {
  data() {
    return {
      sheetInfo: null,
      articles: []
    }
  },

  beforeMount() {
    this.getSheetInfo()
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
    }
  }
}
</script>
