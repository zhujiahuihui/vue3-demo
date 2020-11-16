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
    path: '/markRaw',
    name: 'markRaw',
    component: () => import('@/views/markRaw.vue')
  }, {
    path: '/life',
    name: 'life',
    component: () => import('@/views/life.vue')
  },
  {
    path: '/parent',
    name: 'parent',
    component: () => import('@/views/parent.vue'),
    children: [
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('@/views/detail.vue')
      }
    ]
  },
  {
    path: '/provide',
    name: 'provide',
    component: () => import('@/views/provide.vue'),

  },
  {
    path: '/store',
    name: 'store',
    component: () => import('@/views/store.vue'),

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
