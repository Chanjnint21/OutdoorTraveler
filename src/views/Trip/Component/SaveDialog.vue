<template>
  <div>
    <c-dialog
    label1="Save or Discard?"
    label2="These changes can't be undone!"
    :icon="button ? false : true"
    DioBtnClass="grey-text"
    :DioLabel="button ? 'Draft' : '' "
  >
    <template #agree>
      <v-btn color="#1687A7" text @click="emitSaveChanges(); dialog = false">
        Save
      </v-btn>
    </template>
    <template #disagree>
      <v-btn color="#1687A7" text @click="emitDiscardChanges(); dialog = false">
        Don't Save
      </v-btn>
    </template>
    <template #icon v-if="!button">
      <v-icon>mdi-arrow-left</v-icon>
    </template>
  </c-dialog>
  </div>
</template>

<script>
export default {
  name: 'SaveDialog',
  props: {
    button: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitSaveChanges () {
      this.$emit('saveChanges')
      this.dialog = false
    },
    emitDiscardChanges () {
      this.$emit('discardChanges')
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>
