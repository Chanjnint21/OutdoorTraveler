<template>
  <v-card class="pa-2 ma-lg-2">
    <v-row no-gutters>
      <v-col cols="2" class="my-2">
        <v-avatar class="ml-3" size="100" @click="checkOutUser()" style="cursor: pointer">
          <img :src="userImg" alt="Patrick">
        </v-avatar>
      </v-col>
      <v-col cols="10">
        <v-card-title>
          <v-badge
            inline
            color="#97D8EB"
            content="following"
          >
            <span @click="checkOutUser()" style="cursor: pointer">
              {{ item.name }}
            </span>
          </v-badge>
        </v-card-title>
        <v-card-subtitle class="py-1" >
          {{ item.bio }}
        </v-card-subtitle>
        <v-card-subtitle class="py-1">
          {{ followingCount }} <span class="text--disabled mr-2"> following</span>101k <span class="text--disabled"> follower</span>
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { Service } from '@/service/index.js'
import { storage } from '../firebase'
import { ref, getDownloadURL } from 'firebase/storage'

export default {
  name: 'userCard',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    userImg: '',
    followingCount: ''
  }),
  methods: {
    checkOutUser () {
      this.$router.push(`/user/profile/${this.item.name}`)
    },
    async followList () {
      const FollowingList = await Service.followingList(this.item.id)
      this.followingCount = FollowingList.length
    }
  },
  mounted () {
    const path = `profile/${this.item.image}`
    getDownloadURL(ref(storage, path)).then(
      (downLoadUrl) => (this.userImg = downLoadUrl)
    )
    this.followList()
  }
}
</script>
