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
      <!-- <v-list>
        <v-list-group
          v-for="sort in Sorter"
          :key="sort.title"
          v-model="sort.active"
          :prepend-icon="sort.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title >{{ sort.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="child in sort.sortlol"
            :key="child.title"
          >
            <v-list-item-content>
              <v-list-item-title >{{ child.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list> -->
    </v-row>
    <v-row>
      <vue-load v-if="isLoading" />
      <template v-for="item in items" v-else>
        <v-col col="12" lg="12" xl="6" :key="item.id">
          <card-component
            height="auto"
            elevation="8"
            :item="item"
          ></card-component>
          <!-- @delete="deleteItem" -->
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
      // Sorter: [
      //   {
      //     action: 'mdi-sort',
      //     active: true,
      //     sortlol: [
      //       { title: 'newest' },
      //       { title: 'oldest' },
      //       { title: 'Popular' },
      //       { title: 'Recommend' },
      //       { title: 'Price to High' },
      //       { title: 'Price to Low' }
      //     ],
      //     title: 'Sorting'
      //   }
      // ]
    }
  },
  methods: {
    search (q) {
      setTimeout(async () => {
        this.items = await Service.handleSearchQuery(q)
      }, 1000)
    },
    // async deleteItem (id) {
    //   try {
    //     await Service.deleteItem(id)
    //     this.items = this.items.filter(item => item.id !== id)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    async sorting (val) {
      try {
        setTimeout(async () => {
          const sortdata = await Service.sorting(val)
          this.items = sortdata
        }, 300)
      } catch (e) {
        console.log(e)
      }
    }
  },
  async created () {
    try {
      this.items = await Service.sorting('newest')
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
