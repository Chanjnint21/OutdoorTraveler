<template>
  <v-tab-item>
    <div v-if='EmptyPost' class='d-flex justify-center pt-5 text--disabled'>
      <v-container class="d-flex justify-center">
          <v-col cols="12" class="d-flex align-center justify-center flex-column">
            <p>You haven't posted any blogs yet !</p>
            <router-link to="/user/create"><p>Create your first Trip now</p></router-link>
          </v-col>
      </v-container>
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
    crrUser: {
      type: String
    }
  },
  data () {
    return {
      items: [],
      EmptyPost: false,
      userName: this.$route.params.name,
      UserID: '',
      RouteUser: this.$route.params.name
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
  async created () {
    const userData = await Service.handleSearchUser(this.RouteUser)
    if (this.crrUser === userData[0].id) {
      this.UserID = this.crrUser
    } else {
      this.UserID = userData[0].id
    }
    // get the card belong to only this user
    try {
      this.items = await Service.thisUserCard(this.UserID)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
