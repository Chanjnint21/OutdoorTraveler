<template>
  <v-tab-item>
    <template v-for="item in items">
      <v-col col="12" lg="12" xl="6" :key="item.id">
        <card-component
          height="auto"
          elevation="8"
          :item="item"
        >
          <template #btn2>
            <trip-btn
              BtnColor="#1687A7"
              class="white--text"
              @click="toUpdate(item.id)"
            >
              <template #icon>
                <v-icon>mdi-pencil</v-icon>
              </template>
            </trip-btn>
          </template>
          <template #btn3>
            <c-dialog
              label1="Are you sure?"
              label2="You can't undo this action.Are you sure , you wanna delete this card?"
              DioColor="error"
              DioBtnClass="ml-3"
            >
              <template #agree>
                <v-btn
                  color="#1687A7"
                  text
                  @click="dialog = false; deleteItem(item.id)"
                >
                  Yes
                </v-btn>
              </template>
              <template #icon>
                <v-icon>mdi-delete</v-icon>
              </template>
            </c-dialog>
          </template>
        </card-component>
      </v-col>
    </template>
  </v-tab-item>
</template>

<script>
import { Service } from '@/service/index.js'

export default {
  name: 'HomePage',
  props: {
    UserID: {
      type: String
    }
  },
  data () {
    return {
      items: []
    }
  },
  async mounted () {
    try {
      this.items = await Service.thisUserCard(this.UserID)
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async deleteItem (id) {
      try {
        await Service.deleteItem(id)
        this.items = this.items.filter(item => item.id !== id)
      } catch (error) {
        console.log(error)
      }
    },
    async toUpdate (id) {
      this.$router.push(`/user/update/${id}`)
    }
  }
}
</script>
