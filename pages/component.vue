<template>
  <Sheet :params="$route.query.range" />
</template>

<script>
import Sheet from "~/components/Sheet"

export default {
  // validate({ route }) {
  //   return !isNaN(+route.query.range)
  // },
  components: {
    Sheet
  },

  mounted() {
    console.log(this.$route.query.range)
  }
}
</script>
