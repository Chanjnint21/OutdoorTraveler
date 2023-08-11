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
      <form-component ref="form" v-model="form" :timeData="time" :DateData="tripDate" @testing="passimagedata">
        <template #onUpdateRoute>
          <v-col cols="12">
            <p class="text--disabled">Noted: the image will delete instanly when you click on bin</p>
            <v-row no-gutters>
              <template  v-for="(n, i) of cardImage.length">
                <v-col :key="i" cols="12" sm="6" md="4" style="border: 1px solid #f6f6f6;" class="d-flex align-center justify-space-between px-3">
                  <v-icon @click="onDeleteImg(originImg[i])" color="error">mdi-delete</v-icon>
                  <img width="100" :src="cardImage[i]"/>
                </v-col>
              </template>
            </v-row>
          </v-col>
        </template>
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
import { storage } from '@/firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

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
      form: {},
      Images: [],
      IMageData: null,
      cardImage: [],
      originImg: []
    }
  },
  methods: {
    passimagedata (newVal) {
      this.IMageData = newVal
    },
    validate () {
      this.$refs.form.validate()
    },
    back () {
      this.$router.back()
    },
    onDeleteImg (val) {
      // console.log(this.originImg)
      const path = `folder/${val}`
      for (let i = 0; i <= this.originImg.length; i++) {
        if (this.originImg[i] === val) {
          this.originImg.splice(i, 1)
        }
      }
      const newImgData = {
        image: this.originImg
      }
      deleteObject(ref(storage, path)).then(async () => {
        await Service.UpdateCardImg(this.updateID, newImgData)
        this.$router.go()
      })
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
        image: this.form.image.concat(this.originImg),
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
      if (this.IMageData !== null) {
        for (let i = 0; i < this.IMageData.length; i++) {
          // upload img to firebase
          const file = this.IMageData[i]
          const storageRef = ref(storage, `folder/${this.form.image[i]}`)
          uploadBytes(storageRef, file).catch((e) => {
            console.log(e)
          })
        }
      }
      try {
        await Service.UpdateCard(id, form)
        this.$router.back()
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
        category: ImportData.category,
        meet_location: ImportData.departure.meet_location,
        age: ImportData.requirement.age,
        leave_time: ImportData.departure.leave_time,
        cost: ImportData.requirement.cost,
        nationalId: ImportData.requirement.nationalId,
        phoneNumber: ImportData.requirement.phoneNumber,
        amount: ImportData.requirement.amount,
        transportation: ImportData.requirement.transportation
      }
      // get the url of image from firebase
      for (let i = 0; i < ImportData.image.length; i++) {
        const path = `folder/${ImportData.image[i]}`
        getDownloadURL(ref(storage, path)).then(
          (downLoadUrl) => {
            this.cardImage.push(downLoadUrl)
            this.originImg.push(ImportData.image[i])
          }
        )
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
