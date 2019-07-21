<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="8"
    viewBox="0 0 14 8"
    :class="{ arrow: true, opened }"
    v-on="$listeners"
  >
    <path
      fill="#40356C"
      fill-rule="nonzero"
      d="M7.693.288l6.02 6.034a.984.984 0 0 1 0 1.39.979.979 0 0 1-1.387 0L7 2.372l-5.326 5.34a.979.979 0 0 1-1.387 0 .984.984 0 0 1 0-1.39L6.307.288a.976.976 0 0 1 1.386 0z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  transform: rotate(-180deg);
  margin-right: 10px !important;
  transition: transform 300ms;
}

.opened {
  transform: rotate(0deg);
}
</style>
