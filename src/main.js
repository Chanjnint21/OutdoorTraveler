import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import TextField from '@/components/TextField'
import TextArea from '@/components/TextArea.vue'
import SliderField from '@/components/SliderField.vue'
import CategoryField from '@/components/CategoryField.vue'
import FileField from '@/components/FileField.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

Vue.component('ButtonComponent', ButtonComponent)
Vue.component('TextField', TextField)
Vue.component('TextArea', TextArea)
Vue.component('SliderField', SliderField)
Vue.component('CategoryField', CategoryField)
Vue.component('FileField ', FileField)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
