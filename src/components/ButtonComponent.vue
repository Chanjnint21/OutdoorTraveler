<template>
  <v-btn
  v-bind="$attrs"
  v-on="$listeners"
  :color="BtnColor"
  ><v-icon >{{ Icons }}</v-icon> {{ BtnLabel }}</v-btn>
</template>
<script>
export default {
  name: 'ButtonComponent',
  props: {
    BtnLabel: {
      type: String,
      default: 'Button label'
    },
    BtnColor: {
      type: String,
      default: 'green'
    },
    Icons: {
      type: String
    }
  }
}
</script>
