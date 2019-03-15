<template>
  <div class="container container--width">
    <Sheet :params="$route.query.range" />
  </div>
</template>

<script>
import Sheet from "~/components/Sheet"

export default {
  components: {
    Sheet
  },
  watchQuery: true,

  mounted() {
    console.log(this.$route.query.range)
  }
}
</script>
