<template>
  <v-tab-item
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-form ref="form" v-model="regForm">
      <v-row no-gutters>
        <v-col cols="12" class="text-center pa-2">
          <!-- <v-img width="50" src="../../assets/Img/logo276678.png" /> -->
          <p class="text--disabled">Please type all the requirements below</p>
        </v-col>
        <v-col cols="6" class="pa-2">
          <text-field
            v-model="personalForm.firstName"
            color="#1687A7"
            label="First name"
          />
        </v-col>
        <v-col cols="6" class="pa-2">
          <text-field
            v-model="personalForm.lastName"
            color="#1687A7"
            label="Last name"
          />
        </v-col>
        <v-col cols="6" class="pa-2">
          <text-field
            v-model="personalForm.phoneNumber"
            color="#1687A7"
            label="Phone number"
            :rules="[rules.phonenumber]"
          />
        </v-col>
        <v-col cols="6" class="pa-2">
          <text-field
            v-model="personalForm.email"
            color="#1687A7"
            label="Email"
            :rules="[rules.email]"
          />
        </v-col>
        <v-col cols="6" class="pa-2">
          <text-field
            :type="show ? 'text' : 'password'"
            v-model="passWords"
            color="#1687A7"
            label="Password"
            :rules="[rules.passwords]"
            :icons="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
          />
        </v-col>
        <v-col cols="6" class="pa-2">
          <text-field
            v-model="cfPassword"
            color="#1687A7"
            :error-messages="passwordError"
            label="Comfirm Password"
            :type="show ? 'text' : 'password'"
          />
        </v-col>
        <v-col cols="12" class="text-right">
          <!-- <slot v-if="regForm" name="personal_info"></slot> -->
          <trip-btn
            class="white--text mx-2"
            color="#1687A7"
            :disabled="!regForm"
            @click="nextTab"
          >
            <template #icon>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </trip-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-tab-item>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      regForm: false,
      rules: {
        passwords: v => v.length >= 8 || 'Min 8 characters',
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Invalid e-mail.'
        },
        phonenumber: v => v.length >= 9 || 'Invalid phone number'
      },
      passWords: '',
      cfPassword: '',
      personalForm: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
      },
      passwordError: ''
    }
  },
  watch: {
    cfPassword () {
      if (this.cfPassword !== this.passWords) {
        this.passwordError = 'comfirm password not match to password'
      } else {
        this.passwordError = ''
        this.personalForm.password = this.cfPassword
      }
      return true
    }
  },
  methods: {
    nextTab () {
      this.$emit('personalForm', this.personalForm)
    }
  }
}
</script>
