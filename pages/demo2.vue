<template>
  <div class="page">
    <h3>Sheet Component</h3>
    <Sheet />
  </div>
</template>
<script>
import Sheet from "~/components/Sheet.vue"

const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvSeXb1Bovj0AVm-2eWO6Bg1YAaiYFYjhBgqX_y7hD9RxS5vIume8e0yCafalD7SUWRsj74Gx_2cD9/pub?output=csv"

export default {
  components: {
    Sheet
  },

  mounted() {
    console.log(this.csvData)
    this.getCsvData(sheetUrl)
  },

  methods: {
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
