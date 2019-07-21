<template>
  <Block class="stats-table">
    <div class="table-header">
      <h3>Overall</h3>
      <div class="currency-controller">
        <div
          v-for="curr in currencies"
          :key="curr.code"
          class="currency-item"
          :class="{ selected: curr.code === currentCurrency }"
          @click="changeCurrency(curr.code)"
        >
          {{ curr.title }}
        </div>
      </div>
      <div />
    </div>
    <RewardTable
      :dataset="rewards"
      :total="totalRewards"
      :currency-symbol="currencySymbol"
      :sort-settings="sortSettings"
      @change-sort-settings="changeSort"
    />
    <Spinner v-if="isRewardsLoading" light />
  </Block>
</template>

<script>
import RewardTable from '@/components/pages/overall/reward-table/RewardTable'
import Block from '@/components/ui/Block'
import { REWARD } from '@/store/types'

export default {
  name: 'Stats',
  components: { RewardTable, Block },
  data: () => ({
    currencies: [{ title: 'BTC', code: 'btc', symbol: 'Ƀ' }, { title: 'USD ($)', code: 'usd', symbol: '$' }]
  }),
  computed: {
    isRewardsLoading() {
      return this.$store.getters[REWARD.GETTER.IS_LOADING]
    },
    rewards() {
      return this.$store.getters[REWARD.GETTER.GET_REWARD_FOR_TABLE]
    },
    totalRewards() {
      return this.$store.getters[REWARD.GETTER.GET_TOTAL_REWARDS]
    },
    currentCurrency() {
      return this.$store.getters[REWARD.GETTER.GET_CURRENCY]
    },
    currencySymbol() {
      return this.currencies.find(curr => curr.code === this.currentCurrency).symbol
    },
    sortSettings() {
      return this.$store.getters[REWARD.GETTER.GET_SORT_SETTINGS]
    }
  },
  methods: {
    changeCurrency(currency) {
      this.$store.commit(REWARD.MUTATION.SET_CURRENCY, currency)
    },
    changeSort(settings) {
      this.$store.commit(REWARD.MUTATION.SET_SORT_SETTINGS, settings)
    }
  }
}
</script>

<style scoped lang="scss">
.stats-table {
  width: 860px;
  margin: 0 auto 30px;
  position: relative;
}

.table-header {
  display: flex;
  justify-content: space-between;
}

.currency-controller {
  display: flex;
  margin-bottom: 30px;
}

.currency-item {
  font-size: 13px;
  line-height: 1.08;
  color: #bdbdbd;
  margin-left: 20px;
  cursor: pointer;
  user-select: none;

  &:first-of-type {
    margin-left: 0;
  }

  &.selected {
    color: #40356c;
    border-bottom: 1px solid #40356c;
  }
}

h3 {
  font-size: 16px;
  font-weight: bold;
  line-height: 0.88;
  color: #40356c;
}
</style>
