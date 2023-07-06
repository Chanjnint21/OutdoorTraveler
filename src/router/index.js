import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
// import TripCreate from '../views/Trip/TripCreate.vue'
// import TripUpdate from '../views/Trip/TripUpdate.vue'
import ProfileView from '../views/Profile/ProfileView.vue'
import NotFound from '../views/NotFound.vue'
import BoilerPlate from '../views/layout/AppLayout.vue'
import AuthLayout from '../views/layout/AuthLayout.vue'
import ViewTrip from '../views/ViewTrip.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
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
    redirect: '/user/home',
    component: BoilerPlate,
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView,
        meta: {
          auth: true,
          RouteName: 'Home',
          isCreate: true
        }
      },
      {
        path: '/home/view/:id',
        name: 'view',
        component: ViewTrip,
        meta: {
          auth: true,
          RouteName: 'View Trip',
          isCreate: false
        }
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('../views/Trip/TripCreate.vue'),
        meta: {
          auth: true,
          RouteName: 'Create Trip',
          isCreate: false
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView,
        meta: {
          auth: true,
          RouteName: 'Profile',
          isCreate: true
        }
      },
      {
        path: 'update/:id',
        name: 'update',
        component: () => import('../views/Trip/TripUpdate.vue'),
        meta: {
          auth: true,
          RouteName: 'Update Trip',
          isCreate: true
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
    next('/user')
  } else {
    next()
  }
})

export default router
