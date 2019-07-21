<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10">
    <g fill="#5D4F9C" fill-rule="nonzero">
      <path d="M6 4H0l3-4z" :opacity="!type ? 1 : type === 'ASC' ? 1 : 0.3" />
      <path d="M0 6h6l-3 4z" :opacity="!type ? 1 : type === 'DESC' ? 1 : 0.3" />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SortIcon',
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
path {
  transition: none;
}
</style>
