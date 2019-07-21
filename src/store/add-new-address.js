import { ADD_NEW_ADDRESS, WALLET } from '@/store/types'

export const namespaced = false

export const state = () => ({
  fields: {
    currency: -1,
    address: ''
  },
  isOpen: false,
  isLoading: false,
  isError: false
})

export const getters = {
  [ADD_NEW_ADDRESS.GETTER.GET_FIELDS]: state => ({
    ...state.fields
  }),
  [ADD_NEW_ADDRESS.GETTER.IS_OPEN]: state => state.isOpen,
  [ADD_NEW_ADDRESS.GETTER.IS_LOADING]: state => state.isLoading,
  [ADD_NEW_ADDRESS.GETTER.IS_ERROR]: state => state.isError
}

export const mutations = {
  [ADD_NEW_ADDRESS.MUTATION.SET_IS_LOADING]: (state, value) => {
    state.isLoading = value
  },
  [ADD_NEW_ADDRESS.MUTATION.CHANGE_FIELD]: (state, { field, value }) => {
    state.fields[field] = value
  },
  [ADD_NEW_ADDRESS.MUTATION.SET_MODAL_OPEN]: (state, value) => {
    state.isOpen = value
  },
  [ADD_NEW_ADDRESS.MUTATION.SET_IS_ERROR]: (state, value) => {
    state.isError = value
  }
}

export const actions = {
  async [ADD_NEW_ADDRESS.ACTION.SUBMIT]({ commit, state, dispatch }) {
    try {
      commit(ADD_NEW_ADDRESS.MUTATION.SET_IS_LOADING, true)

      const data = {
        currency: state.fields.currency,
        address: state.fields.address
      }

      await this.$api.addNewWallet(data)

      await dispatch(WALLET.ACTION.LOAD_WALLET_LIST)
      commit(ADD_NEW_ADDRESS.MUTATION.SET_MODAL_OPEN, false)
    } catch (error) {
      console.error(error)
      commit(ADD_NEW_ADDRESS.MUTATION.SET_IS_ERROR, true)
    } finally {
      commit(ADD_NEW_ADDRESS.MUTATION.SET_IS_LOADING, false)
      commit(ADD_NEW_ADDRESS.MUTATION.CHANGE_FIELD, { field: 'currency', value: -1 })
      commit(ADD_NEW_ADDRESS.MUTATION.CHANGE_FIELD, { field: 'address', value: '' })
    }
  }
}
