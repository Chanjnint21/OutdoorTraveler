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
        v-model="dateFormatted"
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
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: '',
      menu: false,
      modal: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.date = val
      }
    },
    date: {
      immediate: true,
      handler (val) {
        this.dateFormatted = this.formatDate(val)
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
    savethisdate () {
      console.log(this.dateFormatted)
      this.$refs.menu.save(this.dateFormatted)
      this.$emit('input', this.dateFormatted)
    }
  }
}
</script>
