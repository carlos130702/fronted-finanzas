import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './firebase/init'
import firebase from 'firebase/compat/app'
import { firestorePlugin} from 'vuefire'
Vue.use(firestorePlugin)

Vue.config.productionTip = false

let app = null
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})


