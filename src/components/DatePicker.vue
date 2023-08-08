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
      :min="applyMin()"
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
    },
    min: {
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
        console.log(val)
        this.date = this.parseDate(val)
      }
    }
  },
  methods: {
    formatDate (date) {
      if (!date) {
        return null
      }
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    formatCurrentDate (date) {
      if (!date) {
        return null
      }
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    applyMin () {
      return this.parseDate(this.min)
    },
    parseDate (currentDate) {
      if (!currentDate) return null

      const [day, month, year] = currentDate.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    savethisdate (date) {
      const formatDate = this.formatDate(date)
      this.$refs.menu.save(date)
      this.$emit('input', formatDate)
    }
  }
}
</script>
