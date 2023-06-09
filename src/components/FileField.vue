<template>
  <div>
<v-file-input
v-bind="$attrs"
v-on="$listeners"
:label="label"
:prepend-icon="icon"
:filled="filled"
/>
  </div>
</template>

<script>
export default {
  name: 'FileField',
  props: {
    label: {
      type: String,
      default: 'File input'
    },
    icon: {
      type: String
    },
    filled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
