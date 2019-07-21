import { POLLS, WALLET } from '@/store/types'
import dayjs from 'dayjs'

export const namespaced = false

let intervalId = null
const INTERVAL_UPDATE_IN_MILLISECONDS = 1000

export const state = () => ({
  polls: [],
  isLoading: true,
  currentTime: dayjs()
})

export const getters = {
  [POLLS.GETTER.GET_POLLS_FOR_LIST]: state =>
    state.polls.map(poll => {
      const sumOfVoting = poll.answers.map(answer => answer.vote_count).reduce((a, b) => a + b, 0)

      const endDayjs = dayjs(poll.end_datetime)

      return {
        id: poll.id,
        name: poll.name,
        icon: poll.icon,
        description: poll.title,
        end: endDayjs.add(-endDayjs.utcOffset(), 'minute'),
        answers: poll.answers.map(answer => ({
          id: answer.id,
          title: answer.title,
          percent: Number((answer.vote_count / sumOfVoting) * 100).toFixed(1)
        }))
      }
    }),
  [POLLS.GETTER.GET_IS_LOADING]: state => state.isLoading,
  [POLLS.GETTER.GET_CURRENT_TIME]: state => state.currentTime
}

export const mutations = {
  [POLLS.MUTATION.SET_POLLS]: (state, payload) => {
    state.polls = payload.filter(poll => dayjs(poll.end_datetime).diff(state.currentTime, 'ms') > 0)
  },
  [POLLS.MUTATION.SET_IS_LOADING]: (state, payload) => {
    state.isLoading = payload
  },
  [POLLS.MUTATION.UPDATE_CURRENT_TIME]: state => {
    state.currentTime = dayjs()

    // (end - current) > 0 === active
    const activePolls = state.polls.filter(poll => dayjs(poll.end_datetime).diff(state.currentTime, 'ms') > 0)

    if (activePolls.length !== state.polls.length) state.polls = activePolls

    if (activePolls.length === 0 && intervalId) clearInterval(intervalId)
  }
}

const addIconAndNameToPoll = (poll, wallets) => {
  const wallet = wallets.find(listItem => {
    return listItem.currency.net === poll.net
  })

  const walletData = wallet && {
    icon: wallet.currency.icon,
    name: wallet.currency.name
  }

  return {
    ...poll,
    ...walletData
  }
}

export const actions = {
  async [POLLS.ACTION.LOAD_POLLS]({ commit, getters }) {
    try {
      commit(POLLS.MUTATION.SET_IS_LOADING, true)

      const wallets = getters[WALLET.GETTER.GET_WALLETS]

      const responseCurrent = await this.$api.getPolls(null, true)

      // FIXME: удалить когда подправят бекенд
      const results = Array.isArray(responseCurrent) ? responseCurrent : responseCurrent.results

      commit(POLLS.MUTATION.SET_POLLS, results.map(poll => addIconAndNameToPoll(poll, wallets)))

      if (intervalId) clearInterval(intervalId)
      intervalId = setInterval(() => commit(POLLS.MUTATION.UPDATE_CURRENT_TIME), INTERVAL_UPDATE_IN_MILLISECONDS)
    } catch (e) {
      console.log(e)
    } finally {
      commit(POLLS.MUTATION.SET_IS_LOADING, false)
    }
  }
}
