<template>
  <v-tab-item
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-row>
      <v-col cols="12">
        <text-field
          v-model="aditionForm.username"
          id="username"
          name="Username"
          label="Username"
          color="#1687A7"
          hide-details="auto"
          @keyup="checkUsername(aditionForm.username)"
          :error-messages="usernameError"
        />
      </v-col>
      <v-col cols="12">
        <p class="text--disabled">Select at least 5 tags you inerest in :</p>
        <v-btn-toggle v-model="aditionForm.Interest" class="d-flex justify-space-around" dense multiple>
          <v-row>
            <template v-for="n in Taglabel.length - 1" >
              <v-col cols="3" :key="n">
                <trip-btn
                  color="#1687A7"
                  :btn-label="Taglabel[n]"
                  rounded
                  outlined
                  :value="Taglabel[n]"
                  :id="Taglabel[n]"
                  block
                  :disabled="btndis"
                />
              </v-col>
            </template>
          </v-row>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12" class="text-right">
        <slot name="addi_info">
          <trip-btn
            class="white--text mx-2"
            color="#276678"
            @click="backTab('personal_info')"
          >
            <template #icon>
              <v-icon>mdi-chevron-left</v-icon>
            </template>
          </trip-btn>
        </slot>
        <trip-btn
          :disabled="!regForm"
          class="white--text mx-2"
          color="#1687A7"
          @click="nextTab"
        >
          <template #icon>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </trip-btn>
      </v-col>
    </v-row>
  </v-tab-item>
</template>

<script>
import { Service } from '@/service/index.js'

export default {
  data () {
    return {
      regForm: false,
      btndis: false,
      rules: {
        createrule: value => !!value || 'field required'
      },
      usernameError: '',
      Taglabel: [
        '',
        'Adventure',
        'One day Trip',
        'Multi day Trip',
        'Hiking',
        'Camping',
        'Mountain',
        'Sea',
        'Forest',
        'Diving',
        'Volunteer Trip',
        'Event Traveling',
        'Heritage Walk'
      ],
      aditionForm: {
        username: '',
        Interest: []
      }
    }
  },
  watch: {
    aditionForm: {
      deep: true,
      immediate: true,
      async handler () {
        if (this.aditionForm.Interest.length < 5 || this.aditionForm.username === '') {
          this.regForm = false
        } else {
          this.regForm = true
        }
      }
    }
  },
  methods: {
    nextTab () {
      this.$emit('aditionForm', this.aditionForm)
    },
    checkUsername () {
      setTimeout(async () => {
        this.usernameError = ''
        const TakenName = await Service.handleSearchUser(this.aditionForm.username)
        for (let i = 0; i < TakenName.length; i++) {
          if (this.aditionForm.username === TakenName[i].name) {
            this.usernameError = 'this username have already taken'
          }
        }
      }, 1000)
    }
  }
}
</script>
