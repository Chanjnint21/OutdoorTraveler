<template>
  <v-card
    v-bind="$attrs"
    v-on="$listeners"
    :elevation="elevation"
    class="pa-md-4 mx-lg-auto text-center">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="4">
        <v-img
          max-width="500"
          max-height="470"
          class="align-start"
          :src="item.image"/>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="8">
        <v-row class="d-flex align-start" style="height: 60%" no-gutters>
          <v-col cols="12">
            <v-card-title class="text-h5">{{ item.title }}</v-card-title>
            <v-card-text class="text-left">{{ item.detail }}</v-card-text>
          </v-col>
        </v-row>
        <v-row class="d-flex align-end" style="height: 40%" no-gutters>
          <v-col class="d-flex align-center " cols="12" sm="12" md="6">
            <v-card-subtitle class="grey--text">
              {{ Text }} {{ item.author?.name }}
            </v-card-subtitle>
            <v-card-subtitle class="grey--text">{{ Text1 }} {{ item.requirement.cost }} {{ Text2 }}</v-card-subtitle>
          </v-col>
          <v-col class="d-flex align-center justify-center mb-2" cols="12" sm="12" md="6">
            <v-card-actions>
              <slot name="bookmark">
                <trip-btn
                  icon
                >
                  <template #icon>
                    <v-icon class="pa-2">mdi-bookmark-outline</v-icon>
                  </template>
                </trip-btn>
              </slot>
              <slot name="detail">
                <trip-btn
                BtnColor="#276678"
                class="white--text"
                btn-label="Detail"
                @click="ViewClick(item.id)"
              />
              </slot>
              <slot name="register">
                <trip-btn
                  BtnColor="#1687A7"
                  class="white--text"
                  btn-label="Register"
                />
              </slot>
              <slot name="Delete">
                <trip-btn
                BtnColor="#F44336"
                class="white--text"
                btn-label="Delete"
                @click="deleteItem(item.id)"
              />
              </slot>
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
      Text2: '$/Person'
    }
  },
  methods: {
    deleteItem (id) {
      this.$emit('delete', id)
    },
    ViewClick (id) {
      router.push({ name: 'view', params: { id } })
    }
  }
}
</script>
