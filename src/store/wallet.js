import OverallIcon from '@/assets/sidebar/overall-icon.vue'
import { ARRAY_OF_COLORS } from '@/constants'
import { WALLET } from '@/store/types'

export const namespaced = false

export const state = () => ({
  wallets: [],
  isLoading: false
})

const groupWallets = wallets =>
  wallets.reduce((acc, wallet) => {
    if (!acc.find(item => item.currency.code === wallet.currency.code)) {
      acc.push(wallet)
    }
    return acc
  }, [])

const createCurrencyWalletTree = wallets => {
  const currencies = Array.from(new Set(wallets.map(wallet => wallet.currency.code)))

  return currencies.map(currency => {
    let counter = 1
    const currencyWallets = wallets.reduce((acc, wallet) => {
      if (wallet.currency.code === currency) {
        acc.push({
          ...wallet,
          title: `Wallet ${counter}`
        })
        counter++
      }

      return acc
    }, [])

    return {
      title: currencyWallets[0].currency.name,
      icon: currencyWallets[0].currency.icon,
      currency,
      wallets: currencyWallets
    }
  })
}

export const getters = {
  [WALLET.GETTER.LIST_FOR_SIDEBAR]: state => [
    {
      title: 'Overall',
      icon: OverallIcon,
      currency: 'overall',
      key: 'overall'
    },
    ...createCurrencyWalletTree(state.wallets)
  ],
  [WALLET.GETTER.GET_INITIALIZING]: state => state.wallets.filter(item => !item.initialized),
  [WALLET.GETTER.WALLETS_COUNT]: state => state.wallets.length,
  [WALLET.GETTER.TABLE_FOR_SETTINGS]: state =>
    state.wallets.map(currency => ({
      id: currency.pk,
      key: currency.pk,
      address: currency.address,
      currency: currency.currency.name,
      action: 'Delete'
    })),
  [WALLET.GETTER.GET_WALLETS]: state => state.wallets,
  [WALLET.GETTER.GET_WALLET_BY_CODE]: state => code =>
    groupWallets(state.wallets).find(wallet => wallet.currency.code === code),
  [WALLET.GETTER.GET_WALLET_BY_ID]: state => id => state.wallets.find(wallet => wallet.pk === id)
}

export const mutations = {
  [WALLET.MUTATION.SET_WALLET_LIST]: (state, payload) => {
    state.wallets = payload.map((wallet, index) => {
      return {
        ...wallet,
        color: wallet.color || ARRAY_OF_COLORS[index % ARRAY_OF_COLORS.length]
      }
    })
  },
  [WALLET.MUTATION.REMOVE_WALLET]: (state, pk) => {
    state.wallets = state.wallets.filter(wallet => wallet.pk !== pk)
  }
}

export const actions = {
  async [WALLET.ACTION.LOAD_WALLET_LIST]({ commit }) {
    try {
      const wallets = await this.$api.getWalletList()

      commit(WALLET.MUTATION.SET_WALLET_LIST, wallets.results)
    } catch (e) {
    } finally {
    }
  },
  async [WALLET.ACTION.REMOVE_WALLET]({ commit, dispatch }, id) {
    try {
      await this.$api.removeWallet(id)
      commit(WALLET.MUTATION.REMOVE_WALLET, id)
    } catch (e) {
    } finally {
    }
  }
}
