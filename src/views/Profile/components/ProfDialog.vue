<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <trip-btn
        v-bind="attrs"
        v-on="on"
        class="white--text"
        color="#1687A7"
        btn-label="Edit Profile"
        rounded
        >
        <template v-slot:icon>
          <v-icon>mdi-account-edit</v-icon>
        </template>
      </trip-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" id="prof" class="d-flex justify-center ">
              <v-avatar size="200">
                <v-img :src="userImg" alt="Naruto"/>
              </v-avatar>
            </v-col>
            <v-col cols="12">
              <file-field
                name="imageSrc"
                hide-details="auto"
                label="Change profile"
                @files_item="imageData"
              />
            </v-col>
            <v-col cols="12">
              <text-field
                v-model="userName"
                name="Username"
                label="Username"
                color="#1687A7"
              />
              <text-area
                v-model="userBio"
                name="Bios"
                outlined
                rounded
                label="Bio"
                hide-details="auto"
                color="#1687A7"
              />
            </v-col>
            <v-col cols="12">
              <p class="text-center">- comfirm change -</p>
              <text-field
                type="password"
                v-model="password"
                :error-messages="errorMessages"
                name="destination"
                label="password"
                color="#1687A7"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="#276678"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="#1687A7"
          text
          :disabled="Valid"
          @click="onCheckPassword()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Service } from '@/service/index.js'
import TextField from '@/components/TextField.vue'
import { storage } from '@/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
  // props: {
  //   pfPic: String
  // },
  components: { TextField },
  data: () => ({
    dialog: false,
    Valid: true,
    userImg: '',
    userName: '',
    userBio: '',
    password: '',
    errorMessages: '',
    changePic: null,
    crrUser: JSON.parse(localStorage.getItem('authUser')),
    imgData: null
  }),
  watch: {
    password (newVal) {
      if (newVal !== '') {
        this.Valid = false
      } else {
        this.Valid = true
      }
    }
  },
  methods: {
    async onCheckPassword () {
      try {
        const Token = await Service.logIn(this.crrUser[0].email, this.password)
        if (Token.length === 1) {
          if (this.imgData === null) {
            this.changePic = this.crrUser[0].image
            this.onUpdatingProfile(this.changePic)
          } else {
            const file = this.imgData
            const date = new Date().toJSON().slice(0, 10)
            const time = new Date().toLocaleTimeString('en-US', { hour12: false })
            const fileName = `${this.crrUser[0].name}${date}${time}`
            const storageRef = ref(storage, `profile/${fileName}`)
            uploadBytes(storageRef, file).then(() => {
              this.onUpdatingProfile(fileName)
            })
          }
        } else {
          this.errorMessages = 'Invalid password'
        }
      } catch (e) {
        console.log(e)
      }
    },
    async onUpdatingProfile (newImage) {
      const pfInfo = {
        name: this.userName,
        bio: this.userBio,
        image: newImage
      }
      this.crrUser[0].name = pfInfo.name
      this.crrUser[0].bio = pfInfo.bio
      this.crrUser[0].image = pfInfo.image
      localStorage.setItem('authUser', JSON.stringify(this.crrUser))
      await Service.updateUser(this.crrUser[0].id, pfInfo)
      this.$router.go()
    },
    imageData (newVal) {
      if (newVal === null) {
        this.imgData = null
        console.log(this.imgData)
        return
      }
      this.userImg = URL.createObjectURL(newVal)
      this.imgData = newVal
      console.log(this.imgData)
    }
  },
  mounted () {
    getDownloadURL(ref(storage, `profile/${this.crrUser[0].image}`))
      .then(
        (downLoadUrl) => (this.userImg = downLoadUrl)
      )
    this.userName = this.crrUser[0].name
    this.userBio = this.crrUser[0].bio
  }
}
</script>
