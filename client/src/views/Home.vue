<template>
  <v-container>
    <h1>Home</h1>
    <div v-if="$apollo.loading">Loading...</div>
    <ul v-else
        v-for="post in posts"
        :key="post._id">
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
  data() {
    return {
      posts: [],
    }
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
      `,
      // smart query
      result({data, loading}) {
        if (!loading) {
          // data has our info
          this.posts = data.getPosts;
        }
      },
      error(err) {
        console.log({err});
      }
    }
  }
}
</script>
