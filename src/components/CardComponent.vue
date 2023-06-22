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
          :src="imageUrl"/>
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
              {{ Text }} {{ item.author.name }}
            </v-card-subtitle>
          </v-col>
          <v-col class="d-flex align-center justify-center mb-2" cols="12" sm="12" md="6">
            <v-card-actions>
              <slot name="bookmark">
                <trip-btn
                  :BtnColor="toggle ? 'success' : 'primary'"
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
                />
              </slot>
              <slot name="register">
                <trip-btn
                  BtnColor="#1687A7"
                  class="white--text"
                  btn-label="Register"
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
    imageUrl: {
      type: String,
      require: true
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      Text: 'By:'
    }
  }
}
</script>
