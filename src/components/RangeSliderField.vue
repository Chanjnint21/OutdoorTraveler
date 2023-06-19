<template>
  <div>
    <v-range-slider
      v-bind="$attrs"
      v-on="$listeners"
      :hint="hint"
      :min="minimum"
      :max="maximum"
      :required="required"
      :color="color"
      :thumb-label="ThumbLabel"
      :label="label"
    />
  </div>
</template>

<script>
export default {
  name: 'RangeSlider',
  props: {
    hint: {
      type: String,
      default: 'Im a hint'
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
    },
    color: {
      type: String,
      default: ''
    },
    ThumbLabel: {
      type: Boolean,
      default: false
    }

  }
}
</script>
