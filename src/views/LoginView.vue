<template>
  <div class="about">
    <h1>Login Page</h1>
    <v-btn @click="LoginToken">login</v-btn>
  </div>
</template>

<script>
// import router from '@/router'
export default {
  methods: {
    LoginToken () {
      localStorage.setItem('authToken', true)
      location.replace('/home')
    }
  }
}
</script>
