<template>
  <v-app id="inspire">
    <v-container fluid>
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
                    <v-card width="1200" height="500" class="pa-md-4 mx-lg-auto text-center" elevation="8">
                      <v-row>
                        <v-col cols="6">
                          <v-img max-width="500" max-height="470" src="../assets/HomeImage.jpeg" class="align-start" />
                        </v-col>
                        <v-col cols="6">
                          <v-row class="d-flex align-start">
                            <v-card-title class="text-h5 mb-5">Maldives Holiday Trip</v-card-title>
                            <v-card-subtitle class="pa-2">Find cheap return or one-way flights to Maldives. Book and
                              compare
                              flight deals to
                              Maldives and save now! Get great flight deals to Maldives for 2023.</v-card-subtitle>
                          </v-row>
                          <v-row>
                            <v-col cols="12" class="d-flex align-end justify-end">
                              <v-card-actions>
                                <v-col cols="12" class="d-flex align-end">
                                  <div class="grey--text mb-2">
                                    <small class="pl-1">By You</small>
                                  </div>
                                  <button-component BtnColor="#607D8B" Icons="mdi-bookmark" icon />
                                  <button-component BtnColor="#607D8B" class="mr-6 white--text" btn-label="Detail" />
                                  <button-component BtnColor="#478C5C" class="mr-6 white--text " btn-label="Register" />
                                </v-col>
                              </v-card-actions>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
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
