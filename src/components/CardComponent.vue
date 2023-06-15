<template>
  <div>
<v-card
v-bind="$attrs"
v-on="$listeners" :elevation="elevation" :width="width" :height="height">
<v-card-title v-bind="$attrs" :color="color" /> <v-card-subtitle/> <v-card-actions/>
</v-card>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    elevation: {
      type: String
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    color: {
      type: String
    }
  }
}
</script>
