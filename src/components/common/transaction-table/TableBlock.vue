<template>
  <div class="table">
    <TransactionController
      :current-page="currentPage"
      :pages-count="pagesCount"
      :show-by="showBy"
      @show-by-changed="changedPicker"
      @page-changed="onPageChanged"
    />
    <TableLayout :dataset="dataset" />
    <TransactionController
      :current-page="currentPage"
      :pages-count="pagesCount"
      :show-by="showBy"
      @show-by-changed="changedPicker"
      @page-changed="onPageChanged"
    />
  </div>
</template>

<script>
import TableLayout from '@/components/common/transaction-table/TableLayout'
import TransactionController from '@/components/common/transaction-table/TransactionController'

export default {
  name: 'TableBlock',
  components: { TableLayout, TransactionController },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pagesCount: {
      type: Number,
      required: true
    },
    showBy: {
      type: Number,
      required: true
    },
    dataset: {
      type: Array,
      required: true
    }
  },
  methods: {
    onPageChanged(page) {
      this.$emit('page-changed', page)
    },
    changedPicker(e) {
      this.$emit('show-by-changed', e)
    }
  }
  // mounted() {
  //   console.log(this.dataset)
  // }
}
</script>

<style scoped lang="scss">
@import '~/assets/styles/entry.scss';
.table {
  display: flex;
  flex-direction: column;
}
</style>
