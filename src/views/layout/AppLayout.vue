<template>
  <v-app>
    <v-navigation-drawer
      v-model='drawer'
      app
      dark
      v-if='authToken'
      color='#013a25'
    >
      <v-row class='d-flex justify-center'>
        <v-col cols='12' class='d-flex justify-center my-5'>
          <v-img
            contain
            src='@/assets/Img/circle-logo-turbine-png.webp'
            max-height='400'
            max-width='200'
          />
        </v-col>
        <v-col cols='9' class='routelink rounded-lg mt-5'>
          <router-link to='/user/home' class='py-3 pl-5 pr-16 white--text text-decoration-none'>
            <v-icon class='mr-2'>mdi-home</v-icon> Home
          </router-link>
        </v-col>
        <v-col cols='9' class='routelink rounded-lg mt-5'>
          <router-link to='/user/create' class='py-3 pl-5 pr-16 white--text text-decoration-none'
            ><v-icon class='mr-2'>mdi-plus-circle-outline</v-icon> Create
          </router-link>
        </v-col>
        <v-col cols='9' class='routelink rounded-lg mt-5 text-decoration-none'>
          <router-link to='/user/profile' class='py-3 pl-5 pr-16 white--text text-decoration-none'
            ><v-icon class='mr-2'>mdi-account-circle-outline</v-icon> Profile
          </router-link>
        </v-col>
      </v-row>
      <v-row class="logout">
        <v-col cols='12' offset='2' class='routelink rounded-lg mb-5 pr-4' >
          <a
            href='/login'
            @click='LogOut'
            class='py-3 pl-5 pr-16 white--text text-decoration-none'>
            <v-icon class='mr-2'>mdi-logout</v-icon>Log out
          </a>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <v-app-bar app elevation="0" v-if='authToken' color="white">
      <v-app-bar-nav-icon @click='drawer = !drawer'></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h5 pl-1">{{ $route.meta.RouteName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <button-component
        class="white--text"
        BtnColor="#478C5C"
        rounded
        icons="mdi-plus-circle-outline"
        RouterPath="/user/create"
        BtnRouter="create"/>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'BoilerPlate',
  data () {
    return {
      drawer: true,
      authToken: localStorage.getItem('authToken')
    }
  },
  methods: {
    LogOut () {
      localStorage.removeItem('authToken')
    }
  }
}
</script>

<style scoped>
.routelink {
  font-size: 1.2rem;
  background-color: #478c5c
}
.routelink:hover {
  background-color: rgb(3, 91, 53)
}
.logout{
  position: absolute;
  bottom: 0;
}
</style>
