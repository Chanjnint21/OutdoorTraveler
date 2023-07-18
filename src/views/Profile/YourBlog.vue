<template>
  <v-tab-item>
    <template v-for="item in items">
      <v-col col="12" lg="12" xl="6" :key="item.id">
        <card-component
          height="auto"
          elevation="8"
          :item="item"
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
      items: []
    }
  },
  async mounted () {
    // get the card belong to only this user
    try {
      this.items = await Service.thisUserCard(this.UserID)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
