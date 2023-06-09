<template>
  <div>
    <text-field
    label="E-mail"
    outlined
    rounded
    class="mb-2"
    :rules="[v => !!v || 'Email is required']"
    color="#F44336"
/>
<text-field
    label="Password"
    outlined
    rounded
    class="mb-2"
    :rules="[v => !!v || 'Password is required']"
    required
    icons="mdi-eye"
    color="#F44336"
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
<slider-field color="#1B5E20" label="Age" hint="Be Honest" ThumbLabel minimum="1" maximum="10"/>
<range-slider-field-vue label="Age" hint="Im a hint" maximum="90" minimum="18" color="#1B5E20" ThumbLabel/>
<category-field label="Category" outlined items="items"/>
<file-field label="File input" filled icon="mdi-camera"/>
</div>
</template>

<script>
import TextField from '@/components/TextField'
import TextArea from '@/components/TextArea.vue'
import SliderField from '@/components/SliderField.vue'
import RangeSliderFieldVue from '@/components/RangeSliderField.vue'
import CategoryField from '@/components/CategoryField.vue'
import FileField from '@/components/FileField.vue'

export default {
  name: 'HomePage',
  components: {
    TextField,
    TextArea,
    SliderField,
    RangeSliderFieldVue,
    CategoryField,
    FileField
  },
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz']
  })
}
</script>
