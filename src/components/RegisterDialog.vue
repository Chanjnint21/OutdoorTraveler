<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#1687A7"
          dark
          v-bind="attrs"
          v-on="on"
          class='ml-5'
        >
          Register
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5 mb-5">Registration Form</span>
        </v-card-title>
        <v-card-text>
          <v-form ref='form' v-model="isFormComplete">
            <v-row>
              <v-col
                cols="12"
              >
              <text-field
                v-model="userName"
                  label="Username"
                  required
                  readonly
                  :rules="[rules.createrule]"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <text-field
                  v-model="firstName"
                  label="First name"
                  required
                  :rules="[rules.createrule]"

                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <text-field
                  v-model="lastName"
                  label="Last name"
                  :rules="[rules.createrule]"

                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <text-field
                  type="number"
                  v-model="phoneNumber"
                  label="Phone number"
                  required
                  :rules="[rules.createrule]"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <text-field
                  v-model="age"
                  type="number"
                  label="Age"
                  required
                  :rules="[rules.createrule ]"

                />
              </v-col>
              <v-col cols="12">
                <file-field
                  name="imageSrc"
                  label="Image"
                  color="#1687A7"
                  outlined
                  rounded
                  icon="mdi-image"
                  hint="Click to upload your national ID Card"
                  persistent-hint
                  :rules="[rules.createrule]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#276678"
                text
                @click="dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="#1687A7"
                text
                @click="submit(); dialog = false"
                :disabled='!isFormComplete'
              > Submit
              </v-btn>
            </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { Service } from '@/service/index.js'

export default {
  props: {
    this_card: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isFormComplete: false,
    isAgeValid: false,
    dialog: false,
    crrUser: JSON.parse(localStorage.getItem('authUser')),
    rules: {
      createrule: value => !!value || 'field required'
      // ageRule: value => !!value || 'age is invalid'
    },
    Username: '',
    user_id: '',
    userName: '',
    firstName: '',
    age: '',
    lastName: '',
    phoneNumber: '',
    card_id: '',
    reg_date: new Date().toLocaleDateString(),
    reg_time: new Date().toLocaleTimeString('en-US', { hour12: false })
    // regisForm: {
    //   id: '',
    //   user_id: '',
    //   userName: '',
    //   firstName: '',
    //   age: '',
    //   lastName: '',
    //   phoneNumber: '',
    //   card_id: '',
    //   reg_date: new Date().toLocaleDateString(),
    //   reg_time: new Date().toLocaleTimeString('en-US', { hour12: false })
    // }
  }),
  // computed: {
  //   rules () {
  //     return {
  //       createrule: [value =>geRule: [this.valida !!value || 'Field required'],
  //       ateAge]
  //     }
  //   }
  // },
  watch: {
    dialog (newVal) {
      if (newVal) {
        this.userName = this.crrUser[0].name
        this.user_id = this.crrUser[0].id
        this.card_id = this.item.id
        this.firstName = this.crrUser[0].firstName
        this.lastName = this.crrUser[0].lastName
        this.phoneNumber = this.crrUser[0].phone
      }
    },
    age (newVal) {
      this.validateAge(newVal)
    }

  },
  methods: {
    async submit () {
      if (this.isFormComplete) {
        const regisForm = {
          id: '',
          user_id: '',
          userName: '',
          firstName: '',
          age: '',
          lastName: '',
          phoneNumber: '',
          card_id: '',
          reg_date: new Date().toLocaleDateString(),
          reg_time: new Date().toLocaleTimeString('en-US', { hour12: false })
        }
        try {
          await Service.submitRegister(regisForm)
          this.$emit('register', true)
        } catch (e) {
          console.log(e)
        }
      }
    },
    validate () {
      this.isFormComplete = this.$refs.form.validate()
    },
    validateAge (value) {
      const tripData = JSON.parse(this.this_card)
      const age = parseInt(value)

      if (!isNaN(age) && age >= tripData.requirement.age[0] && age <= tripData.requirement.age[1]) {
        this.isAgeValid = true
        console.log('hey its ur first step')
        return true // Return true when age is valid
      } else {
        this.isAgeValid = false
        return 'Age must be within the valid range.' // Return error message when age is not valid
      }
    }
  }
}
</script>
