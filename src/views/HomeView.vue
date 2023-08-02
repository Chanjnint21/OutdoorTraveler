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
      <template v-else-if="itemEmpty && !isLoading">
        <v-col cols="12" class="text-center">
          <p class="text--disabled">No Matching Results</p>
        </v-col>
      </template>
      <template v-for="item in userlist" v-else-if="showUser && !isLoading">
        <v-col cols="6" :key="item.id">
          <user-card :item="item" />
        </v-col>
      </template>
      <template v-for="item in items" v-else-if="!showUser && !itemEmpty">
        <v-col col="12" lg="12" xl="6" :key="item.id">
          <card-component
            height="auto"
            elevation="8"
            :item="item"
          ></card-component>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import HomeImage from '@/assets/HomeImage.jpeg'
import userCard from '@/components/userCard.vue'
import { Service } from '@/service/index.js'

export default {
  name: 'HomePage',
  components: {
    userCard
  },
  data () {
    return {
      page: 1,
      Sortlabel: [
        '',
        'newest',
        'oldest',
        'User',
        'Recommend',
        'Price to High',
        'Price to Low'
      ],
      image: HomeImage,
      items: [],
      userlist: [],
      searchQuery: '',
      Busy: false,
      selectedBtn: null,
      isLoading: true,
      showUser: false,
      itemEmpty: false
    }
  },
  methods: {
    checkEmpty (resultList) {
      if (resultList.length === 0) {
        this.itemEmpty = true
        console.log(this.itemEmpty)
        return
      }
      console.log(this.itemEmpty)
      this.itemEmpty = false
    },
    search (q) {
      setTimeout(async () => {
        if (this.showUser) {
          this.userlist = await Service.handleSearchUser(q)
          return this.checkEmpty(this.userlist)
        }
        this.items = await Service.handleSearchQuery(q)
        return this.checkEmpty(this.items)
      }, 1000)
    },
    async sorting (val) {
      try {
        setTimeout(async () => {
          const sortdata = await Service.sorting(val)
          if (val === 'User') {
            this.showUser = true
            this.userlist = sortdata
            return
          }
          this.showUser = false
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
