<template>
  <v-container class="MainContain">
    <v-card class="rounded-xl">
      <v-col cols="1">
        <c-dialog
          label1="Save or Discard?"
          label2="These changes can't be undone!"
          :icon="true"
          DioBtnClass="grey-text"
        >
          <template #agree>
            <v-btn color="#1687A7" text @click="saveChanges(); dialog = false">
              Save
            </v-btn>
          </template>
          <template #disagree>
            <v-btn color="#276678" text @click="discardChanges(); dialog = false">
              Don't Save
            </v-btn>
          </template>
          <template #icon>
            <v-icon>mdi-arrow-left</v-icon>
          </template>
        </c-dialog>
      </v-col>
      <v-card-title class="d-flex justify-center text-h6">Trip Card</v-card-title>
      <form-component ref="form" v-model="form">
          <template v-slot:FormBtn1>
            <trip-btn
              type="submit"
              name="Publish"
              @click="publishPost()"
              class="white--text"
              btn-color="#1687A7"
              btn-label="Publish"
              @display-data="displayData"
            />
          </template>
        <template v-slot:FormBtn2>
            <c-dialog
              class="d-flex align-center ml-3"
              label1="Save or Discard?"
              label2="These changes can't be undone!"
              DioColor="#276678"
              DioLabel="Draft"
            >
              <template #agree>
                <v-btn color="#1687A7" text @click="saveChanges(); dialog = false">
                  Save
                </v-btn>
              </template>
              <template #disagree>
                <v-btn color="#276678" text @click="discardChanges(); dialog = false">
                  Don't Save
                </v-btn>
              </template>
            </c-dialog>
        </template>
      </form-component>
    </v-card>
  </v-container>
</template>

<script>
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
      isFormValid: false,
      crrUser: JSON.parse(localStorage.getItem('authUser'))
    }
  },
  methods: {
    validate () {
      this.isFormValid = this.$refs.form.validate()
    },
    async publishPost () {
      const form = {
        id: this.form.id,
        postDate: this.form.postDate,
        title: this.form.title,
        destination: this.forn.destination,
        author: {
          id: this.crrUser[0].id,
          name: this.crrUser[0].name
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
    displayData (value) {
      const storedData = JSON.parse(localStorage.getItem('objectData'))
      if (storedData) {
        this.form = { ...storedData }
        // this.form.title = storedData.title
        // this.form.destination = storedData.destination
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
    discardChanges () {
      localStorage.removeItem('objectData')
      this.$router.back()
      console.log(this.originalTripCard)
      console.log('Data not saved!')
    }
  },
  created () {
    this.displayData()
  }
}
</script>
