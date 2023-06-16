<template>
  <v-app id="inspire">
    <v-container>
      <v-row>
        <div style="position: relative;">
          <v-img height="300" class="grey darken-4" src="../assets/CoverImage.jpeg" />
          <v-avatar size="150" style="position: absolute; top: 75%; left: 5%;">
            <img src="../assets/pf1.jpeg" alt="Patrick">
          </v-avatar>
        </div>
        <v-col cols="11" class="d-flex justify-end">
          <button-component BtnColor="#478C5C" class="mr-6" btn-label="Edit Profile" outlined rounded
            Icons="mdi-account-edit" />
        </v-col>
      </v-row>
      <div class="container-detail">
        <v-tabs color="#478C5C">
          <v-tab  class="mr-12">Your Blogs</v-tab>
          <v-tab  class="mr-12">Favorite</v-tab>
          <v-tab  class="mr-12">Upcoming</v-tab>
          <v-tab  class="mr-12">Joined</v-tab>
          <v-tab-item>
            <v-divider></v-divider>
            <div class="card">
              <v-row>
                <v-col cols="12" class="d-flex align-end">
                  <v-avatar>
                    <img src="../assets/pf1.jpeg" alt="Patrick">
                  </v-avatar>
                  <div class="mb-2">
                    <small class="pl-1">Patrick</small>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <template v-for="n in 3">
                  <v-col :key="n">
                    <card-component
                    height="auto"
                    class="pa-md-4 mx-lg-auto text-center"
                    elevation="8"
                    imageUrl="HomeImage.jpeg" >
                  </card-component>
                  </v-col>
                  <v-responsive v-if="n === 2" :key="`width-${n}`" width="100%"></v-responsive>
                </template>
              </v-row>
            </div>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-container>
  </v-app>
</template>
<style>
.container-detail {
  position: relative;
  top: 3%
}

.card {
  position: relative;
  top: 100%
}
</style>

<script>
export default {
  data () {
    return {
      tab: null
    }
  }
}
</script>
