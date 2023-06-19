<template>
  <v-container class="MainContain">
    <v-card>
      <v-card-title class="d-flex justify-center text-h6">Trip Card</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="6"
              ><text-field
                label="Title"
                outlined
                rounded
                icons="mdi-alpha-t"
            /></v-col>
            <v-col cols="6">
              <text-field
                label="Destination"
                outlined
                rounded
                icons="mdi-map-marker"
              />
            </v-col>
            <v-col cols="6"
              ><text-field
                label="Start Date"
                outlined
                rounded
                icons="mdi-calendar-start"
            /></v-col>
            <v-col cols="6"
              ><text-field
                label="End Date"
                outlined
                rounded
                icons="mdi-calendar-end"
            /></v-col>
            <v-col cols="12">
              <text-area
                outlined
                rounded
                label="Details"
                counter
              />
            </v-col>
            <v-col cols="12">
              <file-field
                label="Image(s)"
                outlined
                rounded
                icon="mdi-image"
              />
            </v-col>
            <v-col cols="12">
              <select-field
                label="Category"
                outlined
                :SelectItem="Tags"
                multiple
                rounded
                small-chips
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center text-h6">- Departure -</v-col>
            <v-col cols="6">
              <text-field
                label="Meet Location"
                outlined
                rounded
                icons="mdi-map-marker"
              />
            </v-col>
            <v-col cols="6">
              <text-field
                label="Leave Time"
                outlined
                rounded
                icons="mdi-clock"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center text-h6">- Requirements -</v-col>
            <v-col cols="6" class="d-flex align-center">
              <v-col cols=12>
                <range-slider-field
                label="Age"
                hint="Im a hint"
                maximum="90"
                minimum="18"
                outlined
                color="#478c5c"
                ThumbLabel
                persistent-hint
                />
              </v-col>
            </v-col>
            <v-col cols="6">
              <text-field
                label="Cost/Person"
                outlined
                rounded
                icons="mdi-currency-usd"
              />
            </v-col>
            <v-col cols="6">
              <select-field
                label="National ID"
                outlined
                rounded
                :SelectItem="Choice"/>
            </v-col>
            <v-col cols="6">
              <select-field
                label="Phone Number"
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
              btn-color="#478c5c"
              btn-label="Public"/>
            <trip-btn
              class="white--text mx-3"
              btn-color="#013a21"
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
