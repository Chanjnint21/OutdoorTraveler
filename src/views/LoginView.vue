<template>
  <v-container fluid class="Login d-flex align-center justify-center" style=" height: 100%; ">
    <v-card class="d-flex rounded-xl" style=" width: auto;, height: auto; " elevation="5" >
      <v-row class='pa-5 my-5'>
        <v-col class="d-flex align-center justify-center"
          cols="12"
          md="5"
          sm="5"
          xs="12"
        >
        <v-img
          contain
          src='../assets/Img/circle-logo-turbine-png.webp'
          max-height="400"
          max-width="270"/>
        </v-col>
        <v-col
          cols="12"
          md="7"
          sm="7"
          xs="12"
        >
          <v-form>
            <v-row class="d-flex justify-center green--text">
              <h1 >Sign In</h1>
              <v-col cols="12">
              <text-field
              v-model="email"
              label="E-mail"
              outlined
              color="#478c5c"
              name="email"/>
            </v-col>
            <v-col cols="12">
              <text-field
              label="Password"
              name="password"
              outlined
              :icons="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              hint="Password must be at least 8 characters"
              required
              color="#478c5c"
              :type="show ? 'text' : 'password'"/>
            </v-col>
            <button-component
            @click="LoginToken"
            rounded
            class="white--text ml-2 font-size:24px"
            BtnColor="#478c5c"
            btn-label="Login"
            x-large
            width="700"
          />
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
      show: false
    }
  },
  methods: {
    LoginToken () {
      localStorage.setItem('authToken', true)
      location.replace('/user/home')
    }
  }
}
</script>

<style>
  .Login{
    background: #013a21;
  }
</style>
