<template>
  <div>
    <c-dialog
    label1="Save or Discard?"
    label2="These changes can't be undone!"
    :icon="button ? false : true"
    DioBtnClass="grey-text"
    :DioLabel="button ? 'Draft' : '' "
    :DioValue="dio_val"
  >
    <template #agree>
      <v-btn color="#1687A7" text @click="emitSaveChanges(); dialog = false">
        Save
      </v-btn>
    </template>
    <template #disagree>
      <v-btn color="#1687A7" text @click="DiscardChanges(); dialog = false">
        Don't Save
      </v-btn>
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
    },
    dio_val: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitSaveChanges () {
      this.$emit('saveChanges')
      this.dialog = false
    },
    DiscardChanges () {
      localStorage.removeItem('objectData')
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
