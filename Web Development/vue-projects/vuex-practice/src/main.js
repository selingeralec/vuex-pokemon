import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('capitalize', function (value){
  if(!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.filter('poke_id_filter', function (value){
  return '#' + value.toString().padStart(3, '0');
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
