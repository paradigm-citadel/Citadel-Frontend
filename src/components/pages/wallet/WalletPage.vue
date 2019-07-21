<template>
  <div class="currency-page" :class="{ 'without-margin': !currentWallet.initialized || isDataEmpty }">
    <EmptyState v-if="!currentWallet.initialized" />
    <EmptyData v-else-if="isDataEmpty" />
    <Spinner v-else-if="isCurrencyLoading" without-overlay />
    <template v-else>
      <InformationAboutToken :info-token="currentWallet.currency" />
      <WalletLineChart :wallet="currentWallet" />
      <WalletTransactionsTable />
    </template>
  </div>
</template>

<script>
import EmptyData from '@/components/common/empty-wallets-data-placeholder/EmptyDataPlaceholder'
import InformationAboutToken from '@/components/common/information-about-token/InformationAboutToken'
import WalletLineChart from '@/components/pages/wallet/WalletLineChart'
import WalletTransactionsTable from '@/components/pages/wallet/WalletTransactionsTable'
import Spinner from '@/components/ui/Spinner'
import EmptyState from '../../common/no-wallets-placeholder/NoWalletsPlaceholder'
import { CURRENCY_WALLET, TRANSACTION, WALLET } from '@/store/types'

export default {
  name: 'WalletPage',
  components: {
    Spinner,
    InformationAboutToken,
    WalletTransactionsTable,
    WalletLineChart,
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
      return this.$store.getters[CURRENCY_WALLET.GETTER.IS_DATA_LOADING]
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
