import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// To understand why we need to import the `App` and `Meta` components here, see:
// https://vue-meta.nuxtjs.org/guide/preparing.html#preparing-the-plugin
// Technically this may not be necessary, as GitHub pages does not support SSR (server-side rendering),
// only static site generation (SSG).

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
