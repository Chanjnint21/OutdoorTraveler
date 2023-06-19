<template>
  <div>
    <v-autocomplete
    v-bind="$attrs"
    v-on="$listeners"
    :label="label"
    :outlined="outlined"
    :items="SelectItem"
    :color="color"/>
  </div>
</template>

<script>
export default {
  name: 'SelectField',
  props: {
    label: {
      type: String
    },
    outlined: {
      type: Boolean,
      default: false
    },
    color: {
      type: String
    },
    SelectItem: {
      type: Array
    }
  }
}
</script>
