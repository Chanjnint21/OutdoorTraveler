<template>
  <div>
    <view-card
      v-if="selectedItem"
      height="auto"
      class="pa-md-12 mx-lg-auto text-center"
      elevation="8"
      :item="selectedItem"
    />
  </div>
</template>

<script>
import ViewCard from '@/components/ViewCard.vue'
import { Service } from '@/service/index.js'

export default {
  components: {
    ViewCard
  },
  data () {
    return {
      items: [],
      userId: null,
      selectedItemId: null,
      selectedItem: null
    }
  },
  created () {
    this.userId = this.$route.params.id
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        console.log(this.alert)
        this.items = await Service.getList()
        // Find the selected item based on param.id
        this.selectedItem = this.items.find(item => item.id === this.userId)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
