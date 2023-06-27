<template>
  <v-menu
    ref="menu"
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    format="24hr"
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        label="Leave Time"
        append-icon="mdi-clock"
        readonly
        rounded
        color="#1687A7"
        outlined
        v-bind="attrs"
        v-on="on"
        dense
      ></v-text-field>
    </template>
    <v-time-picker
      color="#276678"
      v-if="menu2"
      v-model="time"
      full-width
      @click:minute="$refs.menu.save(time); savethistime(time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DatePicker',
  data: () => ({
    date: '',
    menu: false,
    modal: false,
    menu2: false,
    time: ''
  }),
  methods: {
    savethistime (time) {
      this.$emit('time-save', time)
    }
  }
}
</script>
