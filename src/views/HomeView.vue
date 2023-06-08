<template>
  <div>
    <text-field
    label="Email"
    outlined
    rounded
    class="mb-2"
    color="error"
/>
<text-field
    label="Password"
    outlined
    rounded
    class="mb-2"

/>
<text-field
    label="Destination"
    outlined
    class="mb-2"
    icons="mdi-plus"
/>
<text-field
    label="Search"
    outlined
    class="mb-2"
    icons="mdi-magnify"
/>
<text-area outlined label="Text Area"/>
<slider-field color="#FFB74D" label="Age" hint="Be Honest" ThumbLabel minimum="1" maximum="10"/>
<range-slider-field-vue   hint="Im a hint" maximum="50" minimum="-50" />

</div>
</template>

<script>
import TextField from '@/components/TextField'
import TextArea from '@/components/TextArea.vue'
import SliderField from '@/components/SliderField.vue'
import RangeSliderFieldVue from '@/components/RangeSliderField.vue'

export default {
  name: 'HomePage',

  components: {
    TextField,
    TextArea,
    SliderField,
    RangeSliderFieldVue
  }
}
</script>
