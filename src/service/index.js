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
    await axios.post('http://localhost:3000/tripcards', cardinfo)
    // if (response.status !== 200) {
    //   console.log(response)
    // }
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
  },
  async sorting (val) {
    const Sortdata = await axios.get('http://localhost:3000/tripcards')
    const sorting = Sortdata.data
    if (val === 'Price to High') {
      for (let i = 0; i < sorting.length - 1; i++) {
        for (let j = 0; j < sorting.length - i - 1; j++) {
          if (parseFloat(sorting[j].requirement.cost) > parseFloat(sorting[j + 1].requirement.cost)) {
            const temp = sorting[j]
            sorting[j] = sorting[j + 1]
            sorting[j + 1] = temp
          }
        }
      }
    } else if (val === 'Price to Low') {
      for (let i = 0; i < sorting.length - 1; i++) {
        for (let j = 0; j < sorting.length - i - 1; j++) {
          if (parseFloat(sorting[j].requirement.cost) < parseFloat(sorting[j + 1].requirement.cost)) {
            const temp = sorting[j]
            sorting[j] = sorting[j + 1]
            sorting[j + 1] = temp
          }
        }
      }
    } else if (val === 'newest') {
      sorting.sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
      for (let i = 0; i < sorting.length; i++) {
        console.log(sorting[i].postDate)
      }
    } else if (val === 'oldest') {
      sorting.sort((a, b) => new Date(a.postDate) - new Date(b.postDate))
      for (let i = 0; i < sorting.length; i++) {
        console.log(sorting[i].postDate)
      }
    }
    return sorting
  }
}
