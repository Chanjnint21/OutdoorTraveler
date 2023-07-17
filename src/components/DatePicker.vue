<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="date"
        :label="label"
        append-icon="mdi-calendar"
        readonly
        color="#1687A7"
        hint="YYYY-MM-DD"
        v-bind="attrs"
        v-on="on"
        outlined
        rounded
        dense
      />
    </template>
    <v-date-picker
      v-model="date"
      color="#276678"
      no-title
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn text color="#1687A7" @click="menu = false">Cancel</v-btn>
      <v-btn
      text
      color="#1687A7"
      @click="savethisdate(date)"
    >
      OK
    </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      date: '',
      menu: false,
      modal: false,
      menu2: false

    }
  },
  // watch: {
  //   value (val) {
  //     this.date = val
  //   }
  // },

  // watch: {
  //   value: {
  //     immediate: true,
  //     handler (val) {
  //       this.date = val
  //     }
  //   }
  // },
  methods: {
    savethisdate (date) {
      console.log(date)
      this.$refs.menu.save(date)
      this.$emit('input', date)
    }
  }
}
</script>
