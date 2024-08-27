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
  "leaflet.markercluster/dist/MarkerCluster.Default.css"
],
plugins: [
  {src: "~/plugins/markercluster",ssr: false},
  { src: "~/plugins/vue-google-analytics", mode: "client"},
],
  /*
  ** Nuxt.js modules
  */
  modules: [
      '@nuxtjs/tailwindcss',
      '@nuxtjs/leaflet',
      '@vueform/nuxt',
      'nuxt-font-loader'
      //'vue-sweetalert2/nuxt', NOT COMPATATIBLE WITH NUXT 3 YET
      // 'nuxt-webfontloader', NOT COMPATATIBLE WITH NUXT 3 YET
  ],
  build: {
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
fontLoader: {
  external: [
    {
      src: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
      family: 'Roboto',
      weight: '300 400 500',
    },
    {
      src: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
      family: 'EB Garamond',
      weight: '400 700',
    },
  ]
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
