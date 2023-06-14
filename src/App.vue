<template>
  <v-app>
    <v-navigation-drawer v-model='drawer' app dark v-if='authToken'>
      <router-link to='/home'>Home </router-link> |
      <router-link to='/create'> create </router-link> |
      <router-link to='/profile'> profile </router-link> |
      <a href='/' @click='LogOut'> logout </a>
    </v-navigation-drawer>
    <v-app-bar app v-if='authToken' BtnColor="#478C5C">
      <v-app-bar-nav-icon @click='drawer = !drawer'>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to='/create' v-slot:default="{navigate}">
        <button-component-vue BtnLabel="Create" rounded Icons="mdi-plus" @click="navigate" role="link" BtnColor="#478C5C"/>
      </router-link>
    </v-app-bar>
    <v-main>
      <v-container
      class="d-flex justify-center align-center text-h5"
      style="min-height: 300px;">
      <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ButtonComponentVue from './components/ButtonComponent.vue'
export default {
  name: 'App',
  components: {
    ButtonComponentVue
  },
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
