<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
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
                v-model="regisForm.userName"
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
                  v-model="regisForm.firstName"
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
                  v-model="regisForm.lastName"
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
                  v-model="regisForm.phoneNumber"
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
                  v-model="regisForm.age"
                  type="number"
                  label="Age"
                  required
                  :rules="[rules.ageRule]"

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
                  :rules="[]"
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
                @click="onCancel"
              >
                Cancel
              </v-btn>

              <v-btn
                color="#1687A7"
                text
                @click="submit(); dialog = false"
                :disabled='!isFormComplete || limitRegister'
                :rules="[]"
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
    item: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isFormComplete: false,
    isAgeValid: false,
    dialog: false,
    registeredUser: [],
    limitRegister: false,
    crrUser: JSON.parse(localStorage.getItem('authUser')),
    regisForm: {
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
  }),
  computed: {
    rules () {
      return {
        createrule: this.validateCreateRule,
        ageRule: value => {
          const age = parseInt(value)
          if (age >= this.item.requirement.age[0] && age <= this.item.requirement.age[1]) {
            return true
          } else {
            return false
          }
        }
      }
    }
  },
  watch: {
    dialog (newVal) {
      if (newVal) {
        this.regisForm.userName = this.crrUser[0].name
        this.regisForm.user_id = this.crrUser[0].id
        this.regisForm.card_id = this.item
        this.regisForm.firstName = this.crrUser[0].firstName
        this.regisForm.lastName = this.crrUser[0].lastName
        this.regisForm.phoneNumber = this.crrUser[0].phone
        this.validate()
      }
    },
    value (val) {
      this.dialog = val
      if (val) {
        this.getParticipator()
      }
    },
    age: {
      immediate: true,
      handler (newVal) {
        this.ageRule = newVal
      }
    }
  },
  methods: {
    async submit () {
      if (this.isFormComplete) {
        try {
          await Service.submitRegister(this.regisForm)
          this.clearForm()
          this.$emit('register', true)
        } catch (e) {
          console.log(e)
        }
      }
    },
    onCancel () {
      this.$emit('onCancel')
    },
    validate () {
      this.isFormComplete = this.$refs.form.validate()
    },
    validateCreateRule (value) {
      return !!value || 'field required'
    },
    clearForm () {
      this.userName = ''
      this.firstName = ''
      this.age = ''
      this.lastName = ''
      this.phoneNumber = ''
      this.card_id = ''
    },
    countData (userData) {
      for (let i = 0; i < userData.length; i++) {
        this.registeredUser.push(userData[i])
        console.log(this.registeredUser)
      }
    },
    validateRegisUser () {
      if (this.countData < this.item.requirement.amount) {
        this.isFull = false
      } else {
        this.isFull = true
      }
    }
    // async getParticipator () {
    //   try {
    //     if (this.item) {
    //       const data = await Service.getParticipator(this.item.id)
    //       console.log(data)
    //       this.limitRegister = data.length === this.item.requirement.amount
    //       console.log(this.limitRegister)
    //       this.$emit('getParticipator')
    //     }
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  },
  mounted () {
    this.validateAge()
    console.log('reg', this.item)
  }
}
</script>
