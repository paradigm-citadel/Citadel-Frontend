<template>
  <div class="chart-container">
    <LineChart
      :dataset="dataset"
      :preview-dataset="previewDataset"
      :chart-options="chartOptions"
      :title="wallet.currency.name"
      :top-bar-type="topBarType"
      :loading="loading"
      @currency-changed="changeCurrency($event)"
      @range-changed="changeRange($event)"
    />
  </div>
</template>

<script>
import LineChart from '@/components/common/line-chart/LineChart'
import { TRANSACTION, CURRENCY_WALLET } from '@/store/types'
import { mapGetters } from 'vuex'
import { TOPBAR } from '~/store/types'

export default {
  name: 'CurrencyLineChart',
  components: { LineChart },
  props: {
    wallet: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters({
      chartOptions: TRANSACTION.GETTER.GET_CHART_OPTIONS,
      dataset: TRANSACTION.GETTER.GET_CHART_DATA,
      previewDataset: TRANSACTION.GETTER.GET_PREVIEW_CHART_DATA,
      loading: TRANSACTION.GETTER.IS_CHART_LOADING
    }),
    topBarType() {
      return this.$store.getters[TOPBAR.GETTER.GET_TYPE]
    }
  },
  methods: {
    changeCurrency(currency) {
      this.$store.commit(TRANSACTION.MUTATION.SET_CHART_CURRENCY, currency)
    },
    changeRange(dates) {
      this.$store.commit(TRANSACTION.MUTATION.SET_CHART_DATES, dates)
      this.$store.dispatch(CURRENCY_WALLET.ACTION.UPDATE_CHART_DATA)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 860px;
  height: 582px;
  background: #fff;
  margin: 0 auto;
  margin-bottom: 50px;
}
</style>
