import { CURRENCY_OVERALL, CURRENCY_WALLET, TOPBAR, WALLET_OVERALL } from '@/store/types'

export const namespaced = false

export const state = () => ({
  infoType: 'reward',
  typesList: [{ label: 'Total reward', value: 'reward' }, { label: 'Total balance', value: 'balance' }]
})

const typesListValidValues = state().typesList.map(item => item.value)

export const getters = {
  [TOPBAR.GETTER.GET_TYPE]: state => state.infoType,
  [TOPBAR.GETTER.GET_TYPE_LIST]: state => state.typesList,
  [TOPBAR.GETTER.GET_TYPE_LABEL]: state => state.typesList.find(item => item.value === state.infoType).label
}
export const mutations = {
  [TOPBAR.MUTATION.SET_TYPE]: (state, value) => {
    state.infoType = value
  }
}

export const actions = {
  [TOPBAR.ACTION.SET_TYPE_AND_RELOAD_DATA]({ dispatch, commit }, value) {
    if (!typesListValidValues.includes(value))
      return console.error(
        `${TOPBAR.MUTATION.SET_TYPE} invalid value, accessed values is: ${typesListValidValues.join(', ')}`
      )

    commit(TOPBAR.MUTATION.SET_TYPE, value)
    dispatch(CURRENCY_OVERALL.ACTION.LOAD_CHART_AND_TRANSACTIONS)
    dispatch(WALLET_OVERALL.ACTION.LOAD_DATA)
    dispatch(CURRENCY_WALLET.ACTION.LOAD_CHART_AND_TRANSACTIONS)
  }
}
