<template>
  <div>
  <v-select v-bind="$attrs" v-on="$listeners" :color="color" :label="label" :required="required"/>
  </div>
</template>

<script>
export default {
  name: 'SelectField',
  props: {
    color: {
      type: String
    },
    label: {
      type: String,
      default: 'Category'
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>
