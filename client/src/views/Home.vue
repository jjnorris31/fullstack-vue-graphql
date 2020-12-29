<template>
  <v-container v-if="posts">
    <v-flex xs12>
      <v-carousel v-bind="{'cycle': true}" interval="3000">
        <v-carousel-item  v-for="post in posts"
                          :src="post.imageUrl"
                          :key="post._id">
          <h1 id="carousel__id">{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
// @ is an alias to /src
import {gql} from 'apollo-boost';
import store from 'vuex'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    ...store.mapActions([
      'getPosts'
    ])
  },
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            imageUrl
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
  },
  async mounted() {
    await this.getPosts();
  }
}
</script>

<style>
#carousel__id {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0 ;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>