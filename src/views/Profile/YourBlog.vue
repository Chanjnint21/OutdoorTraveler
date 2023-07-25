<template>
  <v-tab-item>
    <div v-if='EmptyPost' class='d-flex justify-center pt-5 text--disabled'>
      <p>You haven't posted any blogs yet !</p>
    </div>
    <v-row v-else>
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
      items: [],
      EmptyPost: false
    }
  },
  watch: {
    items: {
      immediate: true,
      handler () {
        if (this.items.length === 0) {
          this.EmptyPost = true
        } else {
          this.EmptyPost = false
        }
      }
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
