<template>
  <div ref="wrapper" class="wrapper">
    <SelectLayout
      ref="select"
      :placeholder="placeholder"
      :selected-value="selectedValue"
      :is-active="isActive"
      @toggle="toggle"
    />
    <div class="dropdown-wrapper" :class="{ active: isActive }">
      <Dropdown value="value" :items="items" @input="select" />
    </div>
  </div>
</template>

<script>
import SelectLayout from './select/SelectLayout'
import Dropdown from './select/Dropdown'

export default {
  components: {
    SelectLayout,
    Dropdown
  },
  props: {
    items: {
      type: Array,
      default: () => [],
      validator: val =>
        val.filter(item => typeof item.key === 'undefined' || typeof item.label === 'undefined').length === 0
    },
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    isActive: false
  }),
  computed: {
    selectedValue() {
      return this.items.find(item => item.key === this.value)
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown, true)
  },
  destroyed() {
    document.removeEventListener('click', this.closeDropdown, true)
  },
  methods: {
    closeDropdown(e) {
      if (this.$refs.wrapper.contains(e.target)) return
      this.isActive = false
    },
    toggle() {
      this.isActive = !this.isActive
    },
    select(key) {
      this.$emit('input', key)
      this.toggle()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  position: relative;
}

.dropdown-wrapper {
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
  transform: translateY(100%);
  left: 0;
  z-index: 1;
  opacity: 0;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
