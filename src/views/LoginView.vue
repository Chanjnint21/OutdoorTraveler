<template>
  <div class="about">
    <h1>Login Page</h1>
    <button-component @click="LoginToken" btn-label="Login" />
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
