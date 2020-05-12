import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import CurrFilter from '@/filters/curr.filter'
import messPlugin from '@/utils/pushmessage.plugin'
import Loader from '@/components/app_comp/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false

//подключение валидации
Vue.use(Vuelidate)

Vue.use(messPlugin)

//добавляем фильтр даты datef в глобалку,чтоб дотянуться из Navbar 
Vue.filter('datef', dateFilter)
//фильтр валюты
Vue.filter('currf', CurrFilter)

Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyBigr-vchwuLQAb3BC-KER9DiCt2foUb5I",
  authDomain: "artgolcrm.firebaseapp.com",
  databaseURL: "https://artgolcrm.firebaseio.com",
  projectId: "artgolcrm",
  storageBucket: "artgolcrm.appspot.com",
  messagingSenderId: "1089283271681",
  appId: "1:1089283271681:web:9d150bf456e3da06732400",
  measurementId: "G-7L5FXZTEX2"
})

let app 

//загрузка приложения если у пользователя есть уже старая сессия
firebase.auth().onAuthStateChanged(() => {
  //проверка, если уже есть экземпляр (app!=null) приложения,чтоб не создавать клон
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})



