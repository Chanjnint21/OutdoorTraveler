<template>
  <v-container class="MainContain">
    <v-card class="rounded-xl">
      <v-card-title class="d-flex justify-center text-h6">Trip Card</v-card-title>
      <v-form v-model="validform" @submit.prevent="PublicPost">
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
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
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
                @date-changed="StartDate"
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <date-picker
                @date-changed="EndDate"
                :rules="[rules.createrule]"
              />
            </v-col>
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
                :rules="[rules.createrule]"
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
                :rules="[rules.createrule, rules.category]"
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
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <time-picker
                @time-save="LeaveTime"
                :rules="[rules.createrule]"
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
                  :rules="[rules.createrule]"
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
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <select-field
                v-model="tripcard.requirements.nationalId"
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
                v-model="tripcard.requirements.phoneNumber"
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
        <v-card-action>
          <v-row class="d-flex justify-center pb-5">
            <trip-btn
              type='submit'
              class="white--text mx-3"
              btn-color="#1687A7"
              btn-label="Public"
              :disabled="!validform"
              @click="validate"
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
import { defaultTripcard } from '../Model/tripcard.js'

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
      this.tripcard.startDate = value
    },
    EndDate (value) {
      this.tripcard.endDate = value
    },
    LeaveTime (value) {
      this.tripcard.departure.leave_time = value
    },
    validate () {
      this.$refs.form.validate()
    },
    async PublicPost () {
      try {
        await this.$http.post('http://localhost:3000/tripcards', this.tripcard)
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
    padding: 2rem 12rem;
  }
}
</style>
