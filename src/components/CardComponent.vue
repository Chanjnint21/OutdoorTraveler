<template>
  <v-card v-bind="$attrs" v-on="$listeners" :elevation="elevation" class="pa-md-2 mx-lg-auto text-center">
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="6" lg="6">
        <v-img max-width="500" max-height="470" class="align-start" :src="require(`../assets/${imageUrl}`)" />
      </v-col>
      <v-col cols="8" sm="6" md="6" lg="6">
        <v-row class="d-flex align-start" style="height: 60%" no-gutters>
          <v-col cols="12">
            <v-card-title class="text-h5">{{ cardTitleText }}</v-card-title>
            <v-card-subtitle class="text-left">{{ cardSubText }}</v-card-subtitle>
          </v-col>
        </v-row>
        <v-row class="d-flex align-end" style="height: 40%" no-gutters>
          <v-col class="d-flex align-center " cols="12" sm="12" md="6">
            <trip-btn :BtnColor="toggle ? 'success' : 'primary'" Icons="mdi-bookmark" icon />
            <trip-btn BtnColor="#607D8B" class="white--text mr-5" btn-label="Detail" />
            <trip-btn BtnColor="#478C5C" class="white--text" btn-label="Register" />
            <v-col class="d-flex align-center " cols="12" sm="12" md="6">
              <v-card-text class="grey--text">{{ Text }} {{ cardText }}</v-card-text>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import TripBtn from './ButtonComponent.vue'

export default {
  name: 'CardComponent',
  components: {
    TripBtn
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
    imageUrl: {
      type: String
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
