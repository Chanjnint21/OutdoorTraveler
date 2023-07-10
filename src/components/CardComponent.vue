<template>
  <v-card
    v-bind="$attrs"
    v-on="$listeners"
    :elevation="elevation"
    class="pa-2 mx-lg-auto text-center">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="5"
        md="5"
        lg="5"
        xl="12"
        class="pa-5">
        <v-img
          class="align-start"
          :src="item.image"/>
      </v-col>
      <v-col cols="12" sm="7" md="7" lg="7" xl="12">
        <v-row class="d-flex align-start" style="height: 60%" no-gutters>
          <v-col cols="12">
            <v-card-title class="text-h5">{{ item.title }}</v-card-title>
            <v-card-text class="text-left">{{ item.detail }}</v-card-text>
          </v-col>
        </v-row>
        <v-row class="d-flex align-end" style="height: 40%" no-gutters>
          <v-col class="d-flex align-center " cols="12" sm="12" md="6" lg="6">
            <v-card-subtitle class="grey--text">
              {{ Text }} {{ item.author?.name }}
            </v-card-subtitle>
            <v-card-subtitle class="grey--text">{{ Text1 }} {{ item.requirement.cost }} {{ Text2 }}</v-card-subtitle>
          </v-col>
          <v-col class="d-flex align-center justify-center mb-2" cols="12" sm="12" md="6" lg="6">
            <v-card-actions>
              <slot name="bookmark">
                <trip-btn @click='ToFav' icon>
                  <template #icon>
                    <v-icon color="#97D8EB" class="pa-2">{{ FavIcon }}</v-icon>
                  </template>
                </trip-btn>
              </slot>
              <slot name="btn1">
                <trip-btn
                BtnColor="#276678"
                class="white--text"
                btn-label="Detail"
                @click="ViewClick(item.id)"
              />
              </slot>
              <slot name="btn2">
                <trip-btn
                  BtnColor="#1687A7"
                  class="white--text"
                  btn-label="Register"
                />
              </slot>
              <slot name="btn3"></slot>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import router from '../router'
import axios from 'axios'
// import { Service } from '@/service/index.js'

export default {
  name: 'CardComponent',
  props: {
    elevation: {
      type: String
    },
    color: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      Text: 'By:',
      Text1: 'Cost:',
      Text2: '$/Person',
      Fav: false,
      FavIcon: 'mdi-bookmark-outline',
      crrUser: JSON.parse(localStorage.getItem('authUser'))
    }
  },
  methods: {
    deleteItem (id) {
      this.$emit('delete', id)
    },
    ViewClick (id) {
      router.push({ name: 'view', params: { id } })
    },
    async addFav () {
      this.FavIcon = 'mdi-bookmark'
      await axios.post('http://localhost:3000/Favorite', {
        id: '',
        user_id: this.crrUser[0].id,
        card_id: this.item.id
      })
    },
    async removeFav () {
      this.FavIcon = 'mdi-bookmark-outline'
      const FavId = await axios.get(`http://localhost:3000/Favorite?user_id=${this.crrUser[0].id}&card_id=${this.item.id}`)
      await axios.delete(`http://localhost:3000/Favorite/${FavId.data[0].id}`)
    },
    ToFav () {
      this.Fav = !this.Fav
      if (this.Fav) {
        this.addFav()
      } else {
        this.removeFav()
      }
    }
  },
  // watch: {
  //   Fav (newVal) {
  //     if (newVal) {
  //       return this.addFav()
  //     }
  //     return this.removeFav()
  //   }
  // },
  async mounted () {
    try {
      const FavOn = await axios.get(`http://localhost:3000/Favorite?user_id=${this.crrUser[0].id}&card_id=${this.item.id}`)
      if (FavOn.data.length === 1) {
        this.FavIcon = 'mdi-bookmark'
        this.Fav = true
      } else {
        this.FavIcon = 'mdi-bookmark-outline'
        this.Fav = false
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
