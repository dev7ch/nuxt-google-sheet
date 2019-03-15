<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.btn {
  transition: background-color 0.35s ease-in-out, color 0.2s ease-in-out;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 20px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  pre {
    overflow: hidden;
  }
}

.container--width {
  display: block;
  text-align: left;
  width: 1490px;
  padding: 15px;
  @media screen and (min-width: 720px) {
    padding: 30px;
  }
}

.links {
  display: flex;
  flex-flow: row wrap;
  padding: 15px;

  > * {
    flex: 1 0 40%;
    margin-bottom: 15px;

    &:nth-child(3) {
      flex: 1 0 100%;
      margin-left: 0;
    }

    @media screen and (max-width: 480px) {
      flex: 1 0 100%;
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
