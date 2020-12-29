<template>
  <v-container>
    <h1>Home</h1>
    <ul v-for="post in getPosts" :key="post._id">
      <li>{{post.title}}</li>
    </ul>
  </v-container>
</template>

<script>
// @ is an alias to /src
import {gql} from 'apollo-boost';

export default {
  name: 'Home',
  components: {
  },
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
          }
        }
      `
    }
  }
}
</script>
