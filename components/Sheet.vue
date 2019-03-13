s<template>
  <div id="homepage">
    {{ tabs }}
    <div v-for="item in tabs" :key="item.index()" class="article">
      {{ item }}
      <p>{{ article.content }}</p>
    </div>
  </div>
</template>

<script>
const _ = require("lodash")
//  your spreadsheet has to be PUBLIC and SHARED with everybody to be accessed this way
//  https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/{SHEET_TAB_NAME}!{CELLS}?key={GOOGLE_API_KEY}
const url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvSeXb1Bovj0AVm-2eWO6Bg1YAaiYFYjhBgqX_y7hD9RxS5vIume8e0yCafalD7SUWRsj74Gx_2cD9/pub?output=csv"
export default {
  props: {
    tabs: {
      type: Object,
      default: null
    }
  },

  async asyncData() {
    const res = await this.$axios.$get(url)
    const rows = res.data.values
    const properties = rows.shift()
    console.log(res)
    const tabs = []
    for (const i in rows) {
      tabs.push(_.zipObject(properties, rows[i]))
    }
    return { tabs }
  },

  mounted() {
    console.log(url)
  }
}
</script>
