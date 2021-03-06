import { CURRENCY_WALLET, TOPBAR, TRANSACTION } from '@/store/types'

export const namespaced = false

export const state = () => ({
  currentWalletId: -1,
  isDataLoading: false
})

export const getters = {
  [CURRENCY_WALLET.GETTER.GET_CURRENT_WALLET_ID]: state => state.currentWalletId,
  [CURRENCY_WALLET.GETTER.IS_DATA_LOADING]: state => state.isDataLoading
}

export const mutations = {
  [CURRENCY_WALLET.MUTATION.SET_CURRENT_WALLET_ID]: (state, code) => {
    state.currentWalletId = code
  },
  [CURRENCY_WALLET.MUTATION.SET_IS_DATA_LOADING]: (state, value) => {
    state.isDataLoading = value
  }
}

export const actions = {
  async [CURRENCY_WALLET.ACTION.UPDATE_CHART_DATA]({ commit, getters }) {
    try {
      commit(TRANSACTION.MUTATION.SET_IS_CHART_LOADING, true)

      const chartOptions = getters[TRANSACTION.GETTER.GET_CHART_OPTIONS]
      const walletId = getters[CURRENCY_WALLET.GETTER.GET_CURRENT_WALLET_ID]
      const addBalance = getters[TOPBAR.GETTER.GET_TYPE] === 'balance'

      const chartData = {
        wallet: walletId,
        chart_date_from: chartOptions.from.toISOString(),
        chart_date_to: chartOptions.to.toISOString(),
        add_balance: addBalance
      }

      const responseChart = await this.$api.getChartData(chartData)

      commit(TRANSACTION.MUTATION.SET_CHART_DATA, responseChart)
    } catch (e) {
      console.error(e)
    } finally {
      commit(TRANSACTION.MUTATION.SET_IS_CHART_LOADING, false)
    }
  },
  async [CURRENCY_WALLET.ACTION.LOAD_CHART_AND_TRANSACTIONS]({ commit, getters }) {
    try {
      commit(CURRENCY_WALLET.MUTATION.SET_IS_DATA_LOADING, true)

      const chartOptions = getters[TRANSACTION.GETTER.GET_CHART_OPTIONS]
      const walletId = getters[CURRENCY_WALLET.GETTER.GET_CURRENT_WALLET_ID]
      const addBalance = getters[TOPBAR.GETTER.GET_TYPE] === 'balance'
      const transactionTableOptions = getters[TRANSACTION.GETTER.GET_TABLE_OPTIONS]

      const chartData = {
        wallet: walletId,
        chart_date_from: chartOptions.from.toISOString(),
        chart_date_to: chartOptions.to.toISOString(),
        add_balance: addBalance
      }

      const [responseChart, responseTransactions, previewResponse] = await Promise.all([
        this.$api.getChartData(chartData),
        this.$api.getTransactionList({
          offset: transactionTableOptions.limit * (transactionTableOptions.page - 1),
          limit: transactionTableOptions.limit,
          wallet: walletId
        }),
        this.$api.getChartPreview({
          wallet: walletId,
          add_balance: addBalance
        })
      ])

      commit(TRANSACTION.MUTATION.SET_PREVIEW_CHART_DATA, previewResponse)
      commit(TRANSACTION.MUTATION.SET_CHART_DATA, responseChart)
      commit(TRANSACTION.MUTATION.SET_TRANSACTIONS, responseTransactions)
    } catch (e) {
      console.error(e)
    } finally {
      commit(CURRENCY_WALLET.MUTATION.SET_IS_DATA_LOADING, false)
    }
  },
  async [CURRENCY_WALLET.ACTION.LOAD_TRANSACTIONS_PAGE]({ commit, getters }) {
    try {
      commit(TRANSACTION.MUTATION.SET_IS_TRANSACTIONS_LOADING, true)

      const walletId = getters[CURRENCY_WALLET.GETTER.GET_CURRENT_WALLET_ID]
      const transactionTableOptions = getters[TRANSACTION.GETTER.GET_TABLE_OPTIONS]

      const data = {
        offset: transactionTableOptions.limit * (transactionTableOptions.page - 1),
        limit: transactionTableOptions.limit,
        wallet: walletId
      }

      const response = await this.$api.getTransactionList(data)
      commit(TRANSACTION.MUTATION.SET_TRANSACTIONS, response)
    } catch (e) {
      console.error(e)
    } finally {
      commit(TRANSACTION.MUTATION.SET_IS_TRANSACTIONS_LOADING, false)
    }
  }
}
