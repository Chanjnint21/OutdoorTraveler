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
  async thisOwnerCard (cardId, uId) {
    try {
      const data = await axios.get(`http://localhost:3000/tripcards?id=${cardId}&author.id=${uId}`)
      return data.data
    } catch (e) {
      console.log(e)
    }
  },
  async handleSearchQuery (q) {
    const searchData = await axios.get(`http://localhost:3000/tripcards?q=${q}`)
    return searchData.data
  },
  async newTripCard (card) {
    await axios.post('http://localhost:3000/tripcards', card)
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
    try {
      await axios.delete(`http://localhost:3000/tripcards/${id}`)
    } catch (error) {
      console.log(error)
    }
  },
  async sorting (val) {
    let sortVal
    let sortVal2
    let sortOrd
    if (val === 'Price to High') {
      sortVal = 'requirement.cost'
      sortOrd = 'asc'
    } else if (val === 'Price to Low') {
      sortVal = 'requirement.cost'
      sortOrd = 'desc'
    } else if (val === 'newest') {
      sortVal = 'postDate'
      sortVal2 = 'postTime'
      sortOrd = 'desc'
    } else if (val === 'oldest') {
      sortVal = 'postDate'
      sortVal2 = 'postTime'
      sortOrd = 'asc'
    }
    const Sortdata = await axios.get(`http://localhost:3000/tripcards?_sort=${sortVal},${sortVal2}&_order=${sortOrd},${sortOrd}`)
    const sorting = Sortdata.data
    return sorting
  },
  async thisIdData (id) {
    const Data = await axios.get(`http://localhost:3000/tripcards/${id}`)
    return Data.data
  },
  async UpdateCard (id, cardinfo) {
    axios.put(`http://localhost:3000/tripcards/${id}`, cardinfo)
  },
  async thisUserFav (UserId) {
    const FavData = await axios.get(`http://localhost:3000/Favorite?q=${UserId}`)
    return FavData.data
  },
  async getFav (uId, itemId) {
    try {
      const FavData = await axios.get(`http://localhost:3000/Favorite?user_id=${uId}&card_id=${itemId}`)
      return FavData.data
    } catch (e) {
      console.log(e)
    }
  },
  async submitRegister (subForm) {
    await axios.post('http://localhost:3000/UpcomingTrip', subForm)
  },
  async getRegister (uId, cId) {
    try {
      const regData = await axios.get(`http://localhost:3000/UpcomingTrip?user_id=${uId}&card_id=${cId}`)
      return regData.data
    } catch (e) {
      console.log(e)
    }
  },
  async unRegister (id) {
    await axios.delete(`http://localhost:3000/UpcomingTrip/${id}`)
  },
  async showRegister (uId) {
    try {
      const regData = await axios.get(`http://localhost:3000/UpcomingTrip?user_id=${uId}`)
      return regData.data
    } catch (e) {
      console.log(e)
    }
  },

  async pastTripCard (card) {
    await axios.post('http://localhost:3000/joined', card)
  },
  async expiryCard (id) {
    try {
      await axios.patch(`http://localhost:3000/tripcards/${id}`, { expiry: true })
    } catch (e) {
      console.log(e)
    }
  },
  async registeredCard (id) {
    try {
      const regMatch = await axios.get(`http://localhost:3000/upcomingtrip?card_id=${id}`)
      return regMatch.data
    } catch (e) {
      console.log(e)
    }
  }

}
