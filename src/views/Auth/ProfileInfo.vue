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
            v-model="userBio"
            name="Bios"
            outlined
            rounded
            label="Bio(optional)"
            hide-details="auto"
            color="#1687A7"
          />
        </v-col>
        <v-col cols="12" class="text-right">
          <slot name="profileSetup"></slot>
        </v-col>
      </v-row>
    </v-form>
  </v-tab-item>
</template>

<script>
export default {
  data () {
    return {
      regForm: false,
      userBio: '',
      rules: {
        createrule: value => !!value || 'field required'
      },
      pfImg: ''
    }
  },
  methods: {
    imageData (newVal) {
      if (newVal === null) return
      this.pfImg = URL.createObjectURL(newVal)
    }
  }
}
</script>
