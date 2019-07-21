<template>
  <div class="line-chart">
    <ChartHeader
      :title="title"
      :currency="chartOptions.currency"
      :chart-options="chartOptions"
      @currency-changed="$emit('currency-changed', $event)"
    />
    <RangePicker :range-code="rangeCode" @range-changed="pickRange($event)" />
    <Chart v-if="previewDataset" :constructor-type="'stockChart'" :options="options" :highcharts="hcInstance" />
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import dayjs from 'dayjs'
import ChartHeader from './ChartHeader'
import RangePicker from './RangePicker'

Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: 'Roboto'
    }
  }
})

stockInit(Highcharts)

export default {
  name: 'LineChart',
  components: {
    Chart,
    ChartHeader,
    RangePicker
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    dataset: {
      type: Array,
      default: () => []
    },
    previewDataset: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    },
    topBarType: {
      type: String,
      default: 'reward'
    }
  },
  data: () => ({
    hcInstance: Highcharts,
    rangeCode: '',
    timeoutSeconds: 500,
    timeout: null,
    currencySymbols: {
      btc: 'BTC',
      usd: '$'
    }
  }),
  computed: {
    minMax() {
      const min = 0
      let max = 0
      this.dataset.forEach(item => {
        if (item[1] > max) {
          max = item[1]
        }
      })
      max === 0 && (max = 1)
      max = max + max / 3
      return { min, max }
    },
    diagramType() {
      return {
        reward: 'column',
        balance: 'areaspline'
      }[this.topBarType]
    },
    options() {
      return {
        chart: {
          animation: false,
          height: 582,
          events: {
            load: this.updateExtremes
          }
        },
        yAxis: {
          ...this.minMax,
          startOnTick: false,
          endOnTick: false
        },
        tooltip: {
          formatter: (function(that) {
            const currentSymbol = that.currencySymbols[that.chartOptions.currency]
            return function() {
              let Header = ''
              if (that.topBarType === 'reward') {
                const startDate = dayjs(this.x).format('DD.MM.YYYY')
                let endDate = dayjs(this.x)
                  .add(that.getInterval(), 'milisecond')
                  .valueOf()

                if (+new Date() < endDate) {
                  endDate = +new Date()
                }
                endDate = dayjs(endDate).format('DD.MM.YYYY')

                Header = `<div>${startDate} - ${endDate}</div>`
              } else {
                Header = `<div>${dayjs(this.x).format('DD.MM.YYYY')}</div>`
              }
              return [
                // HEADER
                Header,
                // POINT
                `
                <span style="color:{point.color}">
                  <b>
                    ${this.y} ${currentSymbol}
                  </b>
                </span>
              `
              ]
            }
          })(this),
          split: true
        },
        xAxis: {
          events: {
            afterSetExtremes: this.afterSetExtremesHandler
          },
          minRange: 1000 * 3600 * 24 * 7
        },
        navigator: {
          adaptToUpdatedData: false,
          series: {
            data: this.previewDataset
          }
        },
        rangeSelector: {
          inputEnabled: false
        },
        scrollbar: {
          height: 0,
          liveRedraw: false
        },
        series: [
          {
            // name: 'AAPL Stock Price',
            data: this.dataset,
            type: this.diagramType,
            threshold: null,
            tooltip: {
              valueDecimals: 2
            },
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [
                  1,
                  Highcharts.Color(Highcharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get('rgba')
                ]
              ]
            }
          }
        ]
      }
    },
    timeRanges() {
      const preview = this.previewDataset
      return {
        all: {
          from: dayjs(preview[0][0]),
          to: dayjs(preview[preview.length - 1][0])
        },
        week: {
          from: dayjs(this.chartOptions.to).subtract(7, 'day'),
          to: dayjs(this.chartOptions.to)
        },
        month: {
          from: dayjs(this.chartOptions.to).subtract(1, 'month'),
          to: dayjs(this.chartOptions.to)
        },
        threeMonths: {
          from: dayjs(this.chartOptions.to).subtract(3, 'month'),
          to: dayjs(this.chartOptions.to)
        },
        year: {
          from: dayjs(this.chartOptions.to).subtract(1, 'year'),
          to: dayjs(this.chartOptions.to)
        }
      }
    },
    chart() {
      return this.hcInstance.charts.find(chart => !!chart && chart.options.isStock)
    }
  },
  watch: {
    loading(v) {
      return v ? this.chart.showLoading() : this.chart.hideLoading()
    },
    chartOptions: {
      deep: true,
      immediate: true,
      handler(v) {
        this.updateExtremes()
        this._updateRangeCode()
      }
    }
  },
  mounted() {
    this.pickRange('all')
  },
  methods: {
    getInterval() {
      if (this.dataset.length >= 2) {
        return dayjs(this.dataset[1][0]).diff(dayjs(this.dataset[0][0]), 'milisecond')
      }
      return 0
    },
    updateExtremes() {
      if (this.chart && this.chart.xAxis) {
        this.chart.xAxis[0].setExtremes(dayjs(this.chartOptions.from).valueOf(), dayjs(this.chartOptions.to).valueOf())
      }
    },
    afterSetExtremesHandler(e) {
      this.chart.showLoading()
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => this.updateRange(e), this.timeoutSeconds)
    },
    updateRange(e) {
      this.chart.hideLoading()
      const options = this.chartOptions
      if (
        dayjs(options.from).toString() === dayjs(e.min).toString() &&
        dayjs(options.to).toString() === dayjs(e.max).toString()
      ) {
        return
      }

      this.rangeCode = ''
      this.$emit('range-changed', {
        from: dayjs(e.min),
        to: dayjs(e.max)
      })
    },
    pickRange(rangeCode) {
      this.rangeCode = rangeCode
      this.$emit('range-changed', this.timeRanges[rangeCode])
      this.chart.showLoading()
    },
    _updateRangeCode() {
      let rangeCode = ''

      Object.keys(this.timeRanges).forEach(code => {
        if (
          dayjs(this.chartOptions.from).toString() === this.timeRanges[code].from.toString() &&
          dayjs(this.chartOptions.to).toString() === this.timeRanges[code].to.toString()
        ) {
          rangeCode = code
        }
      })

      this.rangeCode = rangeCode
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chart {
  margin: 0 auto;
  background: #fff;
  position: relative;
  border-radius: 3px;

  & /deep/ {
    * {
      transition: all 0ms;
    }

    .highcharts-scrollbar-arrow,
    .highcharts-range-selector-buttons {
      display: none;
    }

    .highcharts-credits {
      display: none;
    }
  }
}
</style>
