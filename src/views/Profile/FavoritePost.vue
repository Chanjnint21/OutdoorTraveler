<template>
  <v-tab-item>
    <div v-if='EmptyFav' class='d-flex justify-center pt-5 text--disabled'>
      <p>There's no favorite !</p>
    </div>
    <v-row v-else>
      <template v-for="item in items">
        <v-col col="12" lg="12" xl="6" :key="item.id">
          <card-component
            height="auto"
            elevation="8"
            :item='item'
          >
          </card-component>
        </v-col>
      </template>
    </v-row>
  </v-tab-item>
</template>

<script>
import { Service } from '@/service/index.js'

export default {
  name: 'HomePage',
  props: {
    UserID: {
      type: String
    }
  },
  data () {
    return {
      FavCard: [],
      items: [],
      EmptyFav: false
    }
  },
  watch: {
    FavCard () {
      if (this.FavCard.length === 0) {
        this.EmptyFav = true
      }
    }
  },
  methods: {
    async thisFavCard (FavCard) {
      for (let i = 0; i < FavCard.length; i++) {
        const Data = await Service.thisIdData(FavCard[i].card_id)
        this.items.push(Data)
      }
    }
  },
  async mounted () {
    try {
      this.FavCard = await Service.thisUserFav(this.UserID)
      this.thisFavCard(this.FavCard)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
