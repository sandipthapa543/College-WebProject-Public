export const strict = false
export const state = ()  => ({


  notify: {
    color: 'green',
    message: '',
    display: ''
  },
  notifyError: {
    color: 'red',
    message: 'Error',
    display: false
  },
  cartDetails: [],
  searchName: ''
})


export const  getters = {
  getNotifyMessage (state) {
    return  state.notify
  },
  getNotifyError (state) {
    return  state.notify
  },
  getCartDetails (state) {
    return state.cartDetails
  },
  getSearchName (state) {
    return state.searchName
  }

}

export const mutations = {
  setNotifyMessage (state, payload) {
    state.notify = {
      display: true,
      color: payload.color,
      message: payload.message
    }
  },
  setCartDetails (state, payload) {
    state.cartDetails = [...payload]
  },
  setSearchName (state, payload) {
    state.searchName = payload
  }
}
