<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="computedDateFormatted"
        :label="label"
        append-icon="mdi-calendar"
        readonly
        color="#1687A7"
        hint="DD/MM/YYYY"
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
      date: null,
      dateFormatted: '',
      menu: false,
      modal: false
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.date = val
      }
    }
    // date: {
    //   // immediate: true,
    //   handler (val) {
    //     this.dateFormatted = this.formatDate(val)
    //   }
    // }
  },
  methods: {
    formatDate (date) {
      if (!date) {
        return null
      }
      console.log('date', date)
      const [year, month, day] = date.split('-')

      console.log(`newDate ${day}/${month}/${year}`)
      return `${day}/${month}/${year}`
    },
    savethisdate (date) {
      const formatDate = this.formatDate(date)
      console.log('saveDate', formatDate)
      this.$refs.menu.save(date)
      this.$emit('input', formatDate)
    }
  }
}
</script>
