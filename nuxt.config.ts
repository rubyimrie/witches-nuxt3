// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: process.env.NODE_ENV === 'development'
        ? 'https://witches.is.ed.ac.uk'
        : 'https://witches.is.ed.ac.uk'
    }
  },
  app:{
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  }
},
css: [
  "leaflet.markercluster/dist/MarkerCluster.css",
  "leaflet.markercluster/dist/MarkerCluster.Default.css",
  "vue-slider-component/theme/default.css",
],
plugins: [
  {src: "~/plugins/markercluster",ssr: false},
  {src: "~/plugins/slider",ssr: false},
  { src: "~/plugins/vue-google-analytics", mode: "client"},
],
  /*
  ** Nuxt.js modules
  */
  modules: [
      '@nuxtjs/tailwindcss',
      '@nuxtjs/leaflet',
      '@vueform/nuxt'
      //'vue-sweetalert2/nuxt', NOT COMPATATIBLE WITH NUXT 3 YET
      // 'nuxt-webfontloader', NOT COMPATATIBLE WITH NUXT 3 YET
  ],
  build: {
    transpile: ['@vuepic/vue-datepicker']
},
purgeCSS: {
  whitelist: ['lvml'],
  whitelistPatterns: [
      /leaflet-.+$/,
      /vue-slider.+$/
  ],
  whitelistPatternsChildren: [
      /leaflet-.+$/
      ,/vue-slider.+$/
  ]
},
webfontloader: {
  google: {
      families: ['EB+Garamond:400,700', 'Roboto:300,400,500'] //Loads Lato font with weights 400 and 700
  }
},
/*
** Build configuration
*/
build: {
/*
** You can extend webpack config here
*/
extend(config, ctx) {
}
},
  
})
