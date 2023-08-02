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
      :max="applyMax()"
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
    // min: {
    //   arr: {
    //     type: Date,
    //     default: function () {
    //       return new Date()
    //     }
    //   }
    // },
    // max: {
    //   arr: {
    //     type: Date,
    //     default: function () {
    //       return new Date()
    //     }
    //   }
    // }
    min: {
      type: String,
      required: true
    },
    max: {
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
    // getCurrentDate () {
    //   const currentDate = new Date()
    //   const day = String(currentDate.getDate()).padStart(2, '0')
    //   const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    //   const year = currentDate.getFullYear()
    //   return `${day}/${month}/${year}`
    // }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.date = val
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
    applyMax () {
      return this.parseDate(this.max)
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
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
