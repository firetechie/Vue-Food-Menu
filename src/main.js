import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { firestorePlugin } from "vuefire";

Vue.use(firestorePlugin);

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$base_url = "https://obscure-caverns-04432.herokuapp.com/api";
Vue.prototype.$base = "https://foodmenuview.firebaseapp.com/";
// Vue.prototype.$base_url = "http://localhost:5000/api";

// Vue.prototype.$http = axios.create({
//   baseURL: `http://localhost:5000/api`,
//   headers: {
//     Authorization: `${localStorage.Token}`
//   }
// })

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.common["Authorization"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// new Vue({
//   // el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// }).$mount('#app')