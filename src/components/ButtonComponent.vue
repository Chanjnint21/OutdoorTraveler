<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :color="BtnColor"
  >
    <v-icon >{{ Icons }}</v-icon>
    {{ BtnLabel }}
    <router-link
      class="white--text text-decoration-none pl-1"
      :to="RouterPath">{{ BtnRouter }}
    </router-link>
  </v-btn>
</template>
<script>
export default {
  name: 'ButtonComponent',
  props: {
    BtnLabel: {
      type: String
    },
    BtnColor: {
      type: String
    },
    Icons: {
      type: String
    },
    RouterPath: String,
    BtnRouter: String
  }
}
</script>
