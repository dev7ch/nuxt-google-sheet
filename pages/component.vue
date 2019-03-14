<template>
  <Sheet :params="$route.query.range" />
</template>

<script>
import Sheet from "~/components/Sheet"

export default {
  components: {
    Sheet
  },

  mounted() {
    console.log(this.$route.query.range)
  }
}
</script>
