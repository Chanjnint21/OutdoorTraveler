<template>
  <v-row>
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
          <v-form ref='form' v-model="registerCard">
            <v-row>
              <v-col
                cols="12"
              >
                <text-field
                  v-model="subForm.userName"
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
                  v-model="subForm.firstName"
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
                  v-model="subForm.lastName"
                  label="Last name"
                  :rules="[rules.createrule]"

                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <text-field
                  v-model="subForm.phoneNumber"
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
                  v-model="subForm.age"
                  label="Age"
                  required
                  :rules="[rules.createrule]"

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
            :disabled='!registerCard'
          >
            submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { Service } from '@/service/index.js'

export default {
  props: {
    this_card: {
      type: String,
      require: true
    }
  },
  data: () => ({
    registerCard: true,
    dialog: false,
    crrUser: JSON.parse(localStorage.getItem('authUser')),
    Username: '',
    rules: {
      createrule: value => !!value || 'field required'
    },
    subForm: {
      id: '',
      user_id: '',
      userName: '',
      firstName: '',
      lastName: '',
      age: '',
      phoneNumber: '',
      card_id: '',
      reg_date: new Date().toLocaleDateString(),
      reg_time: new Date().toLocaleTimeString('en-US', { hour12: false })
    }
  }),
  watch: {
    dialog (newVal) {
      if (newVal) {
        this.subForm.userName = this.crrUser[0].name
        this.subForm.user_id = this.crrUser[0].id
        this.subForm.card_id = this.this_card
        this.subForm.firstName = this.crrUser[0].firstName
        this.subForm.lastName = this.crrUser[0].lastName
        this.subForm.phoneNumber = this.crrUser[0].phone
      }
    }
  },
  methods: {
    async submit () {
      await Service.submitRegister(this.subForm)
      this.$emit('register', true)
    },
    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>
