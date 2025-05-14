import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth/auth.js'
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
      path: '/PlayGame',
      name: 'PlayGame',
      component: () => import('../views/PlayGame.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/Shop',
      name: 'Shop',
      component: () => import('../views/TheShop.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/PlayGame/:code',
      name: 'PokerGame',
      component: ()=> import('../views/PokerGame.vue'),
      props: true,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  await auth.fetchUser()

  if (to.meta.requiresAuth && !auth.isAuthenticated()) {
    alert('You must be logged in to access this page.')
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
