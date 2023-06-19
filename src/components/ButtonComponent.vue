<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :color="BtnColor"
  >
    <v-icon >{{ Icons }}</v-icon>
    {{ BtnLabel }}
  </v-btn>
</template>
<script>
export default {
  name: 'TripButton',
  props: {
    BtnLabel: {
      type: String
    },
    BtnColor: {
      type: String
    },
    Icons: {
      type: String
    }
  }
}
</script>
