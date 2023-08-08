<template>
  <v-tab-item
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-form ref="form" v-model="regForm">
      <v-row>
        <v-col cols="12" class="pa-2">
          <!-- <v-img width="50" src="../../assets/Img/logo276678.png" /> -->
          <p class="text--disabled">You can skip this step or set up later</p>
        </v-col>
        <v-col cols="12" id="prof" class="d-flex justify-center ">
          <v-avatar color="#276678" size="200">
            <v-img :src="pfImg" alt="Naruto"/>
          </v-avatar>
        </v-col>
        <v-col cols="12">
          <file-field
            name="imageSrc"
            hide-details="auto"
            label="Upload profile"
            @files_item="imageData"
          />
        </v-col>
        <v-col cols="12">
          <text-area
            v-model="profileForm.bio"
            name="Bios"
            outlined
            rounded
            label="Bio"
            hide-details="auto"
            color="#1687A7"
          />
        </v-col>
        <v-col cols="12" class="text-right">
          <slot name="profileSetup"></slot>
          <trip-btn
            class="white--text mx-2"
            btn-color="#1687A7"
            btn-label="Register"
            @click="onRegister"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-tab-item>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      regForm: false,
      userBio: '',
      rules: {
        createrule: value => !!value || 'field required'
      },
      pfImg: '',
      profileForm: {
        bio: '',
        image: 'UserProfileTemplate.png',
        imgdata: []
      }
    }
  },
  methods: {
    imageData (newVal) {
      if (newVal === null) {
        this.profileForm.image = 'UserProfileTemplate.png'
        return
      }
      this.pfImg = URL.createObjectURL(newVal)
      this.profileForm.imgdata = newVal
      const date = new Date().toJSON().slice(0, 10)
      const time = new Date().toLocaleTimeString('en-US', { hour12: false })
      const imgName = `${this.userName}${date}${time}`
      this.profileForm.image = imgName
    },
    onRegister () {
      this.$emit('profileInfo', this.profileForm)
    }
  }
}
</script>
