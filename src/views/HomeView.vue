<template>
  <v-container class="MainContain">
    <v-row>
      <v-col cols="12" class="d-flex align-center pb-1">
        <v-text-field
          v-model="searchQuery"
          @input="handleSearchQuery(searchQuery)"
          label="Search"
          outlined
          rounded
          style="width: 1000px;"
          prepend-inner-icon="mdi-magnify"
        />
      </v-col>
      <v-col cols="12" class="d-flex justify-space-around mb-3">
        <template v-for="n in 6">
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
    <v-row>
      <template v-for="item in filteredCards">
        <v-col :key="item.id">
          <card-component
            height="auto"
            class="pa-md-12 mx-lg-auto text-center"
            elevation="8"
            :item="item"
            :image-url="item.image"
            :title="item.title"
          />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'
import HomeImage from '@/assets/HomeImage.jpeg'
import { Service } from '@/service/index.js'

export default {
  name: 'HomePage',
  components: {
    CardComponent
  },
  data () {
    return {
      page: 1,
      Sortlabel: [
        '',
        'newest',
        'oldest',
        'Popular',
        'Recommend',
        'Price to High',
        'Price to Low'
      ],
      image: HomeImage,
      items: [],
      searchQuery: ''
    }
  },
  computed: {
    filteredCards () {
      return this.items.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    // update the value of searchQuery data with current value of the search bar.
    async search (q) {
      const response = await Service.handleSearchQuery
      console.log('response', response)
    }
  },
  async created () {
    try {
      const response = await Service.getList()
      this.items = response
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
