<template>
  <TransactionTable
    :current-page="tableOptions.page"
    :pages-count="tableOptions.maxPage"
    :loading="isLoading"
    :show-by="tableOptions.limit"
    :transactions="transactions"
    @show-by-changed="showByChanged"
    @page-changed="pageChanged"
  />
</template>

<script>
import TransactionTable from '@/components/common/transaction-table/TransactionTable'
import { TRANSACTION, WALLET_OVERALL } from '@/store/types'

export default {
  name: 'OverallTransactionTable',
  components: { TransactionTable },
  computed: {
    transactions() {
      return this.$store.getters[TRANSACTION.GETTER.GET_TRANSACTIONS_FOR_TABLE]
    },
    isLoading() {
      return this.$store.getters[TRANSACTION.GETTER.IS_TRANSACTIONS_LOADING]
    },
    tableOptions() {
      return this.$store.getters[TRANSACTION.GETTER.GET_TABLE_OPTIONS]
    }
  },
  methods: {
    showByChanged(value) {
      this.$store.commit(TRANSACTION.MUTATION.SET_TABLE_LIMIT, value)
      this.$store.dispatch(WALLET_OVERALL.ACTION.LOAD_TRANSACTIONS_PAGE)
    },
    pageChanged(page) {
      this.$store.commit(TRANSACTION.MUTATION.SET_TABLE_PAGE, page)
      this.$store.dispatch(WALLET_OVERALL.ACTION.LOAD_TRANSACTIONS_PAGE)
    }
  }
}
</script>
