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
              <v-card-text class="text-left"><v-icon>mdi-currency-usd</v-icon>Amount: {{ item.requirement.amount }}</v-card-text>
              <v-card-text class="text-left"><v-icon>mdi-car-side</v-icon>Transportation: {{ item.requirement.transportation }}</v-card-text>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" xs='12' sm="6" md="6" lg="6">
          <v-row class="d-flex align-start" no-gutters>
            <v-col cols='12'>
              <v-img
                width="100%"
                height="100%"
                class="align-end"
                :src="item.image[0]"
              />
            </v-col>
            <v-col cols="12">
              <p class="text-left text-h5 my-5">Participator : {{ countUser }}</p>
            </v-col>
            <div class="container">
              <v-col cols='12'>
              <v-list class="scrollable-list">
                <v-list-item
                  class="rounded-xxl mb-3"
                  v-for="list in lists"
                  :key="list.title"
                  style="background-color: rgba(151, 216, 235, 0.5); "
                >
                  <v-list-item-avatar>
                    <v-img :src="list.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title > {{ list.title }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </div>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { Service } from '@/service/index.js'
export default {
  name: 'ViewCard',
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
      detailData: [
        {
          name: 'about',
          children: [
            {
              icon: 'Clock',
              title: 'Time',
              value: 'item.time'
            }
          ]
        },
        {
          icon: 'Clock',
          title: 'Time',
          value: 'item.time'
        }
      ],
      lists: [
        // { title: 'ad', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        // { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        // { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        // { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        // { title: 'ba canel', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
        // { title: 'Jake bone', avatar: 'https://picsum.photos/250/300?image=839' },
        // { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        // { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        // { title: 'ba canel', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
        // { title: 'Jake bone', avatar: 'https://picsum.photos/250/300?image=839' },
        // { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        // { title: 'ba canel', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
        // { title: 'Jake bone', avatar: 'https://picsum.photos/250/300?image=839' },
        // { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        // { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        // { title: 'ba canel', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }
      ],
      emptyMatching: false,
      countUser: 0

    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    pushData (data) {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].userName)
        this.lists.push({ title: `${data[i].firstName} ${data[i].lastName} `, avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' })
      }
      this.countUser = this.lists.length
      console.log(this.countUser)
    }
  },
  // call service to get data
  async mounted () {
    const users = await Service.registeredCard(this.item.id)
    // bos data from users to pushData func
    this.pushData(users)
  }
}
</script>
<style scoped>
.container {
  height: calc(100% - 100px);
  overflow-y: scroll;
}

.scrollable-list {
  height: 400px;
}
</style>
