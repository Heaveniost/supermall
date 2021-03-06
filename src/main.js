// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store' 
// import Toast from 'components/common/toast'
import LazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

// Vue.use(Toast)
Vue.use(LazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
