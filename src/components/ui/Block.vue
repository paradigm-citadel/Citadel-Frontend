<template>
  <div ref="block" class="block" :class="{ shadowed, rounded, padded: !withoutPadding }" v-on="$listeners">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Block',
  props: {
    shadowed: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    withoutPadding: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getBoundingClientRect() {
      return this.$refs.block.getBoundingClientRect()
    }
  }
}
</script>

<style scoped lang="scss">
.block {
  border-radius: 3px;
  background-color: #ffffff;

  &.shadowed {
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.1);
  }

  &.rounded {
    border-radius: 5px;
  }

  &.padded {
    padding: 20px;
  }
}
</style>
