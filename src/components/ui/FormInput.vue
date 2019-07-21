<template>
  <input ref="input" v-bind="$props" @input="$emit('input', $event.target.value)" @focus="$emit('focus')" />
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
input {
  width: 100%;
  height: 50px;
  border: solid 1px #f2f2f2;
  background-color: #f8f7fc;
  padding: 18px 20px;
  color: #333;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1;
  &::placeholder {
    color: #9d9d9d;
  }
  &:disabled {
    opacity: 0.7;
  }
}
</style>
