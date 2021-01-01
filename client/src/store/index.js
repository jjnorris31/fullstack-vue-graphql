import Vue from 'vue'
import Vuex from 'vuex'
import {defaultClient as apolloClient} from "../main";
import {GET_POSTS, SIGN_IN} from "../queries";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loadingPosts: false,
    token: '',
  },
  getters: {
    ALL_POSTS: (state) => {
      return state.posts;
    },
    LOADING_POSTS: (state) => {
      return state.loadingPosts;
    }
  },
  mutations: {
    SET_POST(state, posts) {
      state.posts = posts;
    },
    SET_LOADING_POSTS(state, loading) {
      state.loadingPosts = loading;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {
    async getPosts({commit}) {
      commit('SET_LOADING_POSTS', true);
      // use apollo client to fire query
      const response = await apolloClient.query({
        query: GET_POSTS
      });
      commit('SET_POST', response.data.getPosts);
      commit('SET_LOADING_POSTS', false);
    },
    async SIGN_IN_USER({commit}, payload) {
      try {
        const response = await apolloClient.mutate({
          mutation: SIGN_IN,
          variables: payload
        });
        // getting a token
        localStorage.setItem('token',  response.data.signIn.token);
        commit('SET_TOKEN', response.data.signIn.token);
      } catch (e) {
        console.log(e);
      }
    }
  }
  ,
  modules: {
  }
})
