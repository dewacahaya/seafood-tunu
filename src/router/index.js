import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true }
    }
  ],
})

import { useAuthStore } from '../stores/auth'

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.initUser() 
  const isAuthenticated = authStore.user !== null

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } 
  else if (to.meta.requiresGuest && isAuthenticated) {
    next('/admin') 
  } 
  else {
    next() 
  }
})

export default router
