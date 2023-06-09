<template>
  <div>
    <v-slider v-bind="$attrs" v-on="$listeners" :color="color" :hint="hint" :thumb-label="ThumbLabel" :label="label"
    :min="minimum" :max="maximum" :required="required"/>

  </div>
</template>

<script>

export default {
  name: 'SliderField',
  props: {
    color: {
      type: String,
      default: 'blue'
    },
    hint: {
      type: String,
      default: 'Be Honest'
    },
    ThumbLabel: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    minimum: {
      type: String,
      required: true
    },
    maximum: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  }

}
</script>
