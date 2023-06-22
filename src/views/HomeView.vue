<template>
  <v-container class="MainContain">
    <v-row>
      <!-- Search field -->
      <v-col cols="12" class="d-flex align-center pb-1">
        <v-text-field
          label="Search"
          outlined
          rounded
          style="width: 1000px;"
          prepend-inner-icon="mdi-magnify"
        />
      </v-col>
      <!-- Sort buttons -->
      <v-col cols="12" class="d-flex justify-space-around mb-3">
        <template v-for="n of 6">
          <trip-btn
            :key="n"
            BtnColor="#1687A7"
            :btn-label="Sortlabel[n]"
            rounded
            outlined
          />
        </template>
      </v-col>
    </v-row>
    <!-- Trip cards -->
    <template v-for="item in items">
      <v-col :key="item.id">
        <card-component
          height="auto"
          class="pa-md-4 mx-lg-auto text-center"
          elevation="8"
          :item="item"
          :image-url="item.image"
          :title="item.title"
        />
      </v-col>
    </template>
  </v-container>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'
import HomeImage from '@/assets/HomeImage.jpeg'
import axios from 'axios'

export default {
  name: 'HomePage',
  components: {
    CardComponent
  },
  data () {
    return {
      show: false,
      page: 1,
      Sortlabel: ['', 'newest', 'oldest', 'Popular', 'Recommend', 'Price to High', 'Price to Low'],
      image: HomeImage,
      items: []
    }
  },
  async created () {
    try {
      const response = await axios.get('http://localhost:3000/tripcards')
      this.items = response.data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
