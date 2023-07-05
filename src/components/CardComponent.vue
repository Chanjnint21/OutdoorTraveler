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
                    <v-icon class="pa-2">{{ FavIcon }}</v-icon>
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
      FavIcon: 'mdi-bookmark-outline'
    }
  },
  watch: {
    Fav (newVal) {
      if (newVal) {
        this.FavIcon = 'mdi-bookmark'
        return this.FavIcon
      }
      this.FavIcon = 'mdi-bookmark-outline'
    }
  },
  methods: {
    deleteItem (id) {
      this.$emit('delete', id)
    },
    ViewClick (id) {
      router.push({ name: 'view', params: { id } })
    },
    ToFav () {
      this.Fav = !this.Fav
    }
  }
}
</script>
