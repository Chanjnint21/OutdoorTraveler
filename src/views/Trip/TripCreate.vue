<template>
  <v-container class="MainContain">
    <v-card class="rounded-xl">
      <v-col cols="1">
        <save-dialog @saveChanges="SaveChanges" @discardChanges="DiscardChanges"/>
      </v-col>
      <v-card-title class="d-flex justify-center text-h6">Trip Card</v-card-title>
      <form-component ref="form" v-model="form" :validity.sync="isFormComplete">
        <template v-slot:FormBtn1>
          <trip-btn
            type="submit"
            name="Publish"
            @click="publishPost()"
            class="white--text mx-3"
            btn-color="#1687A7"
            btn-label="Publish"
            @display-data="displayData"
            :disabled="!isFormComplete"
          />
        </template>
        <template v-slot:FormBtn2>
          <save-dialog button @saveChanges="SaveChanges" @discardChanges="DiscardChanges"/>
        </template>
      </form-component>
    </v-card>
  </v-container>
</template>

<script>
import { Service } from '@/service/index.js'
import FormComponent from './Component/FormComponent.vue'
import SaveDialog from './Component/SaveDialog.vue'

export default {
  name: 'TripCard',
  components: {
    FormComponent,
    SaveDialog
  },
  data () {
    return {
      originalTripCard: null,
      form: {},
      crrUser: JSON.parse(localStorage.getItem('authUser')),
      isFormComplete: false,
      tripDate: [],
      time: ''
    }
  },
  methods: {
    async publishPost () {
      if (this.isFormComplete) {
        const form = {
          id: '',
          postDate: new Date().toLocaleDateString(),
          postTime: new Date().toLocaleTimeString('en-US', { hour12: false }),
          author: {
            id: this.crrUser[0].id,
            name: this.crrUser[0].name
          },
          title: this.form.title,
          destination: this.form.destination,
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
            age: this.form.age,
            cost: this.form.cost,
            nationalId: this.form.nationalId,
            phoneNumber: this.form.phoneNumber,
            amount: this.form.amount,
            transportation: this.form.transportation
          },
          expiry: false
        }
        try {
          await Service.newTripCard(form)
          this.form.postDate = new Date()
          this.$router.push('/user/home')
          this.displayData()
          localStorage.removeItem('objectData')
          console.log('Data cleared from localStorage')
        } catch (e) {
          console.log(e)
        }
      }
    },
    async SaveChanges () {
      try {
        this.originalTripCard = { ...this.form }
        localStorage.setItem('objectData', JSON.stringify(this.originalTripCard))
        this.$router.push('/user/home')
      } catch (e) {
        console.log(e)
      }
    },
    displayData (value) {
      const storedData = JSON.parse(localStorage.getItem('objectData'))
      if (storedData) {
        this.form = { ...storedData }
      }
      this.originalTripCard = { ...value }
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
    DiscardChanges () {
      localStorage.removeItem('objectData')
      this.$router.back()
    }
  },
  created () {
    this.displayData()
  }
}
</script>
