<template>
  <v-container fluid class="Login d-flex align-center justify-center" style=" height: 100%; ">
    <v-card class="LoginCard d-flex rounded-xl" elevation="5">
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
            src='../assets/Img/logo1687A7.png'
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
          <v-form>
            <v-row class="d-flex justify-center">
              <h1 style="color: #1687A7" >Sign In</h1>
              <v-col cols="12" class="mb-3">
              <text-field
                v-model="email"
                label="E-mail"
                outlined
                color="#1687A7"
                name="email"
                hide-details="auto"
                rounded
                :rules='LoginRules'
              />
            </v-col>
            <v-col cols="12" class="mb-3">
              <text-field
                label="Password"
                name="password"
                outlined
                :icons="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                hint="Password must be at least 8 characters"
                required
                color="#1687A7"
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
                BtnColor="#1687A7"
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
      LoginRules: [
        value => !!value || 'This field Required.'
      ]
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
    background: #1687A7;
  }
  @media(min-width: 850px){
    .LoginCard{
      width: 800px;
    }
  }
</style>
