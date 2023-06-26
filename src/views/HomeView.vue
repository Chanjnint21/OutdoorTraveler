<template>
  <v-container class="MainContain">
    <v-row>
      <v-col cols="12" class="d-flex align-center pb-1">
        <v-text-field
          v-model="searchQuery"
          @input="search(searchQuery)"
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
      <template v-for="item in items">
        <v-col :key="item.id">
          <card-component
            height="auto"
            class="pa-md-12 mx-lg-auto text-center"
            elevation="8"
            :item="item"
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
      searchQuery: '',
      Busy: false
    }
  },
  methods: {

    search (q) {
      setTimeout(async () => {
        this.items = await Service.handleSearchQuery(q)
      }, 1000)
    }
  },
  async created () {
    try {
      this.items = await Service.getList()
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
