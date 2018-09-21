import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import AddTicket from './components/AddTicket.vue';
import TicketView from './components/TicketView.vue';
import store from './store/store.js';
import '../index.scss';
import 'bootstrap/js/dist/modal';


Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const routes = [

  {
        name: 'add',
        path: '/add',
        component: AddTicket
  },
  {
    name: 'index',
    path: '/index',
    component: TicketView
}
];
const router = new VueRouter({ mode: 'history', routes: routes });

Vue.config.productionTip = false;

axios.interceptors.response.use((response) => {
    console.log("inte",response);
    return response;
}, function (error) {
    // Do something with response error
    //EXAMPLE
    //if (error == '404') {
    //  do something
    //}
    return Promise.reject(error.response);
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
