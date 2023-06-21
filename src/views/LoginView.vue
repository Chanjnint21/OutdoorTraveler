<template>
  <v-container fluid class="Login d-flex align-center justify-center" style="height: 100%;">
    <v-card class="LoginCard d-flex rounded-xl" elevation="5">
      <v-row class='pa-5 my-1'>
        <v-col
          class="d-flex align-center justify-center mr-5"
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
          <v-form ref="form" @submit.prevent="loginToken">
            <v-row class="d-flex justify-center">
              <h1 style="color: #1687A7; margin-bottom: 20px;">Sign In</h1>
            </v-row>
            <v-col cols="12" class="mb-3">
              <v-text-field
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
            <v-col cols="12" class="mb-3">
              <v-text-field
                v-model="password"
                label="Password"
                name="password"
                outlined
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                hint="Password must be at least 8 characters"
                required color="#1687A7"
                :rules="LoginRules"
                :type="show ? 'text' : 'password'"
                hide-details="auto"
                rounded
              />
            </v-col>
            <v-col cols="12" class="mb-3">
              <trip-btn
                type="submit"
                @click="loginToken"
                rounded
                class="white--text"
                BtnColor="#1687A7"
                btn-label="Login"
                x-large
                block
              />
              <p class="text-center text-small error--text" v-if="login">Invalid email or password </p>
            </v-col>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
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
    // loginToken () {
    //   if (this.$refs.form.validate()) {
    //     localStorage.setItem('authToken', true)
    //     location.replace('/user/home')
    //   }
    // }
    loginToken () {
      // send HTTP get request using axios to http://localhost:3000/users
      this.$http.get('http://localhost:3000/users')
        .then(response => {
          // searching for password and email that match to input
          const user = response.data.find(user => user.email === this.email && user.password === this.password)
          // If match, redirect to the home page
          if (user) {
            localStorage.setItem('authToken', true)
            location.replace('/user/home')
          } else {
            this.login = true
            this.password = ''
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.Login {
  background-color: #1687A7;
}

@media screen and (min-width: 850px) {
  .LoginCard {
    width: 800px;
  }
}
</style>
