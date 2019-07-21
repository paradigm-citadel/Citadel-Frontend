import { PROFILE } from '@/store/types'

export const namespaced = false

export const state = () => ({
  user: {
    firstName: '',
    lastName: '',
    email: ''
  },
  chartDateFrom: null,
  chartDateTo: null
})

export const getters = {
  [PROFILE.GETTER.USER]: state => state.user
}

export const mutations = {
  [PROFILE.MUTATION.SET_PROFILE_DATA]: (state, payload) => {
    state.user.firstName = payload.user.first_name
    state.user.lastName = payload.user.last_name
    state.user.email = payload.user.email
    state.chartDateFrom = payload.chart_date_from
    state.chartDateTo = payload.chart_date_to
  }
}

export const actions = {
  async [PROFILE.ACTION.LOAD_PROFILE_DATA]({ commit }) {
    try {
      const responseData = await this.$api.getAccountInfo()

      commit(PROFILE.MUTATION.SET_PROFILE_DATA, responseData)
    } catch (e) {
      throw e // Это нужно для проверки авторизации, не удалять
    } finally {
    }
  },
  async [PROFILE.ACTION.CHANGE_PASSWORD]({ state }, payload) {
    try {
      await this.$api.changePassword(payload)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async [PROFILE.ACTION.CHANGE_PROFILE_DATA]({ commit }, payload) {
    try {
      const responseData = await this.$api.changeAccountInfo(payload)
      commit(PROFILE.MUTATION.SET_PROFILE_DATA, responseData)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async [PROFILE.ACTION.DELETE_PROFILE]() {
    try {
      await this.$api.deleteAccount()
    } catch (e) {
      console.log(e)
    }
  }
}
