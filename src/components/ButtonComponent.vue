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
    BtnLabel: {
      type: String
    },
    BtnColor: {
      type: String
    },
    icons: {
      type: String
    },
    IconClass: String
  }
}
</script>
