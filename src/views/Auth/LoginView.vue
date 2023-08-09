<template>
  <v-container fluid class="Login d-flex align-center justify-center" style="height: 100%;">
    <template v-if="greeting">
      <h1 style="color:white">Welcome Back <span id="fade-in-text">!</span></h1>
      <!-- <h1 style="color:white"> Be a planer and Enjoy the trip to the Fullest</h1> -->
    </template>
    <v-card class="LoginCard d-flex rounded-xl" elevation="5" v-else>
      <v-row class='pa-5 my-1'>
        <v-col
          class="d-flex align-center justify-center mx-5"
          cols="12"
          md="5"
          sm="5"
          xs="12"
        >
          <v-img
            contain src="@/assets/Img/logo1687A7.png"
            max-height="400"
            max-width="270"
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" xs="12">
          <v-form ref="form">
            <v-row class="d-flex justify-center">
              <h1 style="color: #1687A7; margin-bottom: 20px;">Sign In</h1>
            </v-row>
            <v-col cols="12" class="mb-2">
              <text-field
                v-model="email"
                label="Email"
                outlined
                color="#1687A7"
                name="email"
                hide-details="auto"
                rounded
                :rules="LoginRules"
              />
            </v-col>
            <v-col cols="12" class="mb-2">
              <text-field
                v-model="password"
                label="Password"
                name="password"
                outlined
                :icons="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                hint="Password must be at least 8 characters"
                required
                color="#1687A7"
                :rules="LoginRules"
                :type="show ? 'text' : 'password'"
                hide-details="auto"
                rounded
              />
            </v-col>
            <v-col cols="12">
              <trip-btn
                @click="loginToken"
                rounded
                class="white--text"
                color="#1687A7"
                btn-label="Login"
                dense
                block
              />
              <p class="text-center text-small error--text" v-if="login">Invalid email or password </p>
            </v-col>
            <p class="text-center text-small" >Don't have account? <router-link to="/register" style="color: #1687A7">Register Now</router-link></p>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { Service } from '@/service/index.js'

export default {
  data () {
    return {
      greeting: false,
      show: false,
      email: '',
      password: '',
      login: '',
      LoginRules: [
        value => !!value || 'This field is required.'
      ]
    }
  },

  methods: {
    async loginToken () {
      try {
        const Token = await Service.logIn(this.email, this.password)
        if (Token.length === 1) {
          localStorage.setItem('authToken', true)
          localStorage.setItem('authUser', JSON.stringify(Token))
          this.greeting = true
          this.toHomePage()
        } else {
          this.login = true
          this.password = ''
        }
      } catch (e) {
        console.log(e)
      }
    },
    toHomePage () {
      setTimeout(() => {
        this.$router.push('/user/home')
      }, 3000)
    }
  }
}
</script>

<style scoped>
#fade-in-text {
  font-family: Arial;
  animation: ease-in 2s infinite;
}

@keyframes ease-in {
  0% { opacity: 0; }
  25% { opacity: 1; }
  50% { opacity: 0; }
  75% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
