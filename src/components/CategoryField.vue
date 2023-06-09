<template>
  <div>
    <v-select v-bind="$attrs" v-on="$listeners" :label="label" :outlined="outlined" :items="items"/>
  </div>
</template>

<script>
export default {
  name: 'SelectField',
  // data () {
  //   return {
  //     items: ['Foo', 'Bar', 'Fizz', 'Buzz']
  //   } //},
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz']
  }),
  props: {
    label: {
      type: String
    },
    outlined: {
      type: Boolean,
      default: false
    }
  }
}
</script>
