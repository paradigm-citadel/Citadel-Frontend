<template>
  <div class="sidebar">
    <Logo />
    <div class="box">
      <SidebarMenu v-if="menuItems.length !== 0" :menu-items="menuItems" />
      <p v-else class="empty-wallet-list">
        Now your wallet list is empty. Add one and start see analytics
      </p>
      <Link class="add-address-link" link="" @click.native.prevent="openModal">Add address</Link>
      <SecondMenu />
    </div>
  </div>
</template>

<script>
import Logo from '@/components/common/sidebar/Logo'
import SidebarMenu from '@/components/common/sidebar/SidebarMenu'
import SecondMenu from '@/components/common/sidebar/SecondMenu'
import Link from '@/components/ui/Link'
import { ADD_NEW_ADDRESS, WALLET } from '@/store/types'

export default {
  name: 'Sidebar',
  components: { Link, Logo, SidebarMenu, SecondMenu },
  computed: {
    menuItems() {
      return this.$store.getters[WALLET.GETTER.LIST_FOR_SIDEBAR]
    }
  },
  methods: {
    openModal() {
      return this.$store.commit(ADD_NEW_ADDRESS.MUTATION.SET_MODAL_OPEN, true)
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  position: relative;
  z-index: 1;
  width: 290px;
  min-height: 640px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}

.box {
  position: absolute;
  top: 60px;
  right: -20px;
  width: calc(100% + 20px);
  height: 100%;
  overflow-y: scroll;
  &:after {
    content: '';
    display: flex;
    width: 100%;
    height: 80px;
  }
}

.empty-wallet-list {
  padding: 15px;
  text-align: center;
  width: 290px;
}

.add-address-link {
  display: block;
  font-size: 14px;
  line-height: 1;
  color: #40356c;
  margin-top: 20px;
  margin-right: 30px;
  text-align: right;
}
</style>
