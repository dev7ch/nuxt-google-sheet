<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        nuxt-google-sheet
      </h1>
      <h2 class="subtitle">
        Try google sheets and nuxt
      </h2>
      <div class="links">
        <a href="/demo" target="_blank" class="button--green btn">
          Single Bar Chart
        </a>
        <a
          href="https://github.com/dev7ch/nuxt-google-sheet"
          target="_blank"
          class="button--grey btn"
        >
          GitHub
        </a>
        <a href="/component?range=pizza" class="button--grey btn">
          Dynamic Component
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue"

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss">
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
