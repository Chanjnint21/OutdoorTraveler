import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import TripCreate from '../views/TripCreate.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFound from '../views/NotFound.vue'
import BoilerPlate from '../views/layout/AppLayout.vue'
import AuthLayout from '../views/layout/AuthLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: LoginView
      }
    ]
  },
  {
    path: '/user',
    component: BoilerPlate,
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView,
        meta: {
          auth: true
        }
      },
      {
        path: 'create',
        name: 'create',
        component: TripCreate,
        meta: {
          auth: true
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView,
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound,
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken')
  if (to.meta.auth && !isAuthenticated) {
    next('/login')
  } else if (!to.meta.auth && isAuthenticated) {
    next('/user/home')
  } else {
    next()
  }
})

export default router
