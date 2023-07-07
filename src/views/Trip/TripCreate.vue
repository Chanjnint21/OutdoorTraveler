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
            <v-btn color="#1687A7" text @click="discardChanges(); dialog = false">
              Don't Save
            </v-btn>
          </template>
          <template #icon>
            <v-icon>mdi-arrow-left</v-icon>
          </template>
        </c-dialog>
      </v-col>
      <v-card-title class="d-flex justify-center text-h6">Trip Card</v-card-title>
      <form-component ref="form" v-model="tripcard">
        <template v-slot:FormBtn1>
          <trip-btn
            type="submit"
            name="Publish"
            @click="publishPost()"
            class="white--text mx-3"
            btn-color="#1687A7"
            btn-label="Publish"
            @display-data="displayData"
          />
        </template>
        <template v-slot:FormBtn2>
          <v-row class="d-flex justify-center pb-5">
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
      </form-component>
    </v-card>
  </v-container>
</template>

<script>
import { Service } from '@/service/index.js'

export default {
  data () {
    return {
      originalTripCard: null,
      // tripcard: {
      //   postDate: null,
      //   author: {
      //     id: '',
      //     name: ''
      //   },
      //   title: '',
      //   destination: '',
      //   start_date: ''
      // },
      tripcard: {}
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    async publishPost () {
      console.log(this.originalTripCard)
      this.tripcard.postDate = new Date()
      const currentUser = JSON.parse(localStorage.getItem('authUser'))
      this.tripcard.author.id = currentUser[0].id
      this.tripcard.author.name = currentUser[0].name
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
        this.originalTripCard = { ...this.tripcard }
        // save this original trip card to local storage
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
        this.tripcard = { ...storedData }
        this.tripcard.title = storedData.title
        this.tripcard.destination = storedData.destination
        this.tripcard.start_date = storedData.start_date
      }
      this.originalTripCard = { ...value }
    },
    draftPost () {
      this.back()
    },
    back () {
      this.$router.back()
    },
    isFormModified () {
      return JSON.stringify(this.originalTripCard) !== JSON.stringify(this.tripcard)
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

<style>
@media (min-width: 1800px) {
  .MainContain {
    padding: 2rem 10rem;
  }
}
</style>
