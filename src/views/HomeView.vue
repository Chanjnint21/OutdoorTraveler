<template>
  <v-app id="inspire">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-text-field label="Search" outlined rounded style="width: 1000px;" prepend-inner-icon="mdi-magnify" />
        </v-col>
        <v-row>
          <v-col cols="2"><select-field color="#1B5E20" class="d-flex align-center justify-start mb-6" outlined
              label="Sort By" items /></v-col>
          <!-- <v-chip-group>
            <v-chip v-for="item in items" :key="item"> {{ item }}</v-chip>
          </v-chip-group> -->
          <v-col cols="10" class="d-flex justify-end">
            <button-component BtnColor="#478C5C" class="mr-6" btn-label="Popular" rounded />
            <button-component BtnColor="#478C5C" class="mr-6" btn-label="Recommend" outlined rounded />
            <button-component BtnColor="#478C5C" class="mr-6" btn-label="Price to High" outlined rounded
            @click="Onclick" />
            <button-component BtnColor="#478C5C" class="mr-6" btn-label="Price High to Low" outlined rounded
            @click="Onclick"/>
          </v-col>
        </v-row>
      </v-row>
      <!-- Vue to create a loop that will repeat the contents of the template four times, with each iteration assigned a variable named n -->
      <template v-for="n in 10">
        <v-col :key="n">
          <v-card width="1200" height="500" class="pa-md-4 mx-lg-auto text-center" elevation="8">
            <v-row>
              <v-col cols="6">
                <v-img max-width="500" max-height="470" src="../assets/HomeImage.jpeg" class="align-start" />
              </v-col>
              <v-col cols="6">
                <v-row class="d-flex align-start">
                  <v-card-title class="text-h5 mb-5">Maldives Holiday Trip</v-card-title>
                  <v-card-subtitle class="pa-2">Find cheap return or one-way flights to Maldives. Book and compare flight deals to
                    Maldives and save now! Get great flight deals to Maldives for 2023.</v-card-subtitle>
                </v-row>
                <v-row>
                  <v-col cols="12" class="d-flex align-end justify-end">
                    <v-card-actions>
                      <v-col cols="12" class="d-flex align-end">
                          <div class="grey--text mb-2">
                            <small class="pl-1">By Jennie</small>
                          </div>
                            <button-component :BtnColor="toggle ? 'success' : 'primary'" Icons="mdi-bookmark" icon />
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
