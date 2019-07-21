import { CURRENCY_OVERALL, TOPBAR, TRANSACTION } from '@/store/types'

export const namespaced = false

export const state = () => ({
  currencyCode: '',
  isCurrencyDataLoading: false
})

export const getters = {
  [CURRENCY_OVERALL.GETTER.GET_CURRENT_CURRENCY_CODE]: state => state.currencyCode,
  [CURRENCY_OVERALL.GETTER.IS_DATA_LOADING]: state => state.isCurrencyDataLoading
}

export const mutations = {
  [CURRENCY_OVERALL.MUTATION.SET_CURRENT_CURRENCY_CODE]: (state, code) => {
    state.currencyCode = code
  },
  [CURRENCY_OVERALL.MUTATION.SET_IS_DATA_LOADING]: (state, value) => {
    state.isCurrencyDataLoading = value
  }
}

export const actions = {
  async [CURRENCY_OVERALL.ACTION.UPDATE_CHART_DATA]({ commit, getters }) {
    try {
      commit(TRANSACTION.MUTATION.SET_IS_CHART_LOADING, true)

      const chartOptions = getters[TRANSACTION.GETTER.GET_CHART_OPTIONS]
      const currencyCode = getters[CURRENCY_OVERALL.GETTER.GET_CURRENT_CURRENCY_CODE]
      const addBalance = getters[TOPBAR.GETTER.GET_TYPE] === 'balance'

      const chartData = {
        currency: currencyCode,
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
  async [CURRENCY_OVERALL.ACTION.LOAD_CHART_AND_TRANSACTIONS]({ commit, getters }) {
    try {
      commit(CURRENCY_OVERALL.MUTATION.SET_IS_DATA_LOADING, true)

      const chartOptions = getters[TRANSACTION.GETTER.GET_CHART_OPTIONS]
      const currencyCode = getters[CURRENCY_OVERALL.GETTER.GET_CURRENT_CURRENCY_CODE]
      const addBalance = getters[TOPBAR.GETTER.GET_TYPE] === 'balance'
      const transactionTableOptions = getters[TRANSACTION.GETTER.GET_TABLE_OPTIONS]

      const chartData = {
        currency: currencyCode,
        chart_date_from: chartOptions.from.toISOString(),
        chart_date_to: chartOptions.to.toISOString(),
        add_balance: addBalance
      }

      const [responseChart, responseTransactions, previewResponse] = await Promise.all([
        this.$api.getChartData(chartData),
        this.$api.getTransactionList({
          offset: transactionTableOptions.limit * (transactionTableOptions.page - 1),
          limit: transactionTableOptions.limit,
          wallet__currency__code: currencyCode
        }),
        this.$api.getChartPreview({
          currency: currencyCode,
          add_balance: addBalance
        })
      ])

      commit(TRANSACTION.MUTATION.SET_PREVIEW_CHART_DATA, previewResponse)
      commit(TRANSACTION.MUTATION.SET_CHART_DATA, responseChart)
      commit(TRANSACTION.MUTATION.SET_TRANSACTIONS, responseTransactions)
    } catch (e) {
      console.error(e)
    } finally {
      commit(CURRENCY_OVERALL.MUTATION.SET_IS_DATA_LOADING, false)
    }
  },
  async [CURRENCY_OVERALL.ACTION.LOAD_TRANSACTIONS_PAGE]({ commit, getters }) {
    try {
      commit(TRANSACTION.MUTATION.SET_IS_TRANSACTIONS_LOADING, true)

      const currencyCode = getters[CURRENCY_OVERALL.GETTER.GET_CURRENT_CURRENCY_CODE]
      const transactionTableOptions = getters[TRANSACTION.GETTER.GET_TABLE_OPTIONS]

      const data = {
        offset: transactionTableOptions.limit * (transactionTableOptions.page - 1),
        limit: transactionTableOptions.limit,
        wallet__currency__code: currencyCode
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
