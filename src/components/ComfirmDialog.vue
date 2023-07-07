<template>
  <v-row dense>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-btn
            :color="DioColor"
            v-bind="attrs"
            v-on="on"
            :class="DioBtnClass"
            :icon='icon'
          >
            {{ DioLabel }}
            <slot name='icon'></slot>
          </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h6">
          {{ label1 }}
        </v-card-title>
        <v-card-text>{{label2}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#276678"
            text
            @click="dialog = false"
          >
          </v-btn>
          <slot name="agree"></slot>
          <v-spacer></v-spacer>
              <v-btn
              color="#276678"
              text
              @click="dialog = false"
              >
              </v-btn>
              <slot name="disagree"> </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      item: {
        type: Object,
        default: () => {}
      }
    }
  },
  props: {
    label1: {
      type: String
    },
    label2: {
      type: String
    },
    DioBtnClass: {
      type: String,
      default: 'white--text icon'
    },
    icon: {
      type: Boolean,
      default: false
    },
    DioLabel: String,
    DioColor: String
  }
  // methods: {
  //   deleteItem (id) {
  //     this.$emit('delete', id)
  //   }
  // }
}
</script>
