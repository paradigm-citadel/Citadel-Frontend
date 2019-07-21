<template>
  <WalletPage :currency="$route.params.currencyCode" />
</template>

<script>
import WalletPage from '@/components/pages/wallet/WalletPage'
import { CURRENCY_WALLET, TRANSACTION, WALLET } from '@/store/types'

export default {
  name: 'CurrencyEntry',
  components: { WalletPage },
  mounted() {
    const walletId = Number(this.$route.params.walletId)
    const currentWallet = this.$store.getters[WALLET.GETTER.GET_WALLET_BY_ID](walletId)

    this.$store.commit(TRANSACTION.MUTATION.SET_CHART_DATES, {
      from: currentWallet.chart_date_from,
      to: currentWallet.chart_date_to
    })
    this.$store.commit(CURRENCY_WALLET.MUTATION.SET_CURRENT_WALLET_ID, walletId)
    this.$store.dispatch(CURRENCY_WALLET.ACTION.LOAD_CHART_AND_TRANSACTIONS)
  }
}
</script>
