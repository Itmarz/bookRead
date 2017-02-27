// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 	  Vue 		     from 'vue'
import    App 		     from './App'
import    Vuex 		     from 'Vuex'
import    Router 	     from 'vue-router'
import { AlertPlugin }   from 'vux'
import { LoadingPlugin } from 'vux'
import    VueResource    from 'vue-resource'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(VueResource)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)

/* router for */
const router = require('./config.js')(Router);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  router
});

























