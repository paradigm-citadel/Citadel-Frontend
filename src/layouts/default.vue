<template>
  <div class="default-layout">
    <Sidebar class="sidebar" />
    <div class="content">
      <Topbar class="topbar" />
      <nuxt />
      <Footer class="footer" />
    </div>
    <AddNewCurrencyModal />
    <ConfirmDelete />
  </div>
</template>

<script>
import AddNewCurrencyModal from '@/components/common/add-new-currency-modal/AddNewCurrencyModal'
import ConfirmDelete from '@/components/common/confirm-delete/ConfirmDelete'
import Footer from '@/components/common/footer/Footer'
import Sidebar from '@/components/common/sidebar/Sidebar'
import Topbar from '@/components/common/topbar/Topbar'
import { NETWORK } from '@/store/types'

export default {
  components: { AddNewCurrencyModal, Footer, Topbar, Sidebar, ConfirmDelete },
  mounted() {
    this.$store.dispatch(NETWORK.ACTION.LOAD_NETWORKS)
  }
}
</script>

<style scoped>
@import './default/default-layout.scss';
</style>

<style>
@import '~/assets/styles/entry.scss';
</style>
