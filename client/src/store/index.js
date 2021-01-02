import Vue from 'vue'
import Vuex from 'vuex'
import {defaultClient as apolloClient} from "../main";
import {GET_POSTS, SIGN_IN, GET_CURRENT_USER} from "../queries";
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loadingPosts: false,
    token: '',
    user: null,
    error: null,
  },
  getters: {
    ALL_POSTS: (state) => {
      return state.posts;
    },
    LOADING_POSTS: (state) => {
      return state.loadingPosts;
    },
    USER: (state) => {
      return state.user;
    },
    ERROR: (state) => {
      return state.error;
    },
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
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
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
      commit('CLEAR_ERROR');
      commit('SET_LOADING_POSTS', true);
      // clear malformed token
      localStorage.setItem('token', '');
      try {
        const response = await apolloClient.mutate({
          mutation: SIGN_IN,
          variables: payload
        });
        // getting a token
        localStorage.setItem('token',  response.data.signIn.token);
        router.go();
        commit('SET_TOKEN', response.data.signIn.token);
        commit('SET_LOADING_POSTS', false)
      } catch (e) {
        commit('SET_LOADING_POSTS', false)
        commit('SET_ERROR', e);
      }
    },
    SIGN_OUT_USER({commit}) {
      // clear the user in the state
      commit('SET_USER', null);
      // remove token in local storage
      localStorage.removeItem('token');
      // redirect home - kick user oyt of private pages
      router.push('/');
    },
    async GET_CURRENT_USER({commit}) {
      commit('SET_LOADING_POSTS', true);
      const {data} = await apolloClient.query({
        query: GET_CURRENT_USER
      });
      commit('SET_LOADING_POSTS', false);
      commit('SET_USER', data.getCurrentUser)
    }
  }
  ,
  modules: {
  }
})
