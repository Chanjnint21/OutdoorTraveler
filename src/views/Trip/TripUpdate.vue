<template>
  <v-container class="MainContain">
    <v-card class="rounded-xl">
      <v-col cols='12'>
        <c-dialog
          label1="Leave this page"
          label2="You are about to leave this page"
          icon='true'
          DioBtnClass='grey-text'
        >
          <template #agree>
            <v-btn
              color="#1687A7"
              text
              @click="back(); dialog = false"
            >
              Yes
            </v-btn>
          </template>
          <template #icon>
            <v-icon>mdi-arrow-left</v-icon>
          </template>
        </c-dialog>
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
                counter="1000"
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
          <!-- <v-row class="d-flex justify-center pb-5"> -->
            <!-- <trip-btn
              type='submit'
              name="Publish"
              @click="UpdateData(updateID)"
              class="white--text mx-3"
              btn-color="#1687A7"
              :disabled="!validform"
              btn-label="Update"
              /> -->
              <c-dialog
                class="d-flex justify-center pb-3"
                label1="Comfirm Update"
                label2="You are about to update this card"
                DioLabel="Update"
                DioColor="#1687A7"
              >
                <template #agree>
                  <v-btn
                    color="#1687A7"
                    text
                    @click="dialog = false; UpdateData(updateID)"
                  >
                    Yes
                  </v-btn>
                </template>
              </c-dialog>
          <!-- </v-row> -->
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
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
      timeData: '',
      DateDate: [],
      tripcard: {
        id: '',
        postDate: '',
        title: '',
        author: {
          id: '',
          name: ''
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
    validate () {
      this.$refs.form.validate()
    },
    back () {
      this.$router.back()
    },
    // async getData (id) {
    //   try {
    //     const ImportData = await Service.thisIdDate(id)
    //     this.tripcard = { ...ImportData }
    //     this.timeData = ImportData.departure.leave_time
    //     this.DateDate.push(ImportData.start_date, ImportData.end_date)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
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
  async created () {
    // this.getData(this.updateID)
    try {
      const ImportData = await Service.thisIdDate(this.updateID)
      this.tripcard = { ...ImportData }
      this.timeData = ImportData.departure.leave_time
      this.DateDate.push(ImportData.start_date, ImportData.end_date)
    } catch (e) {
      console.log(e)
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   const currentUser = JSON.parse(localStorage.getItem('authUser'))
  //   if (currentUser[0].id !== this.tripcard.author.id) {
  //     console.log('user/update')
  //     next('/user/home')
  //   } else {
  //     next()
  //   }
  // }
}
</script>
