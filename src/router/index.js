import { createRouter, createWebHistory } from 'vue-router'



import HelloWorld from '../components/HelloWorld.vue'
import ProgressBar1 from '../components/ProgressBar1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: HelloWorld
    },
    {
      path: '/progressbar',
      name: 'progressbar',
      component: ProgressBar1
    }

  ]
})




export default router
