import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import TextField from '@/components/TextField'
import TextArea from '@/components/TextArea.vue'
import RangeSlider from '@/components/RangeSliderField.vue'
import SelectField from '@/components/SelectField.vue'
import FileField from '@/components/FileField.vue'
import TripBtn from './components/ButtonComponent.vue'
import VueScrollTo from 'vue-scrollto'
import CardComponent from './components/CardComponent.vue'

Vue.component('ButtonComponent', TripBtn)
Vue.component('TextField', TextField)
Vue.component('TextArea', TextArea)
Vue.component('RangeSliderField', RangeSlider)
Vue.component('SelectField', SelectField)
Vue.component('FileField', FileField)
Vue.component('CardComponent', CardComponent)
Vue.use(VueScrollTo)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
