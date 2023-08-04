<template>
  <v-container fluid class="Login d-flex align-center justify-center" style="height: 100%; width:100%">
      <v-card class="LoginCard rounded-xl" elevation="5">
        <v-toolbar>
          <v-col cols="2">
            <trip-btn
                icon
                @click="back">
                <template #icon>
                  <v-icon class="pa-2">mdi-arrow-left</v-icon>
                </template>
              </trip-btn>
          </v-col>
          <v-col cols="8" class="text-center">
            <v-toolbar-title class="text-h5" style="color: #1687A7;" >Register</v-toolbar-title>
          </v-col>
          <v-spacer></v-spacer>
          <template v-slot:extension>
            <v-tabs
              v-model="tabs"
              fixed-tabs
              color="#1687A7"
            >
              <v-tabs-slider></v-tabs-slider>
              <v-tab
                href="#personal_info"
              >
                <span class><v-icon>mdi-numeric-1-circle</v-icon>Personal Information</span>
              </v-tab>
              <v-tab
                href="#additional_info"
                :disabled="true"
              >
                <span class><v-icon>mdi-numeric-2-circle</v-icon>Additional Info</span>
              </v-tab>
              <v-tab
                href="#profile_info"
                :disabled="false"
              >
                <span class><v-icon>mdi-numeric-3-circle</v-icon>Profile Setup</span>
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items v-model="tabs" class="pa-5">
          <personal-info value="personal_info" @personalForm="personalform">
            <template #personal_info>
              <trip-btn
                class="white--text mx-2"
                btn-color="#1687A7"
                @click="nextTab('additional_info')"
              >
                <template #icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </trip-btn>
            </template>
          </personal-info>
          <additional-info value="additional_info">
            <template #addi_info>
              <trip-btn
                class="white--text mx-2"
                btn-color="#276678"
                @click="backTab('personal_info')"
              >
                <template #icon>
                  <v-icon>mdi-chevron-left</v-icon>
                </template>
              </trip-btn>
              <trip-btn
                class="white--text mx-2"
                btn-color="#1687A7"
              >
                <template #icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </trip-btn>
            </template>
          </additional-info>
          <profile-info value="profile_info">
            <template #profileSetup>
              <trip-btn
                class="white--text mx-2"
                btn-color="#276678"
                @click="backTab('additional_info')"
              >
                <template #icon>
                  <v-icon>mdi-chevron-left</v-icon>
                </template>
              </trip-btn>
              <trip-btn
                class="white--text mx-2"
                btn-color="#1687A7"
                btn-label="Register"
                href="#mobile-tabs-5-3"
              />
            </template>
          </profile-info>
        </v-tabs-items>
      </v-card>
  </v-container>
</template>

<script>
import personalInfo from './personalInfo.vue'
import additionalInfo from './AdditionalInfo.vue'
import profileInfo from './ProfileInfo.vue'
// import { Service } from '@/service/index.js

export default {
  components: {
    personalInfo,
    profileInfo,
    additionalInfo
  },
  data () {
    return {
      tabs: null,
      form: ''

    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    backTab (val) {
      this.tabs = val
    },
    nextTab (val) {
      this.tabs = val
    },
    personalform (newVal) {
      this.form = newVal
      if (newVal) {
        this.tabs = 'additional_info'
      }
    }
  }
}
</script>

<style scoped>
.Login {
  background-color: #1687A7;
}

@media screen and (min-width: 850px) {
  .LoginCard {
    width: 800px;
  }
}
</style>
