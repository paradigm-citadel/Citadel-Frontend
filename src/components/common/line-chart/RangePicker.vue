<template>
  <div class="range-buttons">
    Zoom:
    <div
      v-for="range in ranges"
      :key="range.code"
      :class="{ control: true, selected: rangeCode === range.code }"
      @click="$emit('range-changed', range.code)"
    >
      {{ range.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rangeCode: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    ranges: [
      {
        text: '7d',
        code: 'week'
      },
      {
        text: '1m',
        code: 'month'
      },
      {
        text: '3m',
        code: 'threeMonths'
      },
      {
        text: '1y',
        code: 'year'
      },
      {
        text: 'All',
        code: 'all'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.range-buttons {
  font-size: 12px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 1;
  left: 20px;
  margin-top: 10px;
  background: #fff;
}

.control {
  background: #f6f6f6;
  padding: 4px 7px;
  margin-left: 5px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: #e5e5e5;
  }
}

.selected {
  &,
  &:hover {
    background: #e5eaf4;
  }
}
</style>
