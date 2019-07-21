<template>
  <div class="head-info">
    <div class="head-container">
      <img :src="infoToken.icon" :alt="infoToken.name" :title="infoToken.name" class="logo-info" />
      <p class="logo-title">{{ infoToken.name }}</p>
      <p class="info-increasing opacity">
        {{
          Number.isInteger(infoToken.statistics.price_usd)
            ? infoToken.statistics.price_usd
            : +infoToken.statistics.price_usd.toFixed(8)
        }}
        ({{
          Number.isInteger(infoToken.statistics.price_usd_delta_24)
            ? infoToken.statistics.price_usd_delta_24
            : rounded(infoToken.statistics.price_usd_delta_24)
        }}%)
        <span
          :class="{
            'triangle-increasing': 0 < infoToken.statistics.price_usd_delta_24,
            'triangle-falls': 0 > infoToken.statistics.price_usd_delta_24
          }"
          class="triangle"
        />
      </p>
      <p class="info-falls opacity">
        {{
          Number.isInteger(infoToken.statistics.price_btc)
            ? infoToken.statistics.price_btc
            : +infoToken.statistics.price_btc.toFixed(8)
        }}
        ({{
          Number.isInteger(infoToken.statistics.price_btc_delta_24)
            ? infoToken.statistics.price_btc_delta_24
            : rounded(infoToken.statistics.price_btc_delta_24)
        }}%)
        <span
          :class="{
            'triangle-increasing': 0 < infoToken.statistics.price_btc_delta_24,
            'triangle-falls': 0 > infoToken.statistics.price_btc_delta_24
          }"
          class="triangle"
        />
      </p>
    </div>
    <div v-if="infoToken.social.length" class="head-container">
      <a
        v-for="(item, index) in infoToken.social"
        :key="index"
        :href="item.url"
        :title="item.name"
        :style="{ backgroundImage: `url(${item.icon})` }"
        class="icon-info div-img"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeadInfo',
  props: {
    infoToken: {
      type: Object,
      required: true
    }
  },
  methods: {
    rounded(num) {
      if (num > 0 && num < 0.01) return 0.01
      if (num < 0 && num > -0.01) return -0.01
      return num.toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';

.head-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.head-container {
  display: flex;
  align-items: center;
}
// логоитп кошелька и его информация
.logo-info {
  width: 100%;
  max-width: 30px;
}

.logo-title {
  font-size: 18px;
  font-weight: bold;
  line-height: 0.78;
  color: #40356c;
  margin-left: 20px;
}

.opacity {
  font-size: 12px;
  font-weight: 300;
  line-height: 1.08;
  color: #656565;
}
//
.info-increasing {
  margin-left: 20px;
  position: relative;
}

.info-falls {
  margin-left: 20px;
  position: relative;
}

.triangle {
  position: absolute;
  right: -12px;
}

.triangle-increasing {
  border: 4px solid transparent;
  border-bottom: 5px solid #2dad38;
  top: -1px;
}
.triangle-falls {
  border: 4px solid transparent;
  border-top: 5px solid #f11313;
  top: 3px;
}
// иконки соц сетей
.icon-info {
  width: 20px;
  height: 18px;
  &:not(:first-child) {
    margin-left: 25px;
  }
}
</style>
