<template>
  <v-container class="MainContain">
    <v-card>
      <v-card-title class="d-flex justify-center text-h6">Trip Card</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <text-field
                label="Title"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-alpha-t"
            /></v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                label="Destination"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-map-marker"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                label="Start Date"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-calendar-start"
            /></v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                label="End Date"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-calendar-end"
            /></v-col>
            <v-col cols="12">
              <text-area
                outlined
                rounded
                label="Details"
                color="#1687A7"
                counter
              />
            </v-col>
            <v-col cols="12">
              <file-field
                label="Image(s)"
                color="#1687A7"
                outlined
                rounded
                icon="mdi-image"
              />
            </v-col>
            <v-col cols="12">
              <select-field
                label="Category"
                color="#1687A7"
                outlined
                :SelectItem="Tags"
                multiple
                rounded
                small-chips
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center text-h6">- Departure -</v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                label="Meet Location"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-map-marker"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                label="Leave Time"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-clock"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center text-h6">- Requirements -</v-col>
            <v-col cols="12" sm="6" md="6" class="d-flex align-center">
              <v-col cols=12>
                <range-slider-field
                label="Age"
                hint="Im a hint"
                maximum="90"
                minimum="18"
                outlined
                color="#1687A7"
                ThumbLabel
                persistent-hint
                />
              </v-col>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <text-field
                label="Cost/Person"
                color="#1687A7"
                outlined
                rounded
                icons="mdi-currency-usd"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <select-field
                label="National ID"
                color="#1687A7"
                outlined
                rounded
                :SelectItem="Choice"/>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <select-field
                label="Phone Number"
                color="#1687A7"
                outlined
                rounded
                :SelectItem="Choice"/>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-action>
        <v-row class="d-flex justify-center pb-5">
            <trip-btn
              class="white--text mx-3"
              btn-color="#1687A7"
              btn-label="Public"/>
            <trip-btn
              class="white--text mx-3"
              btn-color="#276678"
              btn-label="Draft"/>
        </v-row>
      </v-card-action>
    </v-card>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      Choice: ['Not Require', 'Require'],
      Tags: ['One day Trip', 'Hiking', 'Sea', 'Camping']
    }
  }
}
</script>

<style >
@media(min-width: 1500px ){
  .MainContain{
    padding: 2rem 5rem;
  }
}
@media(min-width: 1800px ){
  .MainContain{
    padding: 2rem 15rem;
  }
}
</style>
