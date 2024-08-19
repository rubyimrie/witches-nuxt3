import { defineNuxtPlugin } from '#app'
import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const isGDPRCompliant = () => {
    const getGDPR = window.localStorage.getItem('GDPR:accepted')

    if (getGDPR !== null && getGDPR === 'no') {
      return true
    }

    if (getGDPR !== null && getGDPR === 'yes') {
      return false
    }

    return true
  }

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'UA-57361601-29'  // Replace with your Google Analytics Measurement ID
    },
    isEnabled: !isGDPRCompliant(),
  }, nuxtApp.vueApp.$router)
})