import pkg from "./package"

//require("dotenv").config()

export default {
  mode: "universal",

  /*
   ** Redeclaring Nuxt env adds support for netlify env vars
   */
  env: {
    GOOGLE_SHEET_API: process.env.GOOGLE_SHEET_API,
    GOOGLE_SHEET_KEY: process.env.GOOGLE_SHEET_KEY,
    GOOGLE_CSV_SHEET_URL: process.env.GOOGLE_CSV_SHEET_URL
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["./node_modules/c3/c3.min.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/chart", ssr: false },
    { src: "~/plugins/chartPlugin", ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/dotenv"
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseUrl: process.env.GOOGLE_SHEET_API
  },

  generate: {
    routes: ["/demo", "/component"]
  },

  /*
   ** Build configuration
   */
  build: {
    babel: {
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: false
          }
        ]
      ],
      plugins: [
        ["@babel/plugin-transform-object-rest-spread", { proposal: "minimal" }],
        ["@babel/plugin-transform-runtime"]
      ]
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
}
