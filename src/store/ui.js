import { UI } from '@/store/types'

export const namespaced = false

export const state = () => ({
  isConfirmOpen: false,
  confirmFunction: false,
  confirmIsLoading: false,
  confirmMessage: ''
})

export const getters = {
  [UI.GETTER.CONFIRM_DELETE]: state => state.isConfirmOpen,
  [UI.GETTER.CONFIRM_IS_LOADING]: state => state.confirmIsLoading,
  [UI.GETTER.GET_CONFIRM_MESSAGE]: state => state.confirmMessage
}

export const mutations = {
  [UI.MUTATION.SET_CONFIRM_IS_OPEN]: (state, value) => {
    state.isConfirmOpen = value
  },
  [UI.MUTATION.SET_CONFIRM_FUNCTION]: (state, func) => {
    state.confirmFunction = func
  },
  [UI.MUTATION.SET_CONFIRM_LOADING]: (state, value) => {
    state.confirmIsLoading = value
  },
  [UI.MUTATION.SET_CONFIRM_MESSAGE]: (state, value) => {
    state.confirmMessage = value
  }
}

export const actions = {
  async [UI.ACTION.CONFIRM]({ state, commit }) {
    try {
      commit(UI.MUTATION.SET_CONFIRM_LOADING, true)
      await state.confirmFunction()
      commit(UI.MUTATION.SET_CONFIRM_IS_OPEN, false)
    } catch (error) {
      throw error
    } finally {
      commit(UI.MUTATION.SET_CONFIRM_LOADING, false)
    }
  }
}
