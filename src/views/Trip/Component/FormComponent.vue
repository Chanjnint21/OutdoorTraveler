<template>
  <div>
    <v-form ref="form" @input="val => $emit('update:validity',val)">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <text-field
              name="title"
              v-model="form.title"
              label="Title"
              color="#1687A7"
              outlined
              rounded
              icons="mdi-alpha-t"
              :rules="[rules.createrule]"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <text-field
              name="destination"
              v-model="form.destination"
              label="Destination"
              color="#1687A7"
              outlined
              rounded
              icons="mdi-map-marker"
              :rules="[rules.createrule]"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <date-picker
              :passData="DateData[0]"
              name="startDate"
              @date-changed="StartDate"
              :rules="[rules.createrule]"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <date-picker
              :passData="DateData[1]"
              name="endDate"
              @date-changed="EndDate"
              :rules="[rules.createrule]"
            />
          </v-col>
          <v-col cols="12">
            <text-area
              name="details"
              v-model="form.detail"
              outlined
              rounded
              label="Details"
              color="#1687A7"
              counter
            />
          </v-col>
          <v-col cols="12">
            <file-field
              name="imageSrc"
              label="Image(s)"
              color="#1687A7"
              outlined
              rounded
              icon="mdi-image"
              :rules="[rules.createrule]"
            />
          </v-col>
          <v-col cols="12">
            <select-field
              name="Categorise"
              v-model="form.category"
              label="Category"
              color="#1687A7"
              outlined
              :SelectItem="Tags"
              multiple
              rounded
              small-chips
              :rules="[rules.createrule]"
            />
          </v-col>
          <v-col cols="12" class="d-flex justify-center text-h6">- Departure -</v-col>
          <v-col cols="12" sm="6" md="6">
            <text-field
              name="meetLocation"
              v-model="form.meet_location"
              label="Meet Location"
              color="#1687A7"
              outlined
              rounded
              icons="mdi-map-marker"
              :rules="[rules.createrule]"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <time-picker
                :passData="timeData"
                name="timeLeave"
                @time-save="LeaveTime"
                :rules="[rules.createrule]"
              />
          </v-col>
          <v-col cols="12" class="d-flex justify-center text-h6">- Requirements -</v-col>
          <v-col cols="12" sm="6" md="6" class="d-flex align-center">
            <v-col cols="12">
              <range-slider-field
                name="ageRange"
                v-model="form.age"
                label="Age"
                hint="Im a hint"
                max="90"
                min="15"
                outlined
                color="#1687A7"
                thumb-label
                persistent-hint
                :rules="[rules.createrule]"
              />
            </v-col>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <text-field
              type="number"
              name="cost"
              v-model.number="form.cost"
              label="Cost/Person"
              color="#1687A7"
              outlined
              rounded
              icons="mdi-currency-usd"
              :rules="[rules.createrule]"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <select-field
              name="nationalId"
              v-model="form.nationalId"
              label="National ID"
              color="#1687A7"
              outlined
              rounded
              :SelectItem="Choice"
              :rules="[rules.createrule]"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <select-field
            name="phoneNumber"
            v-model="form.phoneNumber"
            label="Phone Number"
            color="#1687A7"
            outlined
            rounded
            :SelectItem="Choice"
            :rules="[rules.createrule]"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row class="d-flex justify-center pb-5">
          <v-col cols='1' class="d-flex justify-center">
            <slot name="FormBtn1"></slot>
            <slot name="FormBtn2"></slot>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'tripForm',
  props: {
    value: {
      type: Object
    },
    timeData: {
      type: String,
      default: ''
    },
    DateData: {
      type: Array,
      default: () => []
    },
    validity: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      Choice: ['Not Require', 'Require'],
      Tags: ['One day Trip', 'Hiking', 'Sea', 'Camping'],
      rules: {
        createrule: value => !!value || 'field required'
      },
      PostBtn: true,
      form: {
        id: '',
        postDate: '',
        title: '',
        destination: '',
        start_date: '',
        end_date: '',
        detail: '',
        image: '',
        category: null,
        meet_location: '',
        age: [],
        leave_time: '',
        age: '',
        cost: '',
        nationalId: '',
        phoneNumber: ''
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (val) {
        this.form = val
      },
      form: {
        deep: true, // Watch nested properties inside the expression
        handler () {
          this.validate() // call validate method when form data changes
        }
      }
    }
  },
  methods: {
    validate () {
      this.isFormComplete = this.$refs.form.validate()
      this.$emit('form-complete', this.isFormComplete)
    },
    StartDate (value) {
      this.form.start_date = value
    },
    EndDate (value) {
      this.form.end_date = value
    },
    LeaveTime (value) {
      this.form.leave_time = value
    }
  }
}
</script>
