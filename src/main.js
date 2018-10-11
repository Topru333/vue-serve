import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

Vue.prototype.$http = Axios

Vue.config.productionTip = false

// eslint-disable-next-line
let app = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
