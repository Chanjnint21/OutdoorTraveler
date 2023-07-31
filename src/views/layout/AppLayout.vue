<template>
  <v-app>
    <v-navigation-drawer
      v-model='drawer'
      app
      dark
      v-if='crrUser'
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
        <v-col cols='9' class='pa-1 mx-1'>
          <trip-btn
            class="RouteBtn rounded-lg"
            icon-class="pa-2"
            BtnColor="#276678"
            BtnLabel="Home"
            icons="mdi-home"
            @click="toHome"
            block
            x-large
          >
          <template #icon>
            <v-icon class="pa-2">mdi-home</v-icon>
          </template>
          </trip-btn>
        </v-col>
        <v-col cols='9' class='pa-1 mx-1'>
          <trip-btn
            class="RouteBtn rounded-lg"
            BtnColor="#276678"
            BtnLabel="Profile"
            @click="ToProfile"
            block
            x-large
          >
            <template #icon>
              <v-icon class="pa-2">mdi-account-circle-outline</v-icon>
            </template>
          </trip-btn>
        </v-col>
      </v-row>
      <v-row class='d-flex justify-center align-end' style="height: 50vh">
        <v-col cols='9' class='pa-1 mx-1' >
          <trip-btn
            class="RouteBtn rounded-lg"
            BtnColor="#276678"
            BtnLabel="Log Out"
            @click="LogOut"
            block
            x-large
          >
            <template #icon>
              <v-icon class="pa-2">mdi-logout</v-icon>
            </template>
          </trip-btn>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <v-app-bar app elevation="0" v-if='crrUser' color="white">
      <v-app-bar-nav-icon @click='drawer = !drawer'></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h5 pl-1">{{ $route.meta.RouteName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <trip-btn
        v-if="!!$route.meta.isCreate"
        class="white--text"
        BtnColor="#1687A7"
        BtnLabel="Create"
        rounded
        @click="toCreatepage"
        >
        <template v-slot:icon>
          <v-icon class="pr-1">mdi-plus-circle-outline</v-icon>
        </template>
    </trip-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { Service } from '@/service/index.js'

export default {
  name: 'BoilerPlate',
  data () {
    return {
      currentRoute: '',
      lol: this.$route.meta.RouteName,
      drawer: true,
      crrUser: JSON.parse(localStorage.getItem('authToken'))
    }
  },
  methods: {
    async JoinedTrip () {
      // check if this card have expire or not
      const card = await Service.getList()
      const todayDate = new Date().toJSON().slice(0, 10)
      // console.log(todayDate)
      for (let i = 0; i < card.length; i++) {
        const cardDate = `${card[i].start_date.slice(6, 10)}-${card[i].start_date.slice(3, 5)}-${card[i].start_date.slice(0, 2)}`
        // console.log(card[i].title, cardDate)
        if (cardDate < todayDate && !card[i].expiry) {
          await Service.expiryCard(card[i].id)
        }
      }
    },
    LogOut () {
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
      this.$router.push('/login')
    },
    toCreatepage () {
      this.$router.push('/user/create')
    },
    toHome () {
      this.$router.push('/user/home').catch(() => {})
    },
    ToProfile () {
      this.$router.push('/user/profile').catch(() => {})
    }
  },
  created () {
    this.JoinedTrip()
  }
}
</script>

<style scoped>
.RouteBtn{
  display: flex;
  justify-content: start;
}
</style>
