import Vue from 'vue'
import Vuex from 'vuex'
import {defaultClient as apolloClient} from "../main";
import {gql} from 'apollo-boost'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
    async getPosts() {
      // use apollo client to fire query
      const data = await apolloClient.query({
        query: gql`
            query {
              getPosts {
                _id
                title
                imageUrl
              }
            }
        `
      });
      console.log({data});
    }
  }
  ,
  modules: {
  }
})
