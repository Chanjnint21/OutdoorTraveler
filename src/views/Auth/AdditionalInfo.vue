<template>
  <v-tab-item
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-form ref="form" v-model="regForm">
      <v-row>
        <v-col cols="12">
          <text-field
            name="Username"
            label="Username"
            color="#1687A7"
            :rules="[rules.createrule]"
            hide-details="auto"
          />
        </v-col>
        <v-col cols="12">
          <p class="text--disabled">Select 5 tags you inerest in :</p>
          <v-btn-toggle v-model="selectedBtn" class="d-flex justify-space-around" dense multiple>
            <v-row>
              <template v-for="n in Sortlabel.length - 1" >
                <v-col cols="3" :key="n">
                  <trip-btn
                    BtnColor="#1687A7"
                    :btn-label="Sortlabel[n]"
                    rounded
                    outlined
                    :value="Sortlabel[n]"
                    :id="Sortlabel[n]"
                    @sort="sorting(Sortlabel[n])"
                    block
                  />
                </v-col>
              </template>
            </v-row>
          </v-btn-toggle>
        </v-col>
        <v-col cols="12" class="text-right">
          <slot name="addi_info"></slot>
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
      rules: {
        createrule: value => !!value || 'field required'
      },
      pfImg: '',
      selectedBtn: null,
      Sortlabel: [
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
      ]
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
