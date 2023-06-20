<template>
  <div>
    <v-textarea
      v-bind="$attrs"
      v-on="$listeners"
      :outlined="outlined"
      :label="label"
      :required="required"
      :counter="counter"
    />
  </div>
</template>

<script>

export default {
  name: 'TextField',
  props: {
    outlined: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: 'Text Area'
    },
    required: {
      type: Boolean,
      default: false
    },
    counter: {
      type: Boolean,
      default: false
    }

  }

}
</script>
