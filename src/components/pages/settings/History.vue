<template>
  <Block class="position-history">
    <div class="head-history">
      <p class="title-history purple bold">Reward history</p>
      <Link class="purple text add-addr" link="" @click.native.prevent="openModal">Add address</Link>
    </div>
    <WalletTable v-if="tableData.length" />
    <p v-else class="empty-text">Now your reward history list is empty.</p>
  </Block>
</template>

<script>
import WalletTable from '@/components/pages/settings/WalletTable'
import Link from '@/components/ui/Link'
import Block from '@/components/ui/Block'
import { ADD_NEW_ADDRESS, WALLET } from '@/store/types'

export default {
  name: 'History',
  components: { WalletTable, Block, Link },
  computed: {
    tableData() {
      return this.$store.getters[WALLET.GETTER.TABLE_FOR_SETTINGS]
    }
  },
  methods: {
    openModal() {
      this.$store.commit(ADD_NEW_ADDRESS.MUTATION.SET_MODAL_OPEN, true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';

.head-history {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 29px;
}
.position-history {
  position: relative;
  min-height: 162px;
}
.title-history {
  font-size: 16px;
  line-height: 0.88;
}

.add-addr {
  text-decoration: underline;
}

.empty-text {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
}
</style>
