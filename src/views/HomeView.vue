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
      <v-col cols="12">
        <v-btn-toggle v-model="selectedBtn" class="d-flex justify-space-around" dense :multiple="false">
          <template v-for="n in 6" >
            <div :key="n">
              <trip-btn
                BtnColor="#1687A7"
                :btn-label="Sortlabel[n]"
                rounded
                outlined
                :id="Sortlabel[n]"
                @sort="sorting(Sortlabel[n])"
              />
            </div>
          </template>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <vue-load v-if="isLoading" />
      <template v-for="item in items" v-else>
        <v-col col="12" lg="12" xl="6" :key="item.id">
          <card-component
            height="auto"
            elevation="8"
            :item="item"
            @delete="deleteItem(item.id)"
          />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import HomeImage from '@/assets/HomeImage.jpeg'
import { Service } from '@/service/index.js'

export default {
  name: 'HomePage',
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
      Busy: false,
      selectedBtn: null,
      isLoading: true
    }
  },
  methods: {
    search (q) {
      setTimeout(async () => {
        this.items = await Service.handleSearchQuery(q)
      }, 1000)
    },
    async deleteItem (id) {
      try {
        await Service.deleteItem(id)
        this.items = this.items.filter(item => item.id !== id)
      } catch (error) {
        console.log(error)
      }
    },
    async sorting (val) {
      console.log(val)
      try {
        // this.isLoading = true
        setTimeout(async () => {
          const sortdata = await Service.sorting(val)
          this.items = sortdata
        // this.isLoading = false
        }, 300)
      } catch (e) {
        console.log(e)
      }
    }
  },
  async created () {
    try {
      this.items = await Service.getList()
    } catch (error) {
      console.log(error)
    }
  },
  mounted () {
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>
