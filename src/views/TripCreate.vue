<template>
  <v-container class="MainContain">
    <v-card>
      <v-card-title class="d-flex justify-center text-h6">Trip Card</v-card-title>
      <v-form @submit.prevent="Public">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <text-field
                v-model="tripcard.title"
                label="Title"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-alpha-t"
            /></v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                v-model="tripcard.destination"
                label="Destination"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-map-marker"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                v-model="tripcard.startDate"
                label="Start Date"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-calendar-start"
            /></v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                v-model="tripcard.endDate"
                label="End Date"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-calendar-end"
            /></v-col>
            <v-col cols="12">
              <text-area
                v-model="tripcard.details"
                outlined
                rounded
                label="Details"
                color="#1687A7"
                counter
              />
            </v-col>
            <v-col cols="12">
              <file-field
                v-model="tripcard.imageSrc"
                label="Image(s)"
                color="#1687A7"
                outlined
                rounded
                icon="mdi-image"
              />
            </v-col>
            <v-col cols="12">
              <select-field
                v-model="tripcard.categories"
                label="Category"
                color="#1687A7"
                outlined
                :SelectItem="Tags"
                multiple
                rounded
                small-chips
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center text-h6">- Departure -</v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                v-model="tripcard.departure.meet_location"
                label="Meet Location"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-map-marker"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                v-model="tripcard.departure.leave_time"
                label="Leave Time"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-clock"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center text-h6">- Requirements -</v-col>
            <v-col cols="12" sm="6" md="6" class="d-flex align-center">
              <v-col cols=12>
                <range-slider-field
                  v-model="tripcard.requirements.Age"
                  label="Age"
                  hint="Im a hint"
                  max="90"
                  min="15"
                  outlined
                  color="#1687A7"
                  ThumbLabel
                  persistent-hint
                />
              </v-col>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                v-model="tripcard.requirements.cost"
                label="Cost/Person"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-currency-usd"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <select-field
                v-model="tripcard.requirements.nationalId"
                label="National ID"
                color="#1687A7"
                outlined
                rounded
                :SelectItem="Choice"/>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <select-field
                v-model="tripcard.requirements.Phone"
                label="Phone Number"
                color="#1687A7"
                outlined
                rounded
                :SelectItem="Choice"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-action>
          <v-row class="d-flex justify-center pb-5">
            <trip-btn
              type='submit'
              class="white--text mx-3"
              btn-color="#1687A7"
              btn-label="Public"
            />
            <trip-btn
              class="white--text mx-3"
              btn-color="#276678"
              btn-label="Draft"
            />
          </v-row>
        </v-card-action>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      Choice: ['Not Require', 'Require'],
      Tags: ['One day Trip', 'Hiking', 'Sea', 'Camping'],
      tripcard: {
        id: '',
        title: '',
        destination: '',
        startDate: '',
        endDate: '',
        details: '',
        imageSrc: '',
        categories: [],
        departure: {
        },
        requirements: {
        }
      }
    }
  },
  methods: {
    async Public () {
      // const newcard = {
      //   title: this.title,
      //   destination: this.destination,
      //   start_date: this.startDate,
      //   end_date: this.endDate,
      //   detail: this.details,
      //   image: this.imageSrc,
      //   category: this.categories,
      //   departure: {
      //     meet_location: this.meet_location,
      //     leave_time: this.leave_time
      //   },
      //   requirement: {
      //     min_age: null,
      //     max_age: null,
      //     cost: 350,
      //     nationalId: true,
      //     phoneNumber: true
      //   }
      // }
      this.$http.post('http://localhost:3000/tripcards', this.tripcard)
        .then(response => {
          location.reload()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style >
@media(min-width: 1500px ){
  .MainContain{
    padding: 2rem 5rem;
  }
}
@media(min-width: 1800px ){
  .MainContain{
    padding: 2rem 15rem;
  }
}
</style>
