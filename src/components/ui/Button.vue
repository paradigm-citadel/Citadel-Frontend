<template>
  <button v-bind="$props" :class="{ dashed: dashed }" v-on="$listeners"><slot /></button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    dashed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  height: 50px;
  border-radius: 25px;
  background-color: #524493;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #ffffff;
  outline: none;
  border: none;
  padding: 18px 30px;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:disabled {
    opacity: 0.7 !important;
  }

  &:hover {
    opacity: 0.9;
  }

  &.dashed {
    background-color: transparent;
    border: #524493 2px solid;
  }
}
</style>
