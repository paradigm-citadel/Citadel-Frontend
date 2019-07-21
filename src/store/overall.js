import { TOPBAR, TRANSACTION, WALLET_OVERALL } from '@/store/types'

export const namespaced = false

export const state = () => ({
  isOverallLoading: false
})

export const getters = {
  [WALLET_OVERALL.GETTER.IS_OVERALL_LOADING]: state => state.isOverallLoading
}

export const mutations = {
  [WALLET_OVERALL.MUTATION.SET_IS_LOADING]: (state, value) => {
    state.isOverallLoading = value
  }
}

export const actions = {
  async [WALLET_OVERALL.ACTION.UPDATE_CHART_DATA]({ getters, commit }) {
    try {
      commit(TRANSACTION.MUTATION.SET_IS_CHART_LOADING, true)

      const chartOptions = getters[TRANSACTION.GETTER.GET_CHART_OPTIONS]
      const addBalance = getters[TOPBAR.GETTER.GET_TYPE] === 'balance'

      const chartRequest = this.$api.getChartData({
        add_balance: addBalance,
        chart_date_from: chartOptions.from.toISOString(),
        chart_date_to: chartOptions.to.toISOString()
      })

      const chartPreviewRequest = this.$api.getChartPreview({ add_balance: addBalance })

      const [chartResponse, chartPreviewResponse] = await Promise.all([chartRequest, chartPreviewRequest])

      commit(TRANSACTION.MUTATION.SET_CHART_DATA, chartResponse)
      commit(TRANSACTION.MUTATION.SET_PREVIEW_CHART_DATA, chartPreviewResponse)
    } catch (error) {
      console.log(error)
    } finally {
      commit(TRANSACTION.MUTATION.SET_IS_CHART_LOADING, false)
    }
  },
  async [WALLET_OVERALL.ACTION.LOAD_DATA]({ getters, commit }) {
    try {
      commit(WALLET_OVERALL.MUTATION.SET_IS_LOADING, true)

      const chartOptions = getters[TRANSACTION.GETTER.GET_CHART_OPTIONS]
      const addBalance = getters[TOPBAR.GETTER.GET_TYPE] === 'balance'
      const transactionTableOptions = getters[TRANSACTION.GETTER.GET_TABLE_OPTIONS]

      const chartRequest = this.$api.getChartData({
        add_balance: addBalance,
        chart_date_from: chartOptions.from.toISOString(),
        chart_date_to: chartOptions.to.toISOString()
      })

      const chartPreviewRequest = this.$api.getChartPreview({ add_balance: addBalance })

      const transactionsRequest = this.$api.getTransactionList({
        limit: transactionTableOptions.limit,
        offset: transactionTableOptions.limit * (transactionTableOptions.page - 1)
      })

      const [chartResponse, chartPreviewResponse, transactionsResponse] = await Promise.all([
        chartRequest,
        chartPreviewRequest,
        transactionsRequest
      ])

      commit(TRANSACTION.MUTATION.SET_CHART_DATA, chartResponse)
      commit(TRANSACTION.MUTATION.SET_PREVIEW_CHART_DATA, chartPreviewResponse)
      commit(TRANSACTION.MUTATION.SET_TRANSACTIONS, transactionsResponse)
    } catch (error) {
      console.log(error)
    } finally {
      commit(WALLET_OVERALL.MUTATION.SET_IS_LOADING, false)
    }
  },
  async [WALLET_OVERALL.ACTION.LOAD_TRANSACTIONS_PAGE]({ commit, getters }) {
    try {
      commit(TRANSACTION.MUTATION.SET_IS_TRANSACTIONS_LOADING, true)

      const transactionTableOptions = getters[TRANSACTION.GETTER.GET_TABLE_OPTIONS]

      const data = {
        offset: transactionTableOptions.limit * (transactionTableOptions.page - 1),
        limit: transactionTableOptions.limit
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
