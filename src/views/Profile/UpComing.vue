<template>
  <v-tab-item>
    <div v-if='EmptyReg' class='d-flex justify-center text--disabled'>
      <v-container class="d-flex align-center justify-center vh-100">
          <v-col cols="12" class="d-flex align-center justify-center flex-column">
            <v-img max-width="400" src="../../assets/empty_Box.jpeg"/>
            <p>There's no upcoming trip that you have register! <router-link to="/user/home">Explore now</router-link></p>
          </v-col>
      </v-container>
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
    crrUser: {
      type: String
    }
  },
  data () {
    return {
      RegCard: [],
      items: [],
      EmptyReg: false,
      UserID: '',
      RouteUser: this.$route.params.name
    }
  },
  watch: {
    RegCard: {
      deep: true, // Watch for changes in nested properties of RegCard (if applicable)
      handler () {
        if (this.RegCard.length === 0) {
          this.EmptyReg = true
        } else {
          this.EmptyReg = false
        }
      }
    }
  },
  methods: {
    // push the upcoming data that's not yet expired
    async thisRegCard (RegCard) {
      for (let i = 0; i < RegCard.length; i++) {
        const Data = await Service.thisIdData(RegCard[i].card_id)
        if (!Data.expiry) {
          this.items.push(Data)
        }
      }
    }
  },
  async mounted () {
    const userData = await Service.handleSearchUser(this.RouteUser)
    if (this.crrUser === userData[0].id) {
      this.UserID = this.crrUser
    } else {
      this.UserID = userData[0].id
    }
    // get the card that this user have register
    try {
      this.RegCard = await Service.showRegister(this.UserID)
      this.thisRegCard(this.RegCard)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
