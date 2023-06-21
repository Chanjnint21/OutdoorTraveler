<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :color="BtnColor"
  >
    <!-- <v-icon >{{ Icons }}</v-icon>
    {{ BtnLabel }} -->
    <slot name="icon">
      <v-icon>{{ Icons }}</v-icon>
    </slot>
    {{ BtnLabel }}
  </v-btn>
</template>
<script>
export default {
  name: 'TripBtn',
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
