<template>
  <v-container class="MainContain">
    <v-card class="rounded-xl">
      <v-col cols='12'>
        <c-dialog
          label1="Leave this page"
          label2="You are about to leave this page"
          :icon='true'
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
      <form-component ref="form" v-model="form" :timeData="time" :DateData="tripDate">
        <template v-slot:FormBtn1>
          <c-dialog
            class=""
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
        </template>
      </form-component>
    </v-card>
  </v-container>
</template>

<script>
import { Service } from '@/service/index.js'
import FormComponent from './Component/FormComponent.vue'

export default {
  components: {
    FormComponent
  },
  data () {
    return {
      validform: true,
      Choice: ['Not Require', 'Require'],
      Tags: ['One day Trip', 'Hiking', 'Sea', 'Camping'],
      rules: {
        createrule: value => !!value || 'field required'
      },
      crrUser: JSON.parse(localStorage.getItem('authUser')),
      updateID: this.$route.params.id,
      time: '',
      tripDate: [],
      form: {}
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    back () {
      this.$router.back()
    },
    async UpdateData (id) {
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
        image: this.form.image,
        category: this.form.category,
        departure: {
          meet_location: this.form.meet_location,
          leave_time: this.form.leave_time
        },
        requirement: {
          age: this.form.age,
          cost: this.form.cost,
          nationalId: this.form.nationalId,
          phoneNumber: this.form.phoneNumber
        },
        expiry: false
      }
      try {
        await Service.UpdateCard(id, form)
        this.$router.push('/user/profile')
      } catch (e) {
        console.log(e)
      }
    }
  },
  async created () {
    try {
      const ImportData = await Service.thisIdData(this.updateID)
      this.time = ImportData.departure.leave_time
      this.tripDate.push(ImportData.start_date, ImportData.end_date)
      this.form = {
        title: ImportData.title,
        destination: ImportData.destination,
        start_date: ImportData.start_date,
        end_date: ImportData.end_date,
        detail: ImportData.detail,
        image: ImportData.image,
        category: ImportData.category,
        meet_location: ImportData.departure.meet_location,
        age: ImportData.requirement.age,
        leave_time: ImportData.departure.leave_time,
        cost: ImportData.requirement.cost,
        nationalId: ImportData.requirement.nationalId,
        phoneNumber: ImportData.requirement.phoneNumber
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
