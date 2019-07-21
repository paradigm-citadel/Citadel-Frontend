<template>
  <div class="currency-page" :class="{ 'without-margin': !currentWallet.initialized || isDataEmpty }">
    <EmptyState v-if="!currentWallet.initialized" />
    <EmptyData v-else-if="isDataEmpty" />
    <Spinner v-else-if="isCurrencyLoading" without-overlay />
    <template v-else>
      <InformationAboutToken :info-token="currentWallet.currency" />
      <CurrencyLineChart :wallet="currentWallet" />
      <CurrencyTransactionsTable />
    </template>
  </div>
</template>

<script>
import EmptyData from '@/components/common/empty-wallets-data-placeholder/EmptyDataPlaceholder'
import InformationAboutToken from '@/components/common/information-about-token/InformationAboutToken'
import CurrencyLineChart from '@/components/pages/currency/CurrencyLineChart'
import CurrencyTransactionsTable from '@/components/pages/currency/CurrencyTransactionsTable'
import Spinner from '@/components/ui/Spinner'
import { CURRENCY_OVERALL, TRANSACTION, WALLET } from '@/store/types'
import EmptyState from '../../common/no-wallets-placeholder/NoWalletsPlaceholder'

export default {
  name: 'CurrencyPage',
  components: {
    Spinner,
    InformationAboutToken,
    CurrencyTransactionsTable,
    CurrencyLineChart,
    EmptyData,
    EmptyState
  },
  props: {
    currency: {
      type: String,
      required: true
    }
  },
  computed: {
    isCurrencyLoading() {
      return this.$store.getters[CURRENCY_OVERALL.GETTER.IS_DATA_LOADING]
    },
    isDataEmpty() {
      return this.transactions.length === 0 && !this.isCurrencyLoading
    },
    transactions() {
      return this.$store.getters[TRANSACTION.GETTER.GET_TRANSACTIONS_FOR_TABLE]
    },
    currentWallet() {
      return this.$store.getters[WALLET.GETTER.GET_WALLET_BY_CODE](this.currency)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';

.currency-page {
  display: flex;
  flex-direction: column;
  margin: 150px auto 0;
  width: 100%;
  height: auto;
  min-height: calc(100vh - 313px);
  position: relative;

  &.without-margin {
    margin: 100px auto;
  }
}
</style>
