<template>
  <div ref="parentBlock" :class="{ 'not-full': isFull }" class="info-stats">
    <div v-if="statistics.yielded !== 'undefined'" class="item-stats">
      <p class="title-stats">{{ statistics.yielded }}%</p>
      <p class="opacity">Yield</p>
    </div>
    <div v-if="statistics.market_cap !== 'undefined'" class="item-stats">
      <p class="title-stats">{{ statistics.market_cap }}m</p>
      <p class="opacity">Market cap</p>
    </div>
    <div v-if="statistics.circulating_supply !== 'undefined'" class="item-stats">
      <p class="title-stats">{{ statistics.circulating_supply }}%</p>
      <p class="opacity">Circulating Supply</p>
    </div>
    <div v-if="statistics.staking_rate !== 'undefined'" class="item-stats">
      <p class="title-stats">{{ statistics.staking_rate }}%</p>
      <p class="opacity">Staking rate</p>
    </div>
    <div v-if="statistics.unbonding_period !== 'undefined'" class="item-stats">
      <p class="title-stats">
        {{ statistics.unbonding_period }}
        {{ declOfNum(statistics.unbonding_period, ['Day', 'Days', 'Days']) }}
      </p>
      <p class="opacity">Unbonding Period</p>
    </div>
  </div>
</template>

<script>
import declOfNum from '@/helpers/numerals'
export default {
  name: 'BottomInfo',
  props: {
    statistics: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    declOfNum,
    isFull: false
  }),
  mounted() {
    this.isFull = this.$refs.parentBlock.children.length <= 4
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';

// блок со статистикой
.info-stats {
  display: flex;
  align-items: center;
}
.item-stats {
  display: flex;
  flex-direction: column;
  &:not(:first-child) {
    margin-left: auto;
  }
}

.not-full {
  @include between-children {
    &:not(:first-child) {
      margin-left: 80px;
    }
  }
}

.title-stats {
  font-size: 16px;
  font-weight: bold;
  line-height: 0.88;
  color: #40356c;
  margin-bottom: 5px;
}
//
.opacity {
  font-size: 12px;
  font-weight: 300;
  line-height: 1.08;
  color: #656565;
}
</style>
