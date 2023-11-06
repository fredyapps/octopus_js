import { createRouter, createWebHistory } from 'vue-router'



import Dashboard from '../components/Dashboard.vue'
import Frameworks from '../components/Frameworks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },

    {
      path: '/frameworks',
      name: 'Frameworks',
      component: Frameworks
    }

  ]
})




export default router
