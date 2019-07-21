import { TRANSACTION } from '@/store/types'
import dayjs from 'dayjs'
import numeral from 'numeral'

export const namespaced = false

export const state = () => ({
  transactions: [],
  chartData: [],
  previewChartData: [],

  chartOptions: {
    from: dayjs(0),
    to: dayjs(),
    currency: 'usd', // 'usd', 'btc' ...
    scale: 'all'
  },

  tableOptions: {
    limit: 10,
    page: 1,
    maxPage: 6
  },

  isTransactionsLoading: false,
  isChartLoading: false
})

export const getters = {
  [TRANSACTION.GETTER.GET_TRANSACTIONS_FOR_TABLE]: state =>
    state.transactions.map(trans => ({
      id: trans.pk,
      key: trans.pk,
      datetime: dayjs(trans.committed).format('DD.MM.YYYY (HH:mm)'),
      token: trans.currency,
      quantity: trans.volume.toFixed(8),
      btc: trans.volume_btc.toFixed(8),
      dollar: numeral(trans.volume_usd).format('0,0.00'),
      comment: trans.comment,
      status: trans.mission === 'approved_payment' ? 'approved' : 'pending'
    })),
  [TRANSACTION.GETTER.GET_CHART_OPTIONS]: state => state.chartOptions,
  [TRANSACTION.GETTER.GET_TABLE_OPTIONS]: state => state.tableOptions,
  [TRANSACTION.GETTER.GET_CHART_DATA]: state => {
    if (!state.chartData) return []

    return state.chartData.map(item => [new Date(item.datetimefield).getTime(), item[state.chartOptions.currency]])
  },
  [TRANSACTION.GETTER.GET_PREVIEW_CHART_DATA]: state => {
    if (!state.previewChartData) return []

    return state.previewChartData.map(item => [
      new Date(item.datetimefield).getTime(),
      item[state.chartOptions.currency]
    ])
  },
  [TRANSACTION.GETTER.IS_TRANSACTIONS_LOADING]: state => state.isTransactionsLoading,
  [TRANSACTION.GETTER.IS_CHART_LOADING]: state => state.isChartLoading
}

export const mutations = {
  [TRANSACTION.MUTATION.SET_TRANSACTIONS]: (state, transactionsResponse) => {
    state.transactions = transactionsResponse.results
    state.tableOptions.maxPage = Math.ceil(transactionsResponse.count / state.tableOptions.limit)
  },
  [TRANSACTION.MUTATION.SET_CHART_DATA]: (state, chartData) => {
    state.chartData = chartData
  },
  [TRANSACTION.MUTATION.SET_PREVIEW_CHART_DATA]: (state, previewChartData) => {
    state.previewChartData = previewChartData
  },
  [TRANSACTION.MUTATION.SET_CHART_CURRENCY]: (state, currency) => (state.chartOptions.currency = currency),

  /* TABLE_OPTIONS */
  [TRANSACTION.MUTATION.SET_CHART_DATES]: (state, dates) => {
    if (dates.from) state.chartOptions.from = dayjs(dates.from)
    if (dates.to) state.chartOptions.to = dayjs(dates.to)
  },
  [TRANSACTION.MUTATION.SET_TABLE_PAGE]: (state, page) => {
    state.tableOptions.page = page
  },
  [TRANSACTION.MUTATION.SET_TABLE_LIMIT]: (state, limit) => {
    state.tableOptions.limit = limit
  },
  /* TABLE_OPTIONS */

  [TRANSACTION.MUTATION.SET_IS_TRANSACTIONS_LOADING]: (state, value) => {
    state.isTransactionsLoading = value
  },
  [TRANSACTION.MUTATION.SET_IS_CHART_LOADING]: (state, value) => {
    state.isChartLoading = value
  }
}

export const actions = {}
