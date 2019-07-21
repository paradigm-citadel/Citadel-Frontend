<template>
  <div class="dropdown">
    <DropdownItem v-for="item in itemsList" :key="item.key" :item="item" @click="$emit('input', item.key)" />
  </div>
</template>

<script>
import DropdownItem from './DropdownItem.vue'
export default {
  components: {
    DropdownItem
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    itemsList() {
      return this.items.map(item => ({
        ...item,
        isActive: item.key === this.value
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  margin-bottom: 32px;
}
</style>
