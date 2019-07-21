<template>
  <Block class="position-history">
    <p class="title-history purple bold">Reward history</p>
    <TableBlock
      :current-page="currentPage"
      :dataset="transactions"
      :pages-count="pagesCount"
      :show-by="showBy"
      @show-by-changed="$emit('show-by-changed', $event)"
      @page-changed="$emit('page-changed', $event)"
    />
    <Spinner v-if="loading" light />
  </Block>
</template>

<script>
import Block from '@/components/ui/Block'
import TableBlock from '@/components/common/transaction-table/TableBlock'
import Spinner from '@/components/ui/Spinner'

export default {
  name: 'TransactionTable',
  components: { Block, TableBlock, Spinner },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pagesCount: {
      type: Number,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    showBy: {
      type: Number,
      default: 10
    },
    transactions: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.position-history {
  position: relative;
  min-height: 162px;
  margin: 30px auto;
  width: 100%;
  max-width: 860px;
}
.title-history {
  font-size: 16px;
  line-height: 0.88;
  margin-bottom: 29px;
}
.empty-text {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
}
</style>
