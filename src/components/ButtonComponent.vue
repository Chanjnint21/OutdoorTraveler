<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :color="BtnColor"
    @click="Btnfunction(val)"
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
      type: String
    },
    icons: {
      type: String
    },
    IconClass: String
  },
  methods: {
    Btnfunction (val) {
      this.$emit('sort', val)
    }
  }
}
</script>
