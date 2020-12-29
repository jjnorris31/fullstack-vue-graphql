import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts/add',
    name: 'addPost',
    component: () => import(`../components/Posts/AddPost`)
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import(`../components/Posts/Posts`)
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import(`../components/Auth/SignIn`)
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
