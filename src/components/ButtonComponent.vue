<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :color="BtnColor"
  >
    <slot name="icon"></slot>
    {{ BtnLabel }}
  </v-btn>
</template>
<script>
export default {
  name: 'TripBtn',
  props: {
    val: String,
    BtnLabel: {
      type: String
    },
    BtnColor: {
      type: String,
      default: '#1687A7'
    },
    icons: {
      type: String
    },
    IconClass: String
  }
}
</script>
