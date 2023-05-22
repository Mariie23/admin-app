import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import store from '../store'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: Home,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthPage.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/request/:id',
    name: 'Request',
    component: () => import('../views/RequestPage.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/HelpPage'),
    meta: {
      layout: 'main',
      auth: true
    }
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  if (requireAuth && store.getters['authModule/isAuth']) {
    next()
  } else if (requireAuth && !store.getters['authModule/isAuth']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
