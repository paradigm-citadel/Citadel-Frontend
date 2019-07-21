import { REWARD, WALLET } from '@/store/types'

export const namespaced = false

export const state = () => ({
  reward: {},
  balance: {},
  isLoading: false,
  currency: 'usd',
  sortField: '',
  sortOrder: ''
})

const comparator = ({ field, order }) => (a, b) => {
  if (!field && !order) return 0

  const orderMap = {
    ASC: {
      '-1': -1,
      '0': 0,
      '1': 1
    },
    DESC: {
      '-1': 1,
      '0': 0,
      '1': -1
    }
  }

  const aField = a[field]
  const bField = b[field]

  if (aField > bField) return orderMap[order][-1]
  if (aField < bField) return orderMap[order][1]
  if (aField === bField) return orderMap[order][0]
}

const numberFormatterByCurrency = (number, currency) => {
  const numberMap = {
    btc: 8,
    usd: 2
  }

  return Number(number).toFixed(numberMap[currency] || 8)
}

export const getters = {
  [REWARD.GETTER.GET_REWARDS_AND_BALANCE_WITH_CURRENCIES]: state =>
    Object.keys(state.reward).map(key => {
      const reward = state.reward[key]
      const balance = state.balance[key]
      return {
        code: key,
        reward: (reward && reward.sum_volume) || 0,
        rewardCurrency: (reward && reward[`sum_volume_${state.currency}`]) || 0,
        balance: (balance && balance.sum_volume) || 0,
        balanceCurrency: (balance && balance[`sum_volume_${state.currency}`]) || 0
      }
    }),
  [REWARD.GETTER.GET_REWARD_FOR_TABLE]: (state, getters) =>
    getters[REWARD.GETTER.GET_REWARDS_AND_BALANCE_WITH_CURRENCIES]
      .map(item => {
        const wallet = getters[WALLET.GETTER.GET_WALLETS].find(wallet => wallet.currency.code === item.code)
        return {
          name: wallet.currency.name,
          key: wallet.currency.name,
          icon: wallet.currency.icon,
          ...item,
          rewardCurrency: numberFormatterByCurrency(item.rewardCurrency, state.currency),
          balanceCurrency: numberFormatterByCurrency(item.rewardCurrency, state.currency)
        }
      })
      .sort(comparator(getters[REWARD.GETTER.GET_SORT_SETTINGS])),
  [REWARD.GETTER.GET_TOTAL_REWARDS]: (state, getters) => {
    const total = getters[REWARD.GETTER.GET_REWARDS_AND_BALANCE_WITH_CURRENCIES].reduce(
      (acc, next) => {
        acc.balance += next.balanceCurrency
        acc.reward += next.rewardCurrency

        return acc
      },
      {
        balance: 0,
        reward: 0
      }
    )
    return {
      balance: numberFormatterByCurrency(total.balance, state.currency),
      reward: numberFormatterByCurrency(total.reward, state.currency)
    }
  },
  [REWARD.GETTER.IS_LOADING]: state => state.isLoading,
  [REWARD.GETTER.GET_CURRENCY]: state => state.currency,
  [REWARD.GETTER.GET_SORT_SETTINGS]: state => ({
    field: state.sortField,
    order: state.sortOrder
  })
}

export const mutations = {
  [REWARD.MUTATION.SET_REWARDS]: (state, payload) => {
    state.reward = payload
  },
  [REWARD.MUTATION.SET_BALANCE]: (state, payload) => {
    state.balance = payload
  },
  [REWARD.MUTATION.SET_IS_LOADING]: (state, value) => {
    state.isLoading = value
  },
  [REWARD.MUTATION.SET_CURRENCY]: (state, value) => {
    state.currency = value
  },
  [REWARD.MUTATION.SET_SORT_SETTINGS]: (state, settings) => {
    if (state.sortField === settings.field && state.sortOrder === settings.order) {
      state.sortField = ''
      state.sortOrder = ''
    } else {
      state.sortField = settings.field
      state.sortOrder = settings.order
    }
  }
}

export const actions = {
  async [REWARD.ACTION.LOAD_REWARDS]({ commit }) {
    try {
      commit(REWARD.MUTATION.SET_IS_LOADING, true)

      const [responseBalance, responseReward] = await Promise.all([
        this.$api.getReward({ add_balance: true }),
        this.$api.getReward({ add_balance: false })
      ])

      commit(REWARD.MUTATION.SET_REWARDS, responseReward.reward)
      commit(REWARD.MUTATION.SET_BALANCE, responseBalance.reward)
    } catch (e) {
      console.error(e)
    } finally {
      commit(REWARD.MUTATION.SET_IS_LOADING, false)
    }
  }
}
