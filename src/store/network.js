import { NETWORK } from '@/store/types'

export const namespaced = false

export const state = () => ({
  networks: [],
  isLoading: false
})

export const getters = {
  [NETWORK.GETTER.LIST_FOR_ADD_MODAL]: state =>
    state.networks.map(item => ({
      label: `${item.name} (${item.code})`,
      key: item.pk
    }))
}

export const mutations = {
  [NETWORK.MUTATION.SET_IS_LOADING]: (state, value) => {
    state.isLoading = value
  },
  [NETWORK.MUTATION.SET_NETWORK_LIST]: (state, list) => {
    state.networks = list
  }
}

export const actions = {
  async [NETWORK.ACTION.LOAD_NETWORKS]({ commit }) {
    try {
      commit(NETWORK.MUTATION.SET_IS_LOADING, true)

      const response = await this.$api.getNetworksList()
      commit(NETWORK.MUTATION.SET_NETWORK_LIST, response.results)
    } catch (error) {
      console.error(error)
    } finally {
      commit(NETWORK.MUTATION.SET_IS_LOADING, false)
    }
  }
}
