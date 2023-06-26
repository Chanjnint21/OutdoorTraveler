<template>
  <v-file-input
    v-bind="$attrs"
    v-on="$listeners"
    :label="label"
    prepend-icon=""
    :append-icon="icon"
    multiple
    dense
  />
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
    }
  }
}
</script>
