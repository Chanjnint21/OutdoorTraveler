<template>
  <v-tab-item>
    <div v-if='EmptyReg' class='d-flex justify-center pt-5 text--disabled'>
      <p>There's no upcoming trip that you have register !</p>
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
      RegCard: [],
      items: [],
      EmptyReg: false
    }
  },
  watch: {
    RegCard () {
      if (this.RegCard.length === 0) {
        this.EmptyReg = true
      }
    }
  },
  methods: {
    async thisRegCard (RegCard) {
      for (let i = 0; i < RegCard.length; i++) {
        const Data = await Service.thisIdData(RegCard[i].card_id)
        this.items.push(Data)
      }
    }
  },
  async mounted () {
    try {
      this.RegCard = await Service.showRegister(this.UserID)
      this.thisRegCard(this.RegCard)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
