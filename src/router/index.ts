import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import GuidelinesView from '../views/Guidelines/GuidelinesView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/guidelines',
    name: 'Guidelines',
    component: GuidelinesView
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
