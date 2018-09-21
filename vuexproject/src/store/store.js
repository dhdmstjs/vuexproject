import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
Vue.use(VueAxios, axios)


export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'somekey',
    storage: window.localStorage,
    reducer: state => ({
      //do something
      //this will pass the state & return the state with only the objects you want to store
    })
  })],
  state: {
    tickets: [],
  },

  actions: {
    loadTickets ({ commit }) {
      axios.get('http://localhost:4000/tickets')
        .then(r => r.data)
        .then(tickets => {
        commit('SET_TICKETS', tickets)
        })
    },
    putTickets({state, commit},payload) {
      axios.post('http://localhost:4000/tickets/add',payload)
        .then((response) => {
          commit('ADD_TICKET', payload);
        })

    }
  },
  mutations: {
    SET_TICKETS (state, tickets) {
      state.tickets = tickets

    },
    ADD_TICKET (state,tickets) {
      state.tickets.push(tickets)
    }
  }
})
