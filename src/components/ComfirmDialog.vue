<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
      v-bind="$attrs"
      v-on="$listeners"
      :label="DioLabel"
    >
      <template v-slot:activator="{ on, attrs }">
        <trip-btn
          BtnColor="#F44336"
          v-bind="attrs"
          v-on="on"
          class="ml-5"
          :btn-label="DioLabel"
        >
          <!-- <template #icon>
            <v-icon color="white">mdi-delete</v-icon>
          </template> -->
        </trip-btn>
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
            No
          </v-btn>
          <v-btn
            color="#1687A7"
            text
            @click="dialog = false; deleteItem(item.id)"
          >
            Yes
          </v-btn>
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
    DioLabel: String
  },
  methods: {
    deleteItem (id) {
      this.$emit('delete', id)
    }
  }
}
</script>
