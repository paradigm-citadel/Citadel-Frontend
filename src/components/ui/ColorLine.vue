<template>
  <div class="color-line" :style="{ backgroundColor: color, height: `${height}px` }" />
</template>

<script>
export default {
  name: 'ColorLine',
  props: {
    color: {
      type: String,
      default: '#5d4f9c'
    },
    height: {
      type: Number,
      default: 4
    }
  }
}
</script>

<style lang="scss">
.color-line {
  width: 100%;
}
</style>
