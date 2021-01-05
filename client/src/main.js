import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import FormAlert from "./components/Shared/FormAlert";

Vue.use(VueApollo);

// for global component use
Vue.component('form-alert', FormAlert);

// setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/',
  // include auth token with request made to backend
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    // if no token in local storage, add it
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }

    // operation adds the token to an authorization header
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },
  onError: ({graphQLErrors, networkError}) => {
    if (networkError) {
      console.log({networkError});
    }

    if (graphQLErrors) {
      for (let err in graphQLErrors) {
        if (err.name === 'AuthenticationError') {
          store.commit('SET_AUTH_ERROR', err);
        }
      }
    }
  }
})

const apolloProvider = new VueApollo({defaultClient});



Vue.config.productionTip = false

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    // execute getCurrentUser query
    this.$store.dispatch('GET_CURRENT_USER');
  }
}).$mount('#app')
