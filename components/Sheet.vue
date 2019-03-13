<template>
  <div id="homepage">
    <h1>Les dernières Articles</h1>
    <div v-for="article in articles" :key="article.index()" class="article">
      <h2>{{ article.name }}</h2>
      <p>{{ article.content }}</p>
    </div>
  </div>
</template>

<script>
const _ = require("lodash")
//  SOURCE: https://gist.github.com/mornir/56e562e314600b3d37ccb9ab2df641b8
//  your spreadsheet has to be PUBLIC and SHARED with everybody to be accessed this way
//  https://sheets.googleapis.com/v4/spreadsheets/{SPREASHEET_ID}/values/{SHEET_TAB_NAME}!{CELLS}?key={GOOGLE_API_KEY}
const url =
  "https://sheets.googleapis.com/v4/spreadsheets/18SHABqiyvh9QbDX0utwxu-ScmRpQ6QFfOAIKMjBg97E/values/name!A1:D1000?key=" +
  process.env.GOOGLE_SHEET_KEY

export default {
  data() {
    return {
      articles: []
    }
  },

  async asyncData() {
    let data
    let articles = []
    const properties = data.shift()
    await this.$axios.$get(url).then(res => {
      data = res.data.values
    })
    for (const i in data) {
      articles.push(_.data(properties, data[i]))
    }
    console.log(data)
    console.log(articles)

    return { articles }
  },

  mounted() {
    console.log(this.articles)
  }
}
</script>
