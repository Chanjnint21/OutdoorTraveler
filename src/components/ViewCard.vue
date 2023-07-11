<template>
  <div>
    <v-card
      v-bind="$attrs"
      v-on="$listeners"
      :elevation="elevation"
      class="pa-4 rounded-xl"
    >
      <v-row no-gutters>
        <v-col cols="12" xs='12' sm="6" md="6" lg="6">
          <v-row no-gutters>
            <v-col cols="12" class='d-flex justify-start'>
              <trip-btn
                icon
                @click="back">
                <template #icon>
                  <v-icon class="pa-2">mdi-arrow-left</v-icon>
                </template>
              </trip-btn>
              <v-avatar class="ml-3" size="40">
                <img src="../assets/Img/pf2.jpg" alt="Patrick">
              </v-avatar>
              <p class="ma-2">{{ item.author.name }}</p>
            </v-col>
            <v-col>
              <v-card-title class="text-h5"><b>{{ item.title }}</b></v-card-title>
              <v-card-text class="text-left">{{ item.detail }}</v-card-text>
              <v-card-subtitle class="text-left" style="font-size: larger; color:blue"> About Trip </v-card-subtitle>
              <v-card-text class="text-left"><v-icon>mdi-map-marker</v-icon> Destination:     {{ item. destination}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-calendar-range</v-icon> Start Date:      {{ item. start_date}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-calendar-range</v-icon> End Date:       {{ item. end_date}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-heart</v-icon> Categorize:      {{ item. category}}</v-card-text>
              <v-card-subtitle class="text-left" style="font-size: larger ; color:green"> Departure </v-card-subtitle>
              <v-card-text class="text-left"><v-icon>mdi-map</v-icon> Location:      {{ item. departure.meet_location}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-clock</v-icon> Time:       {{ item. departure.leave_time}}</v-card-text>
              <v-card-subtitle class="text-left" style="font-size: larger ; color:green"> Requirements </v-card-subtitle>
              <v-card-text class="text-left"><v-icon> mdi-check-underline-circle</v-icon>Minimum Age:     {{ item.requirement.age[0]}}</v-card-text>
              <v-card-text class="text-left"><v-icon> mdi-check-underline-circle</v-icon>Maximum Age:     {{ item.requirement.age[1]}}</v-card-text>
              <v-card-text class="text-left"><v-icon> mdi-check-underline-circle</v-icon>Cost:     {{ item.requirement.cost}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-check-underline-circle</v-icon>phoneNumber: {{ item.requirement.phoneNumber}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-check-underline-circle</v-icon>National ID: {{ item.requirement.nationalId}}</v-card-text>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" xs='12' sm="6" md="6" lg="6">
          <v-row class="d-flex align-start" style="height: 100% " no-gutters>
            <v-img
            width="100%"
            height="100%"
            class="align-end"
            :src="item.image"
          />
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
// import router from '../router'
export default {
  name: 'ViewCard',
  data () {
    return {
    }
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
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
