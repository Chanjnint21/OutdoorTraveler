<template>
  <div>
    <text-field
    v-model="email"
    label="E-mail"
    outlined
    rounded
    class="mb-2"
    color="#F44336"
    name="email"
/>
<text-field
    label="Password"
    outlined
    rounded
    class="mb-2"
    :icons="show ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="show = !show"
    hint="At least 8 characters"
    counter
    required
    color="#F44336"
    :type="show ? 'text' : 'password'"
/>
<text-field
    label="Destination"
    outlined
    rounded
    class="mb-2"
    icons="mdi-plus"
/>
<text-field
    label="Search"
    outlined
    rounded
    class="mb-2"
    icons="mdi-magnify"
/>
<text-area outlined label="Text Area" counter/>
<slider-field color="#1B5E20" label="Age" hint="Be Honest" ThumbLabel minimum="1" maximum="10"/>
<range-slider-field-vue label="Age" hint="Im a hint" maximum="90" minimum="18" color="#1B5E20" ThumbLabel/>
<category-field label="Category" outlined items="items"/>
<file-field label="File input" filled icon="mdi-camera"/>
</div>
</template>

<script>

import RangeSliderFieldVue from '@/components/RangeSliderField.vue'
import FileField from '@/components/FileField.vue'

export default {
  name: 'HomePage',
  data () {
    return {
      show: false
    }
  },
  components: {
    RangeSliderFieldVue,
    FileField
  }
}
</script>
