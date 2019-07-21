<template>
  <div class="chart-header">
    <div class="title">{{ title }}</div>
    <div class="controls currency">
      <div
        v-for="c in currencies"
        :key="c.code"
        :class="{ control: true, selected: currency === c.code }"
        @click="$emit('currency-changed', c.code)"
      >
        {{ c.text }}
      </div>
    </div>
    <div class="controls" />
  </div>
</template>

<script>
export default {
  props: {
    currentCurrency: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    currency: {
      type: String,
      default: ''
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    currencies: [
      {
        text: 'BTC',
        code: 'btc'
      },
      {
        text: 'Dollar ($)',
        code: 'usd'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  line-height: 0.88;
  color: #40356c;
}

.controls {
  display: flex;
}

.controls,
.title {
  flex-basis: 33%;
}

.currency {
  justify-content: center;
}

.control {
  font-family: Roboto;
  font-size: 13px;
  line-height: 1.08;
  color: #bdbdbd;
  cursor: pointer;
  margin-left: 20px;

  &.selected {
    color: #40356c;
    text-decoration: underline;
  }
}
</style>
