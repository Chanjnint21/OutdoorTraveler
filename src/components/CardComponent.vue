<template>
  <v-card
    v-bind="$attrs"
    v-on="$listeners"
    :elevation="elevation"
    class="pa-2 ma-lg-2 text-center">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="5"
        lg="5"
        xl="12"
        class="pa-5">
        <cloud-image
          height="auto"
          :files='item.image'
        />
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7" xl="12">
        <v-row class="d-flex align-start" style="height: 60%" no-gutters>
          <v-col cols="12">
            <v-card-title class="text-h5">{{ item.title }}</v-card-title>
            <v-card-text class="text-left">{{ item.detail }}</v-card-text>
          </v-col>
        </v-row>
        <v-row class="d-flex align-end" style="height: 40%" no-gutters>
          <v-col class="d-flex align-center " cols="12" sm="12" md="6" lg="6">
            <v-card-subtitle class="grey--text">
              By : {{ item.author?.name }}
            </v-card-subtitle>
            <v-card-subtitle class="grey--text">Cost: {{ item.requirement.cost }} $/person</v-card-subtitle>
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
                  @click="toUpdate(item.id)"
                  v-if="!expireCard && cardOwner"
                >
                  <template #icon>
                    <v-icon>mdi-pencil</v-icon>
                  </template>
                </trip-btn>
                <trip-btn
                  BtnColor="#1687A7"
                  class="white--text"
                  BtnLabel="expire"
                  disabled
                  v-else-if="expireCard && !joined"
                />
                <trip-btn
                  BtnColor="#1687A7"
                  class="white--text"
                  BtnLabel="Joined"
                  disabled
                  v-else-if='expireCard && joined'
                />
                <r-dialog

                  :this_id="item.id"
                  @register="submitRegis"
                  v-else-if='!cardOwner && !register'
                />
                <c-dialog
                  label1="Are you sure?"
                  label2="Are you sure you want to unregister this trip?"
                  DioColor="error"
                  DioBtnClass="ml-3"
                  DioLabel="Unregister"
                  v-else-if='!cardOwner && register'
                >
                  <template #agree>
                    <v-btn
                      color="#1687A7"
                      text
                      @click="dialog = false, unRegister(crrUser[0].id, item.id)"
                    >
                      Yes
                    </v-btn>
                  </template>
                </c-dialog>
              </slot>
              <slot name="btn3">
                <c-dialog
                  label1="Are you sure?"
                  label2="You can't undo this action.Are you sure , you wanna delete this card?"
                  DioColor="error"
                  DioBtnClass="ml-3"
                  v-if='cardOwner'
                >
                  <template #agree>
                    <v-btn
                      color="#1687A7"
                      text
                      @click="dialog = false; deleteItem(item.id)"
                    >
                      Yes
                    </v-btn>
                  </template>
                  <template #icon>
                    <v-icon>mdi-delete</v-icon>
                  </template>
                </c-dialog>
              </slot>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios'
import RDialog from './RegisterDialog.vue'
import CloudImage from './CloudImage.vue'
import { Service } from '@/service/index.js'

export default {
  name: 'CardComponent',
  components: {
    RDialog,
    CloudImage
  },
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
      expireCard: false,
      joined: false,
      register: true,
      cardOwner: false,
      Fav: false,
      FavIcon: 'mdi-bookmark-outline',
      crrUser: JSON.parse(localStorage.getItem('authUser'))
    }
  },
  methods: {
    async deleteItem (id) {
      await Service.deleteItem(id)
      this.$router.go()
    },
    toUpdate (id) {
      this.$router.push(`/user/update/${id}`)
    },
    submitRegis () {
      this.register = true
    },
    ViewClick (id) {
      this.$router.push({ name: 'view', params: { id } })
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
      const FavId = await Service.getFav(this.crrUser[0].id, this.item.id)
      await axios.delete(`http://localhost:3000/Favorite/${FavId[0].id}`)
    },
    async showFav () {
      const FavId = await Service.getFav(this.crrUser[0].id, this.item.id)
      if (FavId.length) {
        this.FavIcon = 'mdi-bookmark'
        this.Fav = true
      } else {
        this.FavIcon = 'mdi-bookmark-outline'
        this.Fav = false
      }
    },
    ToFav () {
      this.Fav = !this.Fav
      if (this.Fav) {
        this.addFav()
      } else {
        this.removeFav()
      }
    },
    async ownerCard () {
      const owner = await Service.thisOwnerCard(this.item.id, this.crrUser[0].id)
      if (owner.length) {
        this.cardOwner = true
      } else {
        this.cardOwner = false
      }
    },
    async showRegister () {
      const regCard = await Service.getRegister(this.crrUser[0].id, this.item.id)
      if (regCard.length) {
        this.register = true
      } else {
        this.register = false
      }
    },
    async unRegister () {
      const regCard = await Service.getRegister(this.crrUser[0].id, this.item.id)
      await Service.unRegister(regCard[0].id)
      this.register = false
    },
    async joinedCard () {
      const regCard = await Service.getRegister(this.crrUser[0].id, this.item.id)
      const owner = await Service.thisOwnerCard(this.item.id, this.crrUser[0].id)
      if (this.item.expiry === true && !regCard.length) {
        this.register = true
        this.expireCard = true
      } else if (this.item.expiry === true && regCard.length) {
        this.joined = true
        this.expireCard = true
      } else if (this.item.expiry === true && owner.length) {
        this.joined = true
        this.expireCard = true
        this.cardOwner = true
      }
    }
  },
  async mounted () {
    this.ownerCard()
    this.showRegister()
    this.joinedCard()
    this.showFav()
  }
}
</script>
