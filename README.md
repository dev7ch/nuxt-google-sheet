# nuxt-google-sheet

> Try google sheets and nuxt

## How to use

Define the Range in the url like, for the full range:


https://nuxt-google-sheet.netlify.app/component/?range=pizza

... and if you need specific ranges:

https://nuxt-google-sheet.netlify.app/component/?range=pizza%21A1%3AC5

A simple public csv url without google API and no API key can be done like that:

https://nuxt-google-sheet.netlify.app/demo

## Debug mode

By appending `?debug=true` or `?range=pizza&debug=true` in `dev` mode you ll get some more outputs

http://localhost:3000/demo?debug=true

or 
 
http://localhost:3000/component?range=pizza&debug=true

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
