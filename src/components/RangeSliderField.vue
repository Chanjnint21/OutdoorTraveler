<template>
  <div>
<v-range-slider :hint="hint" :min="minimum" :max="maximum" :required="required"/>
  </div>
</template>

<script>
export default {
  name: 'RangeSliderField',
  props: {
    hint: {
      type: String,
      default: 'Im a hint'
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
