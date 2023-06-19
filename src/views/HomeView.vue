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
                  <trip-btn
                    class="white--text"
                    BtnColor="#478C5C"
                    btn-label="Popular"
                    rounded
                    block
                  />
                </v-col>
                <v-col cols="6" sm="2">
                  <trip-btn
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
          <card-component
            height="auto"
            class="pa-md-4 mx-lg-auto text-center"
            elevation="8"
            imageUrl="HomeImage.jpeg" >
          </card-component>
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

export default {
  name: 'HomePage',
  data () {
    return {
      show: false,
      page: 1
    }
  }
}
</script>
