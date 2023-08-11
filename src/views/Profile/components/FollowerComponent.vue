<template>
  <v-row justify="center">
    <v-dialog
    v-model="dialog"
    scrollable
    max-width="400px"
    v-bind="$attrs"
    v-on="$listeners"
  >
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
      <v-list-item v-for="(list, i) in followerList" :key="list">
        <v-list-item-content class="d-flex justify-space-between">
          <div>
            <v-avatar size="40" class="mx-3">
              <v-img :src="followerImg[i]" />
            </v-avatar>
            <router-link class="text-decoration-none black--text" :to="`/user/profile/${followerList[i]}`" >{{ list }}</router-link>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-row>
</template>

<script>
import { storage } from '../../../firebase'
import { ref, getDownloadURL } from 'firebase/storage'
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
    follower: 'Your Follower',
    followerImg: []
  }),
  methods: {
    followerData (data) {
      for (let i = 0; i < data.length; i++) {
        this.onGetFollowerName(data[i].user_id)
      }
    },
    async onGetFollowerName (data) {
      const userName = await Service.getUser(data)
      const path = `profile/${userName.image}`
      getDownloadURL(ref(storage, path)).then(
        (downLoadUrl) => {
          this.followerImg.push(downLoadUrl)
          this.followerList.push(userName.name)
        }
      )
    }
  },
  async mounted () {
    const follower = await Service.followerList(this.crrUser.id)
    console.log('follower', this.crrUser.firstName)
    this.followerData(follower)
  }
}

</script>
