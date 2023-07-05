import axios from 'axios'
export const Service = {
  async getList () {
    const data = await axios.get('http://localhost:3000/tripcards/')
    return data.data
  },
  async thisUserCard (id) {
    const data = await axios.get(`http://localhost:3000/tripcards?author.id=${id}`)
    return data.data
  },
  async handleSearchQuery (q) {
    const searchData = await axios.get(`http://localhost:3000/tripcards?q=${q}`)
    return searchData.data
  },
  async newTripCard (cardinfo) {
    await axios.post('http://localhost:3000/tripcards', cardinfo)
  },
  async logIn (em, pw) {
    try {
      const users = await axios.get(`http://localhost:3000/users?email=${em}&password=${pw}`)
      return users.data
    } catch (e) {
      console.log(e)
    }
  },
  async deleteItem (id) {
    const deleteItem = await axios.delete(`http://localhost:3000/tripcards/${id}`)
    return deleteItem.data
  },
  async sorting (val) {
    let sortVal
    let sortOrd
    if (val === 'Price to High') {
      sortVal = 'requirement.cost'
      sortOrd = 'asc'
    } else if (val === 'Price to Low') {
      sortVal = 'requirement.cost'
      sortOrd = 'desc'
    } else if (val === 'newest') {
      sortVal = 'postDate'
      sortOrd = 'desc'
    } else if (val === 'oldest') {
      sortVal = 'postDate'
      sortOrd = 'asc'
    }
    const Sortdata = await axios.get(`http://localhost:3000/tripcards?_sort=${sortVal}&_order=${sortOrd}`)
    const sorting = Sortdata.data
    return sorting
  },
  async thisIdDate (id) {
    const Data = await axios.get(`http://localhost:3000/tripcards/${id}`)
    return Data.data
  },
  async UpdateCard (id, cardinfo) {
    axios.put(`http://localhost:3000/tripcards/${id}`, cardinfo)
  }
}
