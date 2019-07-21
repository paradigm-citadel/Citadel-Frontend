<template>
  <CurrencyPage :currency="$route.params.currencyCode" />
</template>

<script>
import CurrencyPage from '@/components/pages/currency/CurrencyPage'
import { CURRENCY_OVERALL, TRANSACTION, WALLET } from '@/store/types'

export default {
  name: 'CurrencyEntry',
  components: { CurrencyPage },
  mounted() {
    const currentWallet = this.$store.getters[WALLET.GETTER.GET_WALLET_BY_CODE](this.$route.params.currencyCode)
    this.$store.commit(TRANSACTION.MUTATION.SET_CHART_DATES, {
      from: currentWallet.chart_date_from,
      to: currentWallet.chart_date_to
    })
    this.$store.commit(CURRENCY_OVERALL.MUTATION.SET_CURRENT_CURRENCY_CODE, this.$route.params.currencyCode)
    this.$store.dispatch(CURRENCY_OVERALL.ACTION.LOAD_CHART_AND_TRANSACTIONS)
  }
}
</script>
