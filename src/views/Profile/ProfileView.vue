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
                <v-img :src="userImg" alt="Naruto"/>
              </v-avatar>
            </v-col>
            <v-col cols="7" class="d-flex align-center mt-10">
              <v-row no-gutters>
                <v-col cols="12" class="mt-10">
                  <p class="text-h5 font-weight-bold">{{ userName }} <v-icon color="blue">mdi-check-decagram</v-icon></p>
                </v-col>
                <v-col cols="12">
                  <p> {{ userBio }}</p>
                </v-col>
                <v-col cols="12" class="d-flex">
                  <p> 10 <span class="text--disabled mr-2"> following</span></p>
                  <p> 101k <span class="text--disabled"> follower</span></p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3" class="d-flex align-center justify-end">
              <prof-dialog :pfPic="userImg" v-if="asOwner"/>
              <trip-btn
                class="white--text"
                BtnColor="#1687A7"
                btn-label="Follow"
                rounded
                v-else
                >
                <template v-slot:icon>
                  <v-icon >mdi-account-plus</v-icon>
                </template>
              </trip-btn>
              <trip-btn
                BtnColor="#1687A7"
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
                <your-blog :crrUser="userID"/>
                <favorit-post :crrUser="userID"/>
                <up-coming :crrUser="userID"/>
                <joined-trip :crrUser="userID" />
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

export default {
  components: {
    YourBlog,
    FavoritPost,
    UpComing,
    JoinedTrip,
    ProfDialog
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
      asOwner: false
    }
  },
  methods: {
    async checkUser () {
      const thisUser = await Service.handleSearchUser(this.RouteUser)
      let path
      if (thisUser[0].id === this.crrUser.id) {
        this.userName = this.crrUser.name
        this.userBio = this.crrUser.bio
        path = `profile/${this.crrUser.image}`
      } else {
        this.userName = thisUser[0].name
        this.userBio = thisUser[0].bio
        path = `profile/${thisUser[0].image}`
      }
      getDownloadURL(ref(storage, path)).then(
        (downLoadUrl) => (this.userImg = downLoadUrl)
      )
    }
  },
  created () {
    this.checkUser()
    this.userID = this.crrUser.id
  }
}
</script>
