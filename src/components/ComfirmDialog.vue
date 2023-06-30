<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <template v-slot:activator="{ on, attrs }">
        <trip-btn
          BtnColor="#F44336"
          v-bind="attrs"
          v-on="on"
          class="ml-5"
        >
          <template #icon>
            <v-icon color="white">mdi-delete</v-icon>
          </template>
        </trip-btn>
      </template>
      <v-card>
        <v-card-title class="text-h6">
          You're about to delete this card !
        </v-card-title>
        <v-card-text>You can't undo this action. Are you sure you want to delete this card? </v-card-text>
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
  methods: {
    deleteItem (id) {
      this.$emit('delete', id)
    }
  }
}
</script>
