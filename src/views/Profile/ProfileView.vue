<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-img height="300" class="grey darken-4" src="../../assets/CoverImage.jpeg" />
        </v-col>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col cols="2">
              <v-avatar size="200" style="top: -60%; left: 5%;">
                <img src="../../assets/Img/pf2.jpg" alt="Naruto">
                <img src="" alt="">
              </v-avatar>
            </v-col>
            <v-col cols="4">
              <p class="text-h5">{{ userName }}</p>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <trip-btn
                BtnColor="#1687A7"
                class="mr-6"
                btn-label="Edit Profile"
                outlined
                rounded>
                <template v-slot:icon>
                  <v-icon>mdi-account-edit</v-icon>
                  </template>
                </trip-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="contain-detail" >
        <v-tabs
          v-model="tab"
          fixed-tabs
          centered
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
    </v-container>
</template>
<style>
.card {
  position: relative;
  top: 100%
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
      userID: ''
    }
  },
  created () {
    const crrUser = JSON.parse(localStorage.getItem('authUser'))
    this.userName = crrUser[0].name
    this.userID = crrUser[0].id
  }
}
</script>
