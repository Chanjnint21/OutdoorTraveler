<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-img height="300" class="grey darken-4" src="../../assets/CoverImage.jpeg" />
        </v-col>
        <v-col cols="12" id="prof">
          <v-row no-gutters>
            <v-col cols="12" sm="2" class="d-flex justify-center ">
              <v-avatar size="200" style="top: -15%;">
                <v-img :src="userImg" alt="Naruto">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="#1687A7"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
            </v-col>
            <v-col cols="7" class="d-flex align-center mt-10">
              <v-row no-gutters>
                <v-col cols="12" class="mt-10">
                  <p class="text-h5 font-weight-bold">{{ userName }} <v-icon :color="verify_color">mdi-check-decagram</v-icon></p>
                </v-col>
                <v-col cols="12">
                  <p> {{ userBio }}</p>
                </v-col>
                <v-col cols="12" class="d-flex">
                  <f-dialog >{{ followingCount }}</f-dialog>
                  <p> {{ followingCount }} <span class="text--disabled mr-2"> following</span></p>
                  <!-- <p> {{ followingCount }} <span class="text--disabled mr-2"> following</span></p> -->
                  <p> {{ followerCount }} <span class="text--disabled"> follower</span></p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3" class="d-flex align-center justify-end">
              <prof-dialog :pfPic="userImg" v-if="asOwner"/>
              <trip-btn
                class="white--text"
                color="#1687A7"
                btn-label="Follow"
                rounded
                @click="follow()"
                v-else-if="!asOwner && !following"
              />
              <trip-btn
                class="white--text"
                color="#1687A7"
                btn-label="unfollow"
                rounded
                @click="unfollow()"
                v-else
              />
              <trip-btn
                color="#1687A7"
                icon
                >
                <template v-slot:icon>
                  <v-icon >mdi-dots-horizontal</v-icon>
                </template>
              </trip-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" id="tab">
          <v-row no-gutters>
            <v-tabs
              v-model="tab"
              fixed-tabs
              color="#1687A7"
            >
              <template v-for="t in tabs">
                <v-tab
                :key="t"
                >
                  {{ t }}
                </v-tab>
              </template>
            </v-tabs>
            <v-divider></v-divider>
            <v-container class="MainContain">
              <v-tabs-items v-model="tab">
                <your-blog :crrUser="crrUser.id"/>
                <favorit-post :crrUser="crrUser.id"/>
                <up-coming :crrUser="crrUser.id"/>
                <joined-trip :crrUser="crrUser.id" />
              </v-tabs-items>
            </v-container>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
</template>

<style scoped>
#prof {
  position: absolute;
  top: 230px !important
}
#tab {
  position: absolute;
  top: 480px
}
</style>

<script>
import YourBlog from './YourBlog.vue'
import UpComing from './UpComing.vue'
import FavoritPost from './FavoritePost.vue'
import JoinedTrip from './JoinedTrip.vue'
import ProfDialog from './components/ProfDialog.vue'
import { Service } from '@/service/index.js'
import { storage } from '../../firebase'
import { ref, getDownloadURL } from 'firebase/storage'
import FDialog from './components/FollowComponent.vue'

export default {
  components: {
    YourBlog,
    FavoritPost,
    UpComing,
    JoinedTrip,
    ProfDialog,
    FDialog
  },
  data () {
    return {
      tab: null,
      tabs: ['Your Blog', 'Favorite', 'Upcoming', 'Joined'],
      userName: '',
      userID: '',
      userImg: '',
      userBio: '',
      RouteUser: this.$route.params.name,
      crrUser: JSON.parse(localStorage.getItem('authUser'))[0],
      asOwner: true,
      following: false,
      followId: '',
      followingCount: 0,
      followerCount: 0,
      verify_color: '',
      followingList: [],
      followerList: []
    }
  },
  watch: {
    $route (to, from) {
      if (to.path !== from.path) {
        this.$router.go()
      }
    },
    following () {
      return this.checkUser()
    }
  },
  methods: {
    // follow function on visit profile
    async follow () {
      const thisUserProfile = await Service.handleSearchUser(this.RouteUser)
      const data = {
        user_id: this.crrUser.id,
        following: thisUserProfile[0].id
      }
      await Service.follow(data)
      this.following = true
    },
    // unfollow function on visit profile
    async unfollow () {
      this.following = false
      console.log(this.followId)
      await Service.unfollow(this.followId)
    },
    // check if the crrUser have follow the visit profile
    async checkFollow () {
      const thisUserFollow = await Service.getFollow(this.crrUser.id, this.userID)
      if (thisUserFollow.length === 1) {
        this.following = true
        this.followId = thisUserFollow[0].id
      } else {
        this.following = false
      }
    },
    // get the list of the crr visit pf following and follower
    async followList (userid) {
      const FollowingList = await Service.followingList(userid)
      this.followingCount = FollowingList.length
      const FollowerList = await Service.followerList(userid)
      this.followerCount = FollowerList.length
    },
    checkVerification (verify) {
      if (verify) {
        this.verify_color = 'blue'
      } else {
        this.verify_color = 'grey'
      }
    },
    // check the visit profile to display the corret personal data
    async checkUser () {
      const thisUser = await Service.handleSearchUser(this.RouteUser)
      let path
      if (thisUser[0].id === this.crrUser.id) {
        this.userID = this.crrUser.id
        this.userName = this.crrUser.name
        this.userBio = this.crrUser.bio
        path = `profile/${this.crrUser.image}`
        this.asOwner = true
        this.followList(this.crrUser.id)
        this.checkVerification(this.crrUser.verify)
      } else {
        this.userID = thisUser[0].id
        this.userName = thisUser[0].name
        this.userBio = thisUser[0].bio
        path = `profile/${thisUser[0].image}`
        this.asOwner = false
        this.checkFollow()
        this.followList(thisUser[0].id)
        this.checkVerification(thisUser[0].verify)
      }
      getDownloadURL(ref(storage, path)).then(
        (downLoadUrl) => (this.userImg = downLoadUrl)
      )
    }
    // followingData (data) {
    //   for (let i = 0; i < data.length; i++) {
    //     console.log(data[i].firstName)
    //     this.followingList.push()
    //   }
    // }
  },
  // async mounted () {
  //   const follwer = await Service.followingList(this.crrUser.id)
  //   console.log(follwer)
  //   this.followingData(follwer)
  // },
  created () {
    this.checkUser()
  }
}
</script>
