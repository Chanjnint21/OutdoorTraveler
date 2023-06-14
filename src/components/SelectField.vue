<template>
  <div>
    <v-autocomplete v-bind="$attrs" v-on="$listeners" :label="label" :outlined="outlined" :items="items" :color="color"/>
  </div>
</template>

<script>
export default {
  name: 'SelectField',
  data: () => ({
    items: ['Popular', 'Recommend', 'Price High to Low', 'Price Low to High']
  }),
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
    }
  }
}
</script>
