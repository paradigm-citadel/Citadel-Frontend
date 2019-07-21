<template>
  <div :class="{ item: true, active: item.isActive }" @click="$emit('click')">
    {{ item.label }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  cursor: pointer;
  width: 100%;
  padding: 5px 10px;

  border: solid 1px #f2f2f2;
  background-color: #f8f7fc;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover,
  &.active {
    background-color: #524493;
    color: #fff;
  }
}
</style>
