<template>
    <v-container class="MainContain">
      <v-row>
        <v-col cols="12" class="d-flex align-center pb-1">
          <v-text-field
            label="Search"
            outlined
            rounded
            style="width: 1000px;"
            prepend-inner-icon="mdi-magnify"
          />
        </v-col>
        <v-col cols="12" class="d-flex justify-space-around mb-3">
          <!-- <trip-btn
            class="white--text"
            BtnColor="#478C5C"
            btn-label="Newest"
            rounded
          /> -->
          <template v-for="n of 6">
            <trip-btn
              :key= 'n'
              BtnColor="#1687A7"
              :btn-label="Sortlabel[n]"
              rounded
              outlined
            />
          </template>
        </v-col>
      </v-row>
      <!-- Vue to create a loop that will repeat the contents of the template four times, with each iteration assigned a variable named n -->
      <template v-for="n in 10">
        <v-col :key="n">
          <card-component
            height="auto"
            class="pa-md-4 mx-lg-auto text-center"
            elevation="8"
            :imageUrl= "image" >
          </card-component>
        </v-col>
      </template>
    </v-container>
</template>
<script>
import HomeImage from '@/assets/HomeImage.jpeg'
export default {
  name: 'HomePage',
  data () {
    return {
      show: false,
      page: 1,
      Sortlabel: ['', 'newest', 'oldest', 'Popular', 'Recommend', 'Price to High', 'Price to Low'],
      image: HomeImage
    }
  }
}
</script>
