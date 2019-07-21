<template>
  <div class="overall-page" :class="{ 'without-margin': isDataEmpty }">
    <NoWalletsPlaceholder v-if="walletsCount === 0" />
    <EmptyDataPlaceholder v-else-if="isDataEmpty" />
    <Spinner v-else-if="isPrimaryDataLoading" without-overlay />
    <template v-else>
      <OverallStatsTable />
      <OverallLineChart />
      <OverallTransactionTable />
    </template>
  </div>
</template>

<script>
import EmptyDataPlaceholder from '@/components/common/empty-wallets-data-placeholder/EmptyDataPlaceholder'
import OverallLineChart from '@/components/pages/overall/OverallLineChart'
import OverallStatsTable from '@/components/pages/overall/OverallStatsTable'
import OverallTransactionTable from '@/components/pages/overall/OverallTransactionTable'
import NoWalletsPlaceholder from '@/components/common/no-wallets-placeholder/NoWalletsPlaceholder'
import Spinner from '@/components/ui/Spinner'

import { TRANSACTION, WALLET, WALLET_OVERALL } from '@/store/types'

export default {
  name: 'OverallPage',
  components: {
    Spinner,
    OverallLineChart,
    OverallStatsTable,
    OverallTransactionTable,
    EmptyDataPlaceholder,
    NoWalletsPlaceholder
  },
  computed: {
    isPrimaryDataLoading() {
      return this.$store.getters[WALLET_OVERALL.GETTER.IS_OVERALL_LOADING]
    },
    transactions() {
      return this.$store.getters[TRANSACTION.GETTER.GET_TRANSACTIONS_FOR_TABLE]
    },
    isDataEmpty() {
      return this.transactions.length === 0 && !this.isPrimaryDataLoading
    },
    walletsCount() {
      return this.$store.getters[WALLET.GETTER.WALLETS_COUNT]
    }
  }
}
</script>

<style scoped lang="scss">
.overall-page {
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
