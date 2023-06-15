<template>
  <v-app id="inspire">
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex align-center pb-1">
          <v-text-field
            label="Search"
            outlined
            rounded
            style="width: 1000px;"
            prepend-inner-icon="mdi-magnify" />
        </v-col>
        <v-col>
          <v-row>
            <v-col
              cols="12"
              md="3">
              <select-field
                color="#1B5E20"
                rounded
                dense
                class="d-flex align-center justify-start"
                outlined
                label="Sort By"
                items />
            </v-col>
            <v-col
              cols="12"
              md="9"
            >
              <v-row class="d-flex justify-end" no-gutters>
                <v-col cols="6" md="2">
                  <button-component
                    class="white--text"
                    BtnColor="#478C5C"
                    btn-label="Populars"
                    rounded
                    block/>
                </v-col>
                <v-col cols="6" sm="2">
                  <button-component
                    class="ml-2"
                    BtnColor="#478C5C"
                    btn-label="Recommend"
                    outlined
                    rounded
                    @click="Onclick"
                    block/>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- Vue to create a loop that will repeat the contents of the template four times, with each iteration assigned a variable named n -->
      <template v-for="n in 10">
        <v-col :key="n">
          <v-card
            height="auto"
            class="pa-md-4 mx-lg-auto text-center"
            elevation="8">
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="6"
                md="6"
                lg="6"
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
                lg="6"
              >
                <v-row class="d-flex align-start" style="height: 60%" no-gutters>
                  <v-col cols="12">
                    <v-card-title class="text-h5">Maldives Holiday Trip</v-card-title>
                    <v-card-text class="text-left">
                      Find cheap return or one-way flights to Maldives.
                      Book and compare flight deals to
                      Maldives and save now! Get great flight deals to Maldives for 2023.
                      Book and compare flight deals to
                      Maldives and save now! Get great flight deals to Maldives for 2023.
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
                      By: Jennie
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
        <v-responsive v-if="n === 2" :key="`width-${n}`" width="100%"></v-responsive>
      </template>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination v-model="page" class="my-4" :length="5" circle></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import ButtonComponent from '@/components/ButtonComponent.vue'
import SelectField from '@/components/SelectField.vue'

export default {
  name: 'HomePage',
  components: {
    ButtonComponent,
    SelectField
  },
  data () {
    return {
      show: false,
      page: 1
    }
  }
}
</script>s
