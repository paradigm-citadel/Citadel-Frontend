<template>
  <OverallPage />
</template>

<script>
import OverallPage from '@/components/pages/overall/OverallPage'
import { REWARD, WALLET_OVERALL } from '@/store/types'
export default {
  name: 'OverallCurrencyEntry',
  components: { OverallPage },
  mounted() {
    this.$store.dispatch(REWARD.ACTION.LOAD_REWARDS)
    this.$store.dispatch(WALLET_OVERALL.ACTION.LOAD_DATA)
  }
}
</script>
