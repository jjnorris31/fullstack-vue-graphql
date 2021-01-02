<template>
  <v-container>
    <v-row>
      <v-col cols="6" offset="3">
        <h1>Welcome back!</h1>
      </v-col>
      <v-col cols="6"
             offset="3">
        <v-layout row
                  wrap
                  v-if="ERROR">
          <v-flex xs12>
            <form-alert :message="ERROR"></form-alert>
          </v-flex>
        </v-layout>
        <v-card color="secondary"
                class="px-4 py-2"
                dark>
          <v-container>
            <v-form @submit.prevent="signIn()"
                    ref="userForm"
                    lazy-validation
                    v-model="isFormValid">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field prepend-icon="mdi-account"
                                v-model="username"
                                :rules="usernameRules"
                                label="Username"
                                type="text">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field prepend-icon="mdi-lock"
                                label="Password"
                                :rules="passwordRules"
                                v-model="password"
                                type="password">
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-row justify="center">
                <v-col cols="12"
                       class="d-flex justify-center">
                  <v-btn color="accent"
                         :disabled="!isFormValid"
                         :loading="LOADING_POSTS"
                         type="submit">Signin
                  </v-btn>
                </v-col>
                <v-col cols="12"
                       class="d-flex justify-center">
                  <h4>Don't have an account?</h4>
                </v-col>
              </v-row>

            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from 'vuex';
import FormAlert from "../Shared/FormAlert";

export default {
  name: "SignIn",
  components: {FormAlert},
  data: () => {
    return {
      isFormValid: false,
      username: '',
      password: '',
      usernameRules: [
        // check if username in input
        username => !!username || 'Username is required',
        // make sure username is less than 12 characters
        username => username.length > 6 || 'Username must be less than 10 characters'
      ],
      passwordRules: [
        password => !!password || 'Password is required',
        password => password.length > 2 || 'Password must be at least 7 characters'
      ],
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
      'ERROR',
      'LOADING_POSTS'
    ])
  },
  methods: {
    ...store.mapActions([
      'SIGN_IN_USER'
    ]),
    async signIn() {
      if (this.$refs.userForm.validate()) {
        await this.SIGN_IN_USER({username: this.username, password: this.password});
      }
    }
  }
}
</script>

<style scoped>

</style>