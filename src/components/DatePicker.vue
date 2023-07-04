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
        v-model="date"
        label="Start Date"
        append-icon="mdi-calendar"
        readonly
        color="#1687A7"
        hint="YYYY-MM-DD"
        v-bind="attrs"
        v-on="on"
        outlined
        rounded
        dense
      ></v-text-field>
    </template>
    <v-date-picker color="#276678" v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="#1687A7"
        @click="menu = false"> Cancel </v-btn>
      <v-btn
        text
        color="#1687A7"
        @click="$refs.menu.save(date);
        savethisdate(date)"> OK </v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  name: 'DatePicker',
  props: {
    passData: {
      type: String,
      require: true
    }
  },
  data: () => ({
    date: '',
    menu: false,
    modal: false,
    menu2: false
  }),
  watch: {
    passData (newVal) {
      this.date = newVal
    }
  },
  methods: {
    savethisdate (date) {
      this.$emit('date-changed', date)
    }
  }
}
</script>
