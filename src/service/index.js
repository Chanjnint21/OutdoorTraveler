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
  async newTripCard (cardinfo) {
    const response = await axios.post('http://localhost:3000/tripcards', cardinfo)
    if (response.status !== 200) {
      console.log(response)
    }
  },
  async logIn (em, pw) {
    try {
      const users = await axios.get('http://localhost:3000/users')
      const user = users.data.find(user => user.email === em && user.password === pw)
      return user
    } catch (e) {
      console.log(e)
    }
  },
  async deleteItem (id) {
    const deleteItem = await axios.delete(`http://localhost:3000/tripcards/delete/${id}`)
    return deleteItem.data
  }
}
