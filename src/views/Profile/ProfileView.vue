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
                <v-col cols="12">
                  <p class="text-h5">{{ userName }} <v-icon color="blue">mdi-check-decagram</v-icon></p>
                </v-col>
                <v-col cols="12" class="d-flex">
                  <p> 10 <span class="text--disabled mr-2"> following</span></p>
                  <p> 101k <span class="text--disabled"> follower</span></p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3" class="d-flex align-center justify-end">
              <trip-btn
                class="white--text"
                BtnColor="#1687A7"
                btn-label="Edit Profile"
                rounded
                >
                <template v-slot:icon>
                  <v-icon>mdi-account-edit</v-icon>
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
                <your-blog :UserID="userID"/>
                <favorit-post :UserID="userID"/>
                <up-coming :UserID="userID"/>
                <joined-trip :UserID="userID" />
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
  top: 420px
}
</style>

<script>
import YourBlog from './YourBlog.vue'
import UpComing from './UpComing.vue'
import FavoritPost from './FavoritePost.vue'
import JoinedTrip from './JoinedTrip.vue'

export default {
  components: {
    YourBlog,
    FavoritPost,
    UpComing,
    JoinedTrip
  },
  data () {
    return {
      tab: null,
      tabs: ['Your Blog', 'Favorite', 'Upcoming', 'Joined'],
      userName: '',
      userID: '',
      userImg: ''
    }
  },
  created () {
    const crrUser = JSON.parse(localStorage.getItem('authUser'))
    this.userName = crrUser[0].name
    this.userID = crrUser[0].id
    this.userImg = crrUser[0].image
  }
}
</script>
