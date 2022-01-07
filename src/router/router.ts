import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/home/Home.vue'
import { useMainStore } from '@/store/main'
import { getCookie } from '@/utils/cookie'
import userRequest from '@/service/api/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home, // 注意这里要带上 文件后缀.vue
    alias: ['/home'],
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('@/pages/my/My.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/pages/404/404.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

async function getUserInfo() {
  try {
    const userDetail: any = await userRequest.info({
      uid: getCookie('userId'),
    })
    console.log(userDetail)
    if (userDetail.code === 200) {
      const store = useMainStore()
      store.setProfile(userDetail.profile)
      store.setAccount(userDetail.account)
    }
  } catch (error) {
    console.log(error)
  }
}
router.beforeEach(async (to, from, next) => {
  const mainStore = useMainStore()
  if (to.meta.requiresAuth && !getCookie('userId')) {
    mainStore.switchLoginVisible(true)
    next()
  } else {
    if (getCookie('userId') && !mainStore.profile) {
      getUserInfo()
    }
    next()
  }
})

export default router
