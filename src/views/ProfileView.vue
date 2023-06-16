<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-img height="300" class="grey darken-4" src="../assets/CoverImage.jpeg" />
        </v-col>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col cols="2">
              <v-avatar size="200" style="top: -60%; left: 5%;">
                <img src="../assets/pf1.jpeg" alt="Patrick">
              </v-avatar>
            </v-col>
            <v-col cols="4">
              <p class="text-h5">_Username007</p>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <button-component
                BtnColor="#478C5C"
                class="mr-6"
                btn-label="Edit Profile"
                outlined
                rounded
                Icons="mdi-account-edit" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="contain-detail" >
        <v-tabs
          v-model="tab"
          fixed-tabs
          centered
          color="#478c5c"
          >
            <v-tab
              v-for="t in tabs"
              :key="t"
            >
              {{ t }}
            </v-tab>
          </v-tabs>
          <v-divider></v-divider>
        <v-container>
          <v-tabs-items v-model="tab">
          <v-tab-item>
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
          </v-tab-item>
          <v-tab-item>
            <template v-for="n in 2">
              <v-row class="pa-4" :key="n">
                <v-col class="d-flex align-center" cols="12">
                  <v-avatar class="mr-3" size="40">
                    <img src="../assets/Img/pf2.jpg" alt="Patrick">
                  </v-avatar>
                  <p class="mt-3">Your Name</p>
                </v-col>
                <v-col cols="12">
                <v-card
                  height="auto"
                  class="pa-md-4 mx-lg-auto text-center"
                  elevation="8">
                  <v-row no-gutters>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      lg="4"
                    >
                      <v-img
                        max-width="500"
                        max-height="470"
                        src="../assets/HomeImage.jpeg"
                        class="align-start"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      lg="8"
                    >
                      <v-row class="d-flex align-start" style="height: 60%" no-gutters>
                        <v-col cols="12">
                          <v-card-title class="text-h5">Maldives Holiday Trip</v-card-title>
                          <v-card-text class="text-left">
                            Find cheap return or one-way flights to Maldives.
                            Book and compare flight deals to
                            Maldives and save now! Get great flight deals to Maldives for 2023.
                          </v-card-text>
                        </v-col>
                        <v-col cols="12">
                        </v-col>
                      </v-row>
                      <v-row class="d-flex align-end" style="height: 40%" no-gutters>
                        <v-col class="d-flex align-center" cols="12" sm="12" md="6">
                          <v-card-subtitle class="grey--text">
                            By: Naruto
                          </v-card-subtitle>
                        </v-col>
                        <v-col class="d-flex align-center justify-center mb-2" cols="12" sm="12" md="6">
                          <v-card-actions>
                            <button-component
                              :BtnColor="toggle ? 'success' : 'primary'"
                              Icons="mdi-bookmark"
                              icon />
                            <button-component
                              BtnColor="#607D8B"
                              class="white--text"
                              btn-label="Detail" />
                            <button-component
                              BtnColor="#478C5C"
                              class="white--text"
                              btn-label="Register" />
                          </v-card-actions>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
                </v-col>
              </v-row>
            </template>
          </v-tab-item>
          <v-tab-item>
            <template v-for="n in 2">
              <v-row class="pa-4" :key="n">
                <v-col class="d-flex align-center" cols="12">
                  <v-avatar class="mr-3" size="40">
                    <img src="../assets/Img/pf2.jpg" alt="Patrick">
                  </v-avatar>
                  <p class="mt-3">Your Name</p>
                </v-col>
                <v-col cols="12">
                <v-card
                  height="auto"
                  class="pa-md-4 mx-lg-auto text-center"
                  elevation="8">
                  <v-row no-gutters>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      lg="4"
                    >
                      <v-img
                        max-width="500"
                        max-height="470"
                        src="../assets/HomeImage.jpeg"
                        class="align-start"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      lg="8"
                    >
                      <v-row class="d-flex align-start" style="height: 60%" no-gutters>
                        <v-col cols="12">
                          <v-card-title class="text-h5">Maldives Holiday Trip</v-card-title>
                          <v-card-text class="text-left">
                            Find cheap return or one-way flights to Maldives.
                            Book and compare flight deals to
                            Maldives and save now! Get great flight deals to Maldives for 2023.
                          </v-card-text>
                        </v-col>
                        <v-col cols="12">
                        </v-col>
                      </v-row>
                      <v-row class="d-flex align-end" style="height: 40%" no-gutters>
                        <v-col class="d-flex align-center" cols="12" sm="12" md="6">
                          <v-card-subtitle class="grey--text">
                            By: Naruto
                          </v-card-subtitle>
                        </v-col>
                        <v-col class="d-flex align-center justify-center mb-2" cols="12" sm="12" md="6">
                          <v-card-actions>
                            <button-component
                              :BtnColor="toggle ? 'success' : 'primary'"
                              Icons="mdi-bookmark"
                              icon />
                            <button-component
                              BtnColor="#607D8B"
                              class="white--text"
                              btn-label="Detail" />
                            <button-component
                              BtnColor="error"
                              class="white--text"
                              btn-label="UnRegister" />
                          </v-card-actions>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
                </v-col>
              </v-row>
            </template>
          </v-tab-item>
          <v-tab-item>
            <template v-for="n in 2">
              <v-row class="pa-4" :key="n">
                <v-col class="d-flex align-center" cols="12">
                  <v-avatar class="mr-3" size="40">
                    <img src="../assets/Img/pf2.jpg" alt="Patrick">
                  </v-avatar>
                  <p class="mt-3">Your Name</p>
                </v-col>
                <v-col cols="12">
                <v-card
                  height="auto"
                  class="pa-md-4 mx-lg-auto text-center"
                  elevation="8">
                  <v-row no-gutters>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      lg="4"
                    >
                      <v-img
                        max-width="500"
                        max-height="470"
                        src="../assets/HomeImage.jpeg"
                        class="align-start"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      lg="8"
                    >
                      <v-row class="d-flex align-start" style="height: 60%" no-gutters>
                        <v-col cols="12">
                          <v-card-title class="text-h5">Maldives Holiday Trip</v-card-title>
                          <v-card-text class="text-left">
                            Find cheap return or one-way flights to Maldives.
                            Book and compare flight deals to
                            Maldives and save now! Get great flight deals to Maldives for 2023.
                          </v-card-text>
                        </v-col>
                        <v-col cols="12">
                        </v-col>
                      </v-row>
                      <v-row class="d-flex align-end" style="height: 40%" no-gutters>
                        <v-col class="d-flex align-center" cols="12" sm="12" md="6">
                          <v-card-subtitle class="grey--text">
                            By: Naruto
                          </v-card-subtitle>
                        </v-col>
                        <v-col class="d-flex align-center justify-center mb-2" cols="12" sm="12" md="6">
                          <v-card-actions>
                            <button-component
                              :BtnColor="toggle ? 'success' : 'primary'"
                              Icons="mdi-bookmark"
                              icon />
                            <button-component
                              BtnColor="#607D8B"
                              class="white--text"
                              btn-label="Detail" />
                            <button-component
                              btn-label="Joined"
                              disabled/>
                          </v-card-actions>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
                </v-col>
              </v-row>
            </template>
          </v-tab-item>
        </v-tabs-items>
        </v-container>
      </v-row>
    </v-container>
</template>
<style>
/* .container-detail {
  position: relative;
  top: 3%
} */
.card {
  position: relative;
  top: 100%
}
</style>

<script>
export default {
  data () {
    return {
      tab: null,
      tabs: ['Your Blog', 'Favorite', 'Upcoming', 'Joined']
    }
  }
}
</script>
