import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/home/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home, // 注意这里要带上 文件后缀.vue
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/pages/404/404.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
