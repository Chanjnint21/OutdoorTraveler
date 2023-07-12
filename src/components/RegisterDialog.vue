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
          <span class="text-h5">Registration Form</span>
        </v-card-title>
        <v-card-text>
          <v-form ref='form' v-model="registerCard">
            <v-row>
              <v-col
                cols="12"
              >
                <text-field
                  v-model="Username"
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
                  label="Last name"
                  :rules="[rules.createrule]"

                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <text-field
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
                  hint="Upload your national ID card here"
                  persistent-hint
                />
              </v-col>
            </v-row>
          </v-form>
          <!-- <small>*indicates required field</small> -->
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
  data: () => ({
    registerCard: true,
    dialog: false,
    crrUser: JSON.parse(localStorage.getItem('authUser')),
    Username: '',
    rules: {
      createrule: value => !!value || 'field required'
    },
    form: {
      id: '',
      userid: '',
      cardid: '',
      date: ''
    }
  }),
  watch: {
    dialog (newVal) {
      if (newVal) {
        this.Username = this.crrUser[0].name
      }
    }
  },
  methods: {
    async submit () {
      await Service.submitRegister()
    },
    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>
