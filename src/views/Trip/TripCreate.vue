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
      <form-component ref="form" v-model="form">
            <template v-slot:FormBtn1>
            <trip-btn
              type="submit"
              name="Publish"
              @click="publishPost()"
              class="white--text mx-3"
              btn-color="#1687A7"
              btn-label="Publish"
              @display-data="displayData"
              :disabled="!isFormValid"
            />
          </template>
        <template v-slot:FormBtn2>
          <v-row class="d-flex justify-center">
            <c-dialog
              label1="Save or Discard?"
              label2="These changes can't be undone!"
              DioBtnClass="#1687A7"
              DioLabel="Draft"
            >
              <template #agree>
                <v-btn color="#1687A7" text @click="saveChanges(); dialog = false">
                  Save
                </v-btn>
              </template>
              <template #disagree>
                <v-btn color="#1687A7" text @click="discardChanges(); dialog = false">
                  Don't Save
                </v-btn>
              </template>
            </c-dialog>
          </v-row>
        </template>
        <v-card-actions>
          <v-row class="d-flex justify-center pb-5">
            <trip-btn
              type='submit'
              name="Publish"
              @click="PublishPost()"
              class="white--text mx-3"
              btn-color="#1687A7"
              btn-label="Publish"
            />
            <trip-btn
            name="draftPost"
            class="white--text mx-3"
            btn-color="#276678"
            btn-label="Draft"
            @click="draftPost"
            />
          </v-row>
        </v-card-actions>
      </form-component>
    </v-card>
  </v-container>
</template>

<script>
// import { defaultTripcard } from '../Model/tripcard.js'
// import router from '../../router'
import { Service } from '@/service/index.js'
import FormComponent from './Component/FormComponent.vue'

export default {
  name: 'TripCard',
  components: {
    FormComponent
  },
  data () {
    return {
      originalTripCard: null,
      form: {},
      isFormValid: false
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
      this.isFormValid = this.$refs.form.validate()
    },
    async publishPost () {
      const form = {
        id: this.form.id,
        postDate: this.form.postDate,
        title: this.form.title,
        author: {
          id: 2,
          name: 'user0101'
        },
        start_date: this.form.start_date,
        end_date: this.form.end_date,
        detail: this.form.detail,
        image: '',
        category: this.form.category,
        departure: {
          meet_location: this.form.meet_location,
          leave_time: this.form.leave_time
        },
        requirement: {
          cost: this.form.cost,
          nationalId: this.form.nationalId,
          phoneNumber: this.form.phoneNumber
        }
      }
      try {
        await Service.newTripCard(form)
        this.$router.back()
        this.displayData()
        localStorage.removeItem('objectData')
        console.log('Data cleared from localStorage')
      } catch (e) {
        console.log(e)
      }
    },
    async saveChanges () {
      try {
        this.originalTripCard = { ...this.form }
        console.log(this.form)
        console.log(this.originalTripCard)
        localStorage.setItem('objectData', JSON.stringify(this.originalTripCard))
        console.log(this.originalTripCard)
        this.$router.back()
        console.log('Data saved')
      } catch (e) {
        console.log(e)
      }
    },
    displayData () {
      const storedData = JSON.parse(localStorage.getItem('objectData'))
      if (storedData) {
        this.form = { ...storedData }
        this.form.title = storedData.title
        this.form.destination = storedData.destination
      }
    },
    draftPost () {
      this.$router.back()
    },
    back () {
      this.$router.back()
    },
    isFormModified () {
      return JSON.stringify(this.originalTripCard) !== JSON.stringify(this.form)
    },
    discardChanges () {
      localStorage.removeItem('objectData')
      // this.$refs.form.reset()
    }
  },
  created () {
    this.displayData()
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
