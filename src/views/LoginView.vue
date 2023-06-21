<template>
  <v-container fluid class="Login d-flex align-center justify-center" style=" height: 100%; ">
    <v-card class="LoginCard d-flex rounded-xl" elevation="5" >
      <v-row class='pa-5 my-5'>
        <v-col
          class="d-flex align-center justify-center mr-5"
          cols="12"
          md="5"
          sm="5"
          xs="12"
        >
          <v-img
            contain
            src='../assets/Img/circle-logo-turbine-png.webp'
            max-height="400"
            max-width="270"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
          sm="6"
          xs="12"
        >
          <v-form ref="form">
            <v-row class="d-flex justify-center">
              <h1 style="color: #478c5c" >Sign In</h1>
              <v-col cols="12" class="mb-3">
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  outlined
                  color="#478c5c"
                  name="email"
                  hide-details="auto"
                  rounded
                  :rules='LoginRules'
                />
              </v-col>
              <v-col cols="12" class="mb-3">
                <v-text-field
                  v-model="password"
                  label="Password"
                  name="password"
                  outlined
                  :icons="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
                  hint="Password must be at least 8 characters"
                  required
                  color="#478c5c"
                  :rules='LoginRules'
                  :type="show ? 'text' : 'password'"
                  hide-details="auto"
                  rounded
                />
              </v-col>
              <v-col cols="12">
                <trip-btn
                  @click="LoginToken"
                  rounded
                  class="white--text"
                  BtnColor="#478c5c"
                  btn-label="Login"
                  x-large
                  block
                />
              </v-col>
            </v-row>
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
      LoginRules: [
        value => !!value || 'This field is required.'
      ]
    }
  },

  methods: {
    LoginToken () {
      if (this.$refs.form.validate()) {
        localStorage.setItem('authToken', true)
        location.replace('/user/home')
      }
    }
  }
}
</script>

<style>
  .Login{
    background: #013a21;
  }
  @media(min-width: 850px){
    .LoginCard{
      width: 800px;
    }
  }
</style>
