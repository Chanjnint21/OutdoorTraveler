<template>
  <v-app>
    <v-navigation-drawer
      v-model='drawer'
      app
      dark
      v-if='authToken'
      color='#1687A7'
    >
      <v-row class='d-flex justify-center' style="height: 50vh">
        <v-col cols='12' class='d-flex justify-center my-5'>
          <v-img
            contain
            src='@/assets/Img/logoF6F5F5.png'
            max-height='400'
            max-width='200'
          />
        </v-col>
        <v-col cols='9' class='pa-1 mx-1 my-2'>
          <trip-btn
            class="RouteBtn rounded-lg"
            icon-class="pa-2"
            BtnColor="#276678"
            BtnLabel="Home"
            icons="mdi-home"
            @click="toHome"
            block
            x-large
          />
        </v-col>
        <v-col cols='9' class='pa-1 mx-1 my-2'>
          <trip-btn
            class="RouteBtn rounded-lg"
            icon-class="pa-2"
            BtnColor="#276678"
            BtnLabel="Profile"
            icons="mdi-account-circle-outline"
            @click="ToProfile"
            block
            x-large
          />
        </v-col>
      </v-row>
      <v-row class='d-flex justify-center align-end' style="height: 50vh">
        <v-col cols='9' class='pa-1 mx-1' >
          <trip-btn
            class="RouteBtn rounded-lg"
            icon-class="pa-2"
            BtnColor="#276678"
            BtnLabel="Log Out"
            icons="mdi-logout"
            @click="LogOut"
            block
            x-large
          />
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <v-app-bar app elevation="0" v-if='authToken' color="white">
      <v-app-bar-nav-icon @click='drawer = !drawer'></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h5 pl-1">{{ $route.meta.RouteName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <trip-btn
        class="white--text"
        BtnColor="#1687A7"
        BtnLabel="Create"
        rounded
        icons="mdi-plus-circle-outline"
        @click="toCreatepage"
      />
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
      location.replace('/login')
    },
    toCreatepage () {
      location.replace('/user/create')
    },
    toHome () {
      location.replace('/user/home')
    },
    ToProfile () {
      location.replace('/user/profile')
    }
  }
}
</script>

<style scoped>
.RouteBtn{
  display: flex;
  justify-content: start;
}
</style>
