<template>
  <v-container>
    <!-- SignIn title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome back!</h1>
      </v-flex>

      <!-- SignIn form -->
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <v-card color="secondary" dark>
            <v-container>
              <v-form @submit.prevent="signIn()">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field prepend-icon="mdi-home"
                                  v-model="username"
                                  label="Username"
                                  type="text">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field prepend-icon="mdi-home"
                                  label="Password"
                                  v-model="password"
                                  type="password">
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-btn color="accent" type="submit">Signin</v-btn>
                    <h3>Don't have an account?</h3>
                    <router-link to="/posts"></router-link>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import store from 'vuex';

export default {
  name: "SignIn",
  data: () => {
    return {
      username: '',
      password: '',
    }
  },
  watch: {
    USER(newValue) {
      if (newValue) {
        this.$router.push('/');
      }
    },
  },
  computed: {
    ...store.mapGetters([
      'USER',
    ])
  },
  methods: {
    ...store.mapActions([
      'SIGN_IN_USER'
    ]),
    async signIn() {
      await this.SIGN_IN_USER({username: this.username, password: this.password});
    }
  }
}
</script>

<style scoped>

</style>