<template>
  <v-row justify="center">
    <v-dialog
    v-model="dialog"
    scrollable
    max-width="300px"
    v-bind="$attrs"
    v-on="$listeners">
  <template v-slot:activator="{ on, attrs }">
    <v-col cols="12" class="d-flex">
      <p
        v-bind="attrs"
        v-on="on"> {{ followerCount }}
        <span class="text--disabled mr-2">follower</span>
      </p>
    </v-col>
  </template>
  <v-card>
    <v-card-title>
      {{ follower }}
    </v-card-title>
    <v-divider></v-divider>
    <v-list-item v-for="list in followerList" :key="list.user_id">
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
  name: 'FollowerDialog',
  props: {
    followerCount: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    followerList: [],
    crrUser: JSON.parse(localStorage.getItem('authUser'))[0],
    follower: 'Your Follower'
  }),
  methods: {
    followerData (data) {
      for (let i = 0; i < data.length; i++) {
        this.followerList.push(data[i].id)
      }
    }
  },
  async mounted () {
    const follower = await Service.followerList(this.crrUser.id)
    console.log('follower', this.crrUser.firstName)
    this.followingData(follower)
  }
}

</script>
