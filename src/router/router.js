import { createRouter, createWebHistory } from 'vue-router'
import FinancialDashboard from '@/views/FinancialDashboard.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: FinancialDashboard,
    meta: {
      title: 'داشبورد مالی',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'درباره ما',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  },
})

// تغییر عنوان صفحه بر اساس متا تگ‌ها
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'سیستم مالی'
  next()
})

export default router
