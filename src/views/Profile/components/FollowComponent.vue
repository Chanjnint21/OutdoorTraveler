<template>
<v-row justify="center">
  <v-dialog
  v-model="dialog"
  scrollable
  max-width="300px"
>
<template v-slot:activator="{ on, attrs }">
  <v-col cols="12" class="d-flex">
    <p
      v-bind="attrs"
      v-on="on"> <span class="text--disabled mr-2"> following</span>
    </p>
  </v-col>
</template>
<v-card>
  <v-card-title>
    <span class="text-h5 mb-5">Your Following</span>
  </v-card-title>
  <v-divider></v-divider>
  <!-- <v-radio
  label="Mony"
></v-radio>
<v-radio
  label="Jimin"
></v-radio> -->
  <v-list-item v-for="list in followingList" :key="list.id">
    <v-list-item-content>{{list}}</v-list-item-content>
  </v-list-item>
  <v-card-actions>
    <v-btn
    color="blue darken-1"
    text
    @click="dialog = false">
    Close
</v-btn>
  <v-btn
    color="blue darken-1"
    text
    @click="dialog = false">
    Okay
</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</v-row>
</template>

<script>
import { Service } from '@/service/index.js'
export default {
  name: 'FollowDialog',
  props: {
  },
  data: () => ({
    dialog: false,
    followingList: [],
    followerList: [],
    crrUser: JSON.parse(localStorage.getItem('authUser'))[0]
  }),
  methods: {
    followingData (data) {
      for (let i = 0; i < data.length; i++) {
        this.followingList.push(data[i].user_id)
        console.log(this.followingList, 'mony')
      }
    }
  },
  async mounted () {
    const following = await Service.followingList(this.crrUser.id)
    console.log(this.crrUser.firstName)
    this.followingData(following)
    console.log(following, 'hi')
  }
}

</script>
