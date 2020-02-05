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
  cartDetails: []
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
  }
}

export const mutations = {
  setNotifyMessage (state, payload, color) {
    state.notify = {
      display: true,
      color: color,
      message: payload
    }
  },
  setCartDetails (state, payload) {
    state.cartDetails = [...payload]
  }
}
