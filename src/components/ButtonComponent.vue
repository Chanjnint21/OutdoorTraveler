<template>
  <v-btn v-bind="$attrs" v-on="$listeners" :color="BtnColor" :outlined="outlined"
  >{{ BtnLabel }} <v-icon>{{ Icons }}</v-icon></v-btn>
</template>
<script>
export default {
  name: 'ButtonComponent',
  props: {
    BtnLabel: {
      type: String
    },
    BtnColor: {
      type: String
    },
    Icons: {
      type: String
    },
    outlined: {
      type: Boolean,
      default: false
    }
  }
}
</script>
