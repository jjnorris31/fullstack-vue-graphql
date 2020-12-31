import Vue from 'vue'
import Vuex from 'vuex'
import {defaultClient as apolloClient} from "../main";
import {GET_POSTS} from "../queries";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loadingPosts: false,
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
    }
  }
  ,
  modules: {
  }
})
