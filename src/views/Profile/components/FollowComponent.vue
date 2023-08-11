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
        v-on="on">{{ followingCount }} <span class="text--disabled mr-2"> following</span>
      </p>
    </v-col>
  </template>
  <v-card>
    <v-card-title>
      <span class="text-h5 mb-5">Your Following</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-list-item v-for="(list, i) in followingList" :key="list">
          <v-list-item-content class="d-flex justify-space-between">
            <div>
              <v-avatar size="40" class="mx-3">
                <v-img :src="followingImg[i]" />
              </v-avatar>
              <router-link class="text-decoration-none black--text" :to="`/user/profile/${followingList[i]}`" >{{ list }}</router-link>
            </div>
          </v-list-item-content>
    </v-list-item>
    <div v-if='emptyFollowing' class='d-flex justify-center mt-5'>
      <span class="text--disabled"> You didn't follow anyone . </span> &#x1f642;
    </div>
    <v-card-actions>
      <v-btn
      color="blue darken-1"
      text
      @click="dialog = false">
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
  name: 'FollowDialog',
  props: {
    followingCount: {
      type: Number,
      required: true
    },
    crrUser: {
      type: String,
      require: true
    }
  },
  data: () => ({
    dialog: false,
    followingList: [],
    // crrUser: JSON.parse(localStorage.getItem('authUser'))[0],
    followingImg: [],
    emptyFollowing: false
  }),
  watch: {
    followingCount: {
      immediate: true,
      handler () {
        this.emptyFollowing = this.followingCount === 0
      }
    }
  },
  methods: {
    followingData (data) {
      for (let i = 0; i < data.length; i++) {
        this.onGetFollowingName(data[i].following)
      }
    },
    async onGetFollowingName (data) {
      const userName = await Service.getUser(data)
      const path = `profile/${userName.image}`
      getDownloadURL(ref(storage, path)).then(
        (downLoadUrl) => {
          this.followingImg.push(downLoadUrl)
          this.followingList.push(userName.name)
        }
      )
    }
  },
  async mounted () {
    const routename = this.$route.params.name
    const userData = await Service.handleSearchUser(routename)
    if (this.crrUser === userData[0].id) {
      this.UserID = this.crrUser
    } else {
      this.UserID = userData[0].id
    }
    const following = await Service.followingList(this.UserID)
    this.followingData(following)
  }
}
</script>
