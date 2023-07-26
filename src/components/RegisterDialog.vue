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
                @click="dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="#1687A7"
                text
                @click="submit(); dialog = false"
                :disabled='!isFormComplete '
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
    this_id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isFormComplete: false,
    isAgeValid: false,
    dialog: false,
    validAge: [],
    crrUser: JSON.parse(localStorage.getItem('authUser')),
    // rules: {
    //   createrule: value => !!value || 'field required',
    //   ageRule: value => {
    //     const tripData = Service.thisIdData(this.this_id)
    //     if (!value || isNaN(value)) {
    //       return "your age isn't valid !"
    //     }
    //     const age = parseInt(value)
    //     if (age >= tripData.requirement.age[0] && age <= tripData.requirement.age[1]) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   }
    // },
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
          if (age >= this.validAge[0] && age <= this.validAge[1]) {
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
        this.regisForm.card_id = this.this_id
        this.regisForm.firstName = this.crrUser[0].firstName
        this.regisForm.lastName = this.crrUser[0].lastName
        this.regisForm.phoneNumber = this.crrUser[0].phone
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
    async validateAge () {
      try {
        const tripData = await Service.thisIdData(this.this_id)
        this.validAge = tripData.requirement.age
        console.log(this.validAge)
        // const age = parseInt(value)
        // if (!isNaN(age) && age >= tripData.requirement.age[0] && age <= tripData.requirement.age[1]) {
        //   return 'Your age is valid!'
        // } else {
        //   return 'Age must be within the valid range.'
        // }
      } catch (e) {
        console.log(e)
        return 'Failed to fetch trip data.'
      }
    },
    validate () {
      this.isFormComplete = this.$refs.form.validate()
    },
    validateCreateRule (value) {
      return !!value || 'field required'
    },

    // validateAge (value) {
    //   const tripData = JSON.parse(this.this_card)
    //   const age = parseInt(value)

    //   if (!isNaN(age) && age >= tripData.requirement.age[0] && age <= tripData.requirement.age[1]) {
    //     this.isAgeValid = true
    //     console.log('hey its ur first step')
    //     return true // Return true when age is valid
    //   } else {
    //     this.isAgeValid = false
    //     return 'Age must be within the valid range.' // Return error message when age is not valid
    //   }
    // },
    clearForm () {
      this.userName = ''
      this.firstName = ''
      this.age = ''
      this.lastName = ''
      this.phoneNumber = ''
      this.card_id = ''
    }
  },
  mounted () {
    this.validateAge()
  }
}
</script>
