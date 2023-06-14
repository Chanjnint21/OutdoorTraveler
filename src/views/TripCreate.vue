<template>
  <div class="create">
    <v-card>
      <v-card-title class="d-flex justify-center"> <h2>Create Trip</h2> </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="6"
              ><text-field
                label="Title"
                outlined
                icons="mdi-alpha-t"
            /></v-col>
            <v-col cols="6">
              <text-field
                label="Destination"
                outlined
                icons="mdi-map-marker"
              />
            </v-col>
            <v-col cols="6"
              ><text-field
                label="Start Date"
                outlined
                icons="mdi-calendar-start"
            /></v-col>
            <v-col cols="6"
              ><text-field
                label="End Date"
                outlined
                icons="mdi-calendar-end"
            /></v-col>
            <v-col cols="12">
              <text-area
                outlined
                label="Details"
                counter
              />
            </v-col>
            <v-col cols="12">
              <file-field
                label="Image(s)"
                outlined
                icon="mdi-image"
              />
            </v-col>
            <v-col cols="12">
              <category-field
                label="Category"
                outlined
                items="items"
                multiple
                chips
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center"><h2>- Departure -</h2></v-col>
            <v-col cols="6">
              <text-field
                label="Meet Location"
                outlined
                icons="mdi-map-marker"
              />
            </v-col>
            <v-col cols="6">
              <text-field
                label="Leave Time"
                outlined
                icons="mdi-clock"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center"><h2>- Requirements -</h2></v-col>
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
                icons="mdi-currency-usd"
              />
            </v-col>
            <v-col cols="6">
              <category-field label="National ID" outlined items="items"/>
            </v-col>
            <v-col cols="6">
              <category-field label="Phone Number" outlined items="items"/>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-action>
        <v-row class="d-flex justify-center pb-5">
            <button-component class="white--text mx-3" btn-color="#478c5c" btn-label="Public"/>
            <button-component class="white--text mx-3" btn-color="#013a21" btn-label="Draft"/>
        </v-row>
      </v-card-action>
    </v-card>
  </div>
</template>

<script>
import RangeSliderField from '@/components/RangeSliderField.vue'

export default {
  components: {
    RangeSliderField
  }
}
</script>
