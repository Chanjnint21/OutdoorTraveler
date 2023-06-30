<template>
  <v-container class="MainContain">
    <v-card class="rounded-xl">
      <v-card-title class="d-flex justify-center text-h6">Trip Card</v-card-title>
      <v-form v-model="validform" @submit.prevent="PublishPost">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <text-field
                name="title"
                v-model="tripcard.title"
                label="Title"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-alpha-t"
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                name="destination"
                v-model="tripcard.destination"
                label="Destination"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-map-marker"
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <date-picker
                name="startDate"
                @date-changed="StartDate"
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <date-picker
                name="endDate"
                @date-changed="EndDate"
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12">
              <text-area
                name="details"
                v-model="tripcard.detail"
                outlined
                rounded
                label="Details"
                color="#1687A7"
                counter
              />
            </v-col>
            <v-col cols="12">
              <file-field
                name="imageSrc"
                label="Image(s)"
                color="#1687A7"
                outlined
                rounded
                icon="mdi-image"
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12">
              <select-field
                name="Categorise"
                v-model="tripcard.category"
                label="Category"
                color="#1687A7"
                outlined
                :SelectItem="Tags"
                multiple
                rounded
                small-chips
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center text-h6">- Departure -</v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                name="meetLocation"
                v-model="tripcard.departure.meet_location"
                label="Meet Location"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-map-marker"
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <time-picker
                name="timeLeave"
                @time-save="LeaveTime"
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center text-h6">- Requirements -</v-col>
            <v-col cols="12" sm="6" md="6" class="d-flex align-center">
              <v-col cols=12>
                <range-slider-field
                  name="ageRange"
                  v-model="tripcard.requirement.Age"
                  label="Age"
                  hint="Im a hint"
                  max="90"
                  min="15"
                  outlined
                  color="#1687A7"
                  ThumbLabel
                  persistent-hint
                  :rules="[rules.createrule]"
                />
              </v-col>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                type="number"
                name="cost"
                v-model.number="tripcard.requirement.cost"
                label="Cost/Person"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-currency-usd"
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <select-field
                name="nationalId"
                v-model="tripcard.requirement.nationalId"
                label="National ID"
                color="#1687A7"
                outlined
                rounded
                :SelectItem="Choice"
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <select-field
                name="phoneNumber"
                v-model="tripcard.requirement.phoneNumber"
                label="Phone Number"
                color="#1687A7"
                outlined
                rounded
                :SelectItem="Choice"
                :rules="[rules.createrule]"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row class="d-flex justify-center pb-5">
            <trip-btn
              type='submit'
              name="Publish"
              class="white--text mx-3"
              btn-color="#1687A7"
              :disabled="!validform"
              btn-label="Publish"
            />
            <trip-btn
              name="draftPost"
              class="white--text mx-3"
              btn-color="#276678"
              btn-label="Draft"
            />
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { defaultTripcard } from '../Model/tripcard.js'
import { Service } from '@/service/index.js'

export default {
  data () {
    return {
      validform: true,
      Choice: ['Not Require', 'Require'],
      Tags: ['One day Trip', 'Hiking', 'Sea', 'Camping'],
      rules: {
        createrule: value => !!value || 'field required'
      },
      // creates a new object with the same properties as defaulttripcard
      tripcard: { ...defaultTripcard }
    }
  },
  methods: {
    StartDate (value) {
      this.tripcard.start_date = value
    },
    EndDate (value) {
      this.tripcard.end_date = value
    },
    LeaveTime (value) {
      this.tripcard.departure.leave_time = value
    },
    validate () {
      this.$refs.form.validate()
    },
    async PublishPost () {
      this.tripcard.postDate = new Date()
      try {
        await Service.newTripCard(this.tripcard)
        this.$router.push('/user/home')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style >
@media(min-width: 1800px ){
  .MainContain{
    padding: 2rem 10rem;
  }
}
</style>
