<template>
  <v-tab-item>
    <div v-if='emptyJoined' class='d-flex justify-center pt-5 text--disabled'>
      <p>You haven't joined any trip yet ! !</p>
    </div>
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
      ExpCard: [],
      items: [],
      emptyJoined: false
    }
  },
  watch: {
    items: {
      immediate: true,
      handler () {
        if (this.items.length === 0) {
          this.emptyJoined = true
        } else {
          this.emptyJoined = false
        }
      }
    }
  },
  methods: {
    async thisJoinedCard () {
      // check if this user have joined this expire/past trip then display
      const regCard = await Service.showRegister(this.UserID)
      for (let i = 0; i < this.ExpCard.length; i++) {
        for (let j = 0; j < regCard.length; j++) {
          if (this.ExpCard[i].id === regCard[j].card_id) {
            this.items.push(this.ExpCard[i])
          }
        }
      }
      console.log(this.items)
    }
  },
  async mounted () {
    // get expired card
    try {
      this.ExpCard = await Service.getExpCard()
      this.thisJoinedCard()
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
