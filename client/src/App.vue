<template>
  <v-app>
    <v-navigation-drawer temporary
                         bottom
                         absolute
                         v-model="drawer">
      <v-toolbar color="accent"
                 dark
                 flat
                 dense>
        <v-app-bar-nav-icon @click="drawer = !drawer">
        </v-app-bar-nav-icon>
        <v-toolbar-title>VueShare</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-item v-for="item in horizontalNavbarItems"
                     :to="item.link"
                     v-ripple
                     :key="item.title">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{item.title}}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed color="primary" dark dense flat app >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/"
                     tag="span"
                     class="cursor-pointer">
          VueShare
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field prepend-icon="mdi-search"
                    single-line
                    hide-details
                    color="accent"
                    placeholder="Search post">
      </v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn depressed
               color="primary"
               tile
               :to="item.link"
               v-for="item in horizontalNavbarItems"
               :key="item.title">
          <v-icon left class="hidden-xs-only">{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!-- app content -->
    <v-main>
      <v-container class="mt-4">
        <v-fade-transition group hide-on-leave>
          <router-view :key="1"></router-view>
        </v-fade-transition>

        <v-snackbar v-model="authSnackbar"
                    bottom
                    left
                    color="success"
                    :timeout="5000">
          <v-icon class="mr-3">mdi-circle</v-icon>
          <h4>You are now signed in!</h4>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
  name: 'App',

  components: {
  },
  watch: {
    USER(newValue, oldValue) {
      console.log(newValue);
      console.log(oldValue);
      // if we had no value for user before, show snackbar
      if (!oldValue) {
        this.authSnackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters([
      'USER'
    ]),
    horizontalNavbarItems() {
      let unsignedItems = [
        {
          icon: 'mdi-chat',
          title: 'Posts',
          link: '/posts',
        },
        {
          icon: 'mdi-lock-open',
          title: 'Sign in',
          link: '/signIn',
        },
        {
          icon: 'mdi-pencil',
          title: 'Sign up',
          link: '/signup',
        }];

      let signedItems = [
        {
          icon: 'mdi-chat',
          title: 'Posts',
          link: '/posts',
        },
        {
          icon: 'mdi-lock-open',
          title: 'Profile',
          link: '/profile',
        },
        {
          icon: 'mdi-pencil',
          title: 'Sign out',
          link: '/',
        }];

      return this.USER ? signedItems : unsignedItems;
    }
  },

  data: () => ({
    drawer: false,
    authSnackbar: false,
  }),
};
</script>

<style>
 .cursor-pointer {
   cursor: pointer;
 }
</style>
