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
            <v-card-title class="text-h5">{{ cardTitleText }}</v-card-title>
            <v-card-text class="text-left">{{ cardSubText }}</v-card-text>
          </v-col>
        </v-row>
        <v-row class="d-flex align-end" style="height: 40%" no-gutters>
          <v-col class="d-flex align-center " cols="12" sm="12" md="6">
            <v-card-subtitle class="grey--text">
              {{ Text }} {{ cardText }}
            </v-card-subtitle>
          </v-col>
          <v-col class="d-flex align-center justify-center mb-2" cols="12" sm="12" md="6">
            <v-card-actions>
              <slot name="bookmark">
              <trip-btn
                :BtnColor="toggle ? 'success' : 'primary'"
                Icons="mdi-bookmark"
                icon/>
              </slot>
              <slot name="detail">
              <trip-btn
                BtnColor="#607D8B"
                class="white--text"
                btn-label="Detail" />
              </slot>
              <slot name="register">
              <trip-btn
                BtnColor="#478c5c"
                class="white--text"
                btn-label="Register" />
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
    }
  },
  data: () => ({
    cardText: 'Jennie',
    cardSubText:
      "Bandos Maldives. North Male Atoll, Bandos Island. Free Cancellation. Reserve now, pay when you stay. $129. per night. Jul 1 - Jul 2. This luxury resort includes 4 restaurants, an outdoor pool, and a gym. There's fun for all ages with a children's club and a children's pool, and babysitting is an added bonus.",
    cardTitleText: 'Maldive',
    Text: 'By:'
  })
}
</script>
