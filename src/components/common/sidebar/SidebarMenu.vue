<template>
  <div class="menu">
    <SidebarMenuItem
      v-for="item in menuItems"
      :key="item.currency"
      :currency="item.currency"
      :link="`/currency/${item.currency}`"
      :title="item.title"
      :icon="item.icon"
      :sub-items="item.wallets"
      :is-open="currentOpenCurrency === item.currency"
      @select="currentOpenCurrency = $event"
    />
  </div>
</template>

<script>
import SidebarMenuItem from '@/components/common/sidebar/SidebarMenuItem'
export default {
  name: 'SidebarMenu',
  components: { SidebarMenuItem },
  props: {
    menuItems: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    currentOpenCurrency: ''
  }),
  mounted() {
    this.menuItems.forEach(item => {
      if (item.currency === this.$route.params.currencyCode) return (this.currentOpenCurrency = item.currency)
    })
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 290px;
}
</style>
