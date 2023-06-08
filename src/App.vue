<template>
  <v-app>
    <v-navigation-drawer v-model='drawer' app dark v-if='authToken'>
      <router-link to='/home'>Home </router-link> |
      <router-link to='/create'> create </router-link> |
      <router-link to='/profile'> profile </router-link> |
      <a href='/' @click='LogOut'> logout </a>
    </v-navigation-drawer>
    <v-app-bar app v-if='authToken'>
      <v-app-bar-nav-icon @click='drawer = !drawer'></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
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
