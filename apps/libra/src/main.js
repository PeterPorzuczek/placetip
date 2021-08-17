import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'




import App from './App.vue'
import Dashboard from './Dashboard.vue'
import Search from './Search.vue'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Dashboard },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
