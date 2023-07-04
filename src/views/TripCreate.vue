<template>
  <v-container class="MainContain">
    <v-card class="rounded-xl">
      <v-col cols="1">
        <trip-btn icon @click="back">
          <template #icon>
            <v-icon class="pa-2">mdi-arrow-left</v-icon>
          </template>
        </trip-btn>
      </v-col>
      <v-card-title class="d-flex justify-center text-h6">Trip Card</v-card-title>
      <v-form ref='form' v-model="validform">
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
                :passData="DateDate[0]"
                name="startDate"
                @date-changed="StartDate"
                :rules="[rules.createrule]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <date-picker
                :passData="DateDate[1]"
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
                :passData="timeData"
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
              @click="PublishPost()"
              class="white--text mx-3"
              btn-color="#1687A7"
              btn-label="Publish"
            v-if="!!PostBtn"/>
            <trip-btn
              type='submit'
              name="Publish"
              @click="UpdateData(updateID)"
              class="white--text mx-3"
              btn-color="#1687A7"
              :disabled="!validform"
              btn-label="Update"
              v-else/>
            <trip-btn
            name="draftPost"
            class="white--text mx-3"
            btn-color="#276678"
            btn-label="Draft"
            @click="draftPost"
            />
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
// import { defaultTripcard } from '../Model/tripcard.js'
import router from '../router'
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
      updateID: this.$route.params.id,
      PostBtn: true,
      timeData: '',
      DateDate: [],
      tripcard: {
        id: '',
        postDate: '',
        title: '',
        author: {
          id: 2,
          name: 'user0101'
        },
        destination: '',
        start_date: '',
        end_date: '',
        detail: '',
        image: '',
        category: [],
        departure: {
          meet_location: '',
          leave_time: ''
        },
        requirement: {
          cost: '',
          nationalId: null,
          phoneNumber: ''
        }
      }
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
      // save the user data
      this.userData.push(this.tripcard)
      try {
        await Service.newTripCard(this.tripcard)
        this.$router.push('/user/home')
        this.displayData()
        localStorage.removeItem('objectData')
        console.log('Data cleared from localStorage')
      } catch (e) {
        console.log(e)
      }
    },
    async saveChanges () {
      try {
        this.originaltripcard = this.tripcard
        // save this original trip card to local storage
        localStorage.setItem('objectData', JSON.stringify(this.originaltripcard))
        console.log(this.originaltripcard)
        console.log('Data saved')
      } catch (e) {
        console.log(e)
      }
    },
    displayData () {
      const storedData = JSON.parse(localStorage.getItem('objectData'))
      if (storedData) {
        this.tripcard.title = storedData.title
        this.tripcard.destination = storedData.destination
        this.tripcard.start_date = storedData.start_date
        this.tripcard.end_date = storedData.end_date
        this.tripcard.detail = storedData.detail
        this.tripcard.category = storedData.category
        this.tripcard.departure.meet_location = storedData.departure.meet_location
        this.tripcard.departure.leave_time = storedData.departure.leave_time
        this.tripcard.requirement.Age = storedData.requirement.Age
        this.tripcard.requirement.cost = storedData.requirement.cost
        this.tripcard.requirement.nationalId = storedData.requirement.nationalId
        this.tripcard.requirement.phoneNumber = storedData.requirement.phoneNumber
      }
    },
    draftPost () {
      this.back()
    },
    back () {
      router.push({ name: 'home' })
    },
    isFormModified () {
      return this.originaltripcard !== this.tripcard
    },
    discardChanges () {
      // this.tripcard = this.originaltripcard
      // this.$refs.form.reset()
    },
    async getData (id) {
      try {
        const ImportData = await Service.thisIdDate(id)
        this.tripcard = { ...ImportData }
        this.timeData = ImportData.departure.leave_time
        this.DateDate.push(ImportData.start_date, ImportData.end_date)
      } catch (e) {
        console.log(e)
      }
    },
    async UpdateData (id) {
      this.tripcard.postDate = new Date()
      try {
        await Service.UpdateCard(id, this.tripcard)
        this.$router.push('/user/profile')
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
    this.displayData()
    if (this.updateID !== undefined) {
      this.getData(this.updateID)
      this.PostBtn = false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.isFormModified()) {
      const answer = window.confirm("Save or Don't Save ?")
      console.log(answer)

      if (answer) {
        this.saveChanges()
        next()
      } else {
        this.discardChanges()
        next()
      }
    } else {
      next()
    }
  }
}
</script>

<style>
@media(min-width: 1800px) {
  .MainContain {
    padding: 2rem 10rem;
  }
}
</style>
