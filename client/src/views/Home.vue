<template>
  <v-container>
    <v-layout row>
      <v-dialog v-model="LOADING_POSTS" persistent fullscreen>
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate
                                 :size="70"
                                 :width="7"
                                 color="secondary"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
    <v-flex xs12>
      <v-carousel v-if="!LOADING_POSTS"
                  v-bind="{'cycle': true}"
                  interval="3000">
        <v-carousel-item  v-for="post in ALL_POSTS"
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
  computed: {
    ...store.mapGetters([
      'ALL_POSTS',
      'LOADING_POSTS'
    ])
  },
  methods: {
    ...store.mapActions([
      'getPosts'
    ])
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