import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Setup',
    component: () => import('@/views/setup.vue')
  },
  {
    path: '/ref',
    name: 'ref',
    component: () => import('@/views/ref.vue')
  }, {
    path: '/customRef',
    name: 'customRef',
    component: () => import('@/views/customRef.vue')
  }, {
    path: '/reactive',
    name: 'reactive',
    component: () => import('@/views/reactive.vue')
  },
  {
    path: '/readonly',
    name: 'readonly',
    component: () => import('@/views/readonly.vue')
  }, {
    // markRaw.vue
    path: '/markRaw',
    name: 'markRaw',
    component: () => import('@/views/markRaw.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
