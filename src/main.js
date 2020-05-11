import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messPlugin from '@/utils/pushmessage.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'


Vue.config.productionTip = false

//подключение валидации
Vue.use(Vuelidate)

Vue.use(messPlugin)

//добавляем фильтр даты datef в глобалку,чтоб дотянуться из Navbar 
Vue.filter('datef', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
