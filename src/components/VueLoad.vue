<template>
  <div class="loader-container">
    <img class="loader" src="../assets/Img/logo276678.png"/>
  </div>
</template>

<style>
.loader-container {
  position: relative;
  width: 100%;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
