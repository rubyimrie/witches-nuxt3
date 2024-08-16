// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:8181'
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
/*
  ** Customize the progress-bar color
  */
  //loading: { color: '#fff' }, NOT COMPATIBLE IN NUXT 3 YET
  /*
css: [
  "leaflet.markercluster/dist/MarkerCluster.css",
  "leaflet.markercluster/dist/MarkerCluster.Default.css",
  "vue-slider-component/theme/default.css",
],
  /*
  ** Nuxt.js modules
  */
  modules: [
      '@nuxtjs/tailwindcss',
      '@nuxtjs/leaflet',
      //'vue-sweetalert2/nuxt', NOT COMPATATIBLE WITH NUXT 3 YET
      // 'nuxt-webfontloader', NOT COMPATATIBLE WITH NUXT 3 YET
  ],
  
})
