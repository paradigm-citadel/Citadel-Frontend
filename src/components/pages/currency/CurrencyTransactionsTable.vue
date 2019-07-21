<template>
  <TransactionTable
    :current-page="tableOptions.page"
    :pages-count="tableOptions.maxPage"
    :loading="isLoading"
    :show-by="tableOptions.limit"
    :transactions="transactions"
    @page-changed="pageChanged"
    @show-by-changed="showByChanged"
  />
</template>

<script>
import TransactionTable from '@/components/common/transaction-table/TransactionTable'
import { CURRENCY_OVERALL, TRANSACTION } from '@/store/types'

export default {
  name: 'CurrencyTransactionsTable',
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
      this.$store.dispatch(CURRENCY_OVERALL.ACTION.LOAD_TRANSACTIONS_PAGE)
    },
    pageChanged(page) {
      this.$store.commit(TRANSACTION.MUTATION.SET_TABLE_PAGE, page)
      this.$store.dispatch(CURRENCY_OVERALL.ACTION.LOAD_TRANSACTIONS_PAGE)
    }
  }
}
</script>

<style scoped></style>
