import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import DashboardView from '@/views/Admin/DashboardView.vue'
import MenuView from '@/views/Admin/MenuView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

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
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/menu',
      name: 'admin-menu',
      component: MenuView,
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      const topOffset = document.querySelector('nav')?.offsetHeight || 72;
      return { el: to.hash, top: topOffset + 8, behavior: 'smooth' };
    }
    return { top: 0 };
  }
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.initUser()
  const isAuthenticated = authStore.user !== null

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  else if (to.meta.requiresGuest && isAuthenticated) {
    next('/admin/dashboard')
  }
  else {
    next()
  }
})

export default router
