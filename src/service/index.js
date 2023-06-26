import axios from 'axios'
export const Service = {
  async getList () {
    const data = await axios.get('http://localhost:3000/tripcards/')

    return data.data
  },
  async handleSearchQuery (q) {
    const searchData = await axios.get(`http://localhost:3000/tripcards?q=${q}`)
    return searchData.data
  },
  async deleteItem (id) {
    const deleteItem = await axios.delete(`http://localhost:3000/tripcards/${id}`)
    return deleteItem.data
  }
}
