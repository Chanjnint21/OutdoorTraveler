<template>
  <div>
    <v-card
      v-bind="$attrs"
      v-on="$listeners"
      :elevation="elevation"
      class="pa-md-4 mx-lg-auto text-center rounded-xl"
    >
      <v-row no-gutters>
        <v-col cols="6" sm="6" md="6" lg="6">
          <v-row>
            <v-col cols="12">
              <v-card-title class="text-h5"><b>{{ item.title }}</b></v-card-title>
              <v-card-text class="text-left">{{ item.detail }}</v-card-text>
              <v-card-subtitle class="text-left" style="font-size: larger; color:blue"> {{ Text1 }} </v-card-subtitle>
              <v-card-text class="text-left"><v-icon>mdi-map-marker</v-icon> Destination:     {{ item. destination}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-calendar-range</v-icon> Start Date:      {{ item. start_date}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-calendar-range</v-icon> End Date:       {{ item. end_date}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-heart</v-icon> Categorize:      {{ item. category}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-clock</v-icon> Departure Location:      {{ item. departure.meet_location}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-clock</v-icon> Departure Leave Time:       {{ item. departure.leave_time}}</v-card-text>
              <v-card-subtitle class="text-left " style="font-size: larger ; color:green"> {{ Text }} </v-card-subtitle>
              <v-card-text class="text-left"><v-icon> mdi-check-underline-circle</v-icon>Minimum Age:     {{ item.requirement.Age[0]}}</v-card-text>
              <v-card-text class="text-left"><v-icon> mdi-check-underline-circle</v-icon>Maximum Age:     {{ item.requirement.Age[1]}}</v-card-text>
              <v-card-text class="text-left"><v-icon> mdi-check-underline-circle</v-icon>Cost:     {{ item.requirement.cost}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-check-underline-circle</v-icon>phoneNumber: {{ item.requirement.phoneNumber}}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-check-underline-circle</v-icon>National ID: {{ item.requirement.nationalId}}</v-card-text>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="6">
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
export default {
  name: 'ViewCard',
  data () {
    return {
      Text: 'Requirements',
      Text1: 'About Trip'
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
  }
}
</script>
