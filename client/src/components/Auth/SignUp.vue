<template>
  <v-container>
    <v-row>
      <v-col cols="6" offset="3">
        <h1>Get started</h1>
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
        <v-card color="accent"
                class="px-4 py-2"
                dark>
          <v-container>
            <v-form @submit.prevent="signUp()"
                    ref="signUpForm"
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
                  <v-text-field prepend-icon="mdi-account"
                                v-model="email"
                                :rules="emailRules"
                                label="email"
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

              <v-layout row>
                <v-flex xs12>
                  <v-text-field prepend-icon="mdi-lock"
                                label="Password confirmation"
                                :rules="passwordRules"
                                v-model="passwordConfirmation"
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
                         type="submit">SignUp
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
  name: "SignUp",
  components: {FormAlert},
  data: () => {
    return {
      isFormValid: false,
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      usernameRules: [
        username => !!username || 'Username is required',
      ],
      passwordRules: [
        password => !!password || 'Password is required',
      ],
      emailRules: [
        email => !!email || 'email is required',
      ],
    }
  },
  watch: {
  },
  computed: {
    ...store.mapGetters([
      'ERROR',
      'LOADING_POSTS'
    ])
  },
  methods: {
    ...store.mapActions([
      'SIGN_UP_USER'
    ]),
    async signUp() {
      if (this.$refs.signUpForm.validate()) {
        await this.SIGN_UP_USER({username: this.username, email: this.email, password: this.password});
      }
    }
  }
}
</script>

<style scoped>

</style>