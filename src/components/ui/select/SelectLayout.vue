<template>
  <div ref="selectbox" class="select" @click="$emit('toggle')">
    <div v-if="selectedValue.key === -1 && placeholder" class="value placeholder">
      {{ placeholder }}
    </div>
    <div v-else class="value">
      {{ selectedValue.label }}
    </div>
    <div :class="{ arrow: true, opened: isActive }" />
  </div>
</template>

<script>
export default {
  props: {
    selectedValue: {
      type: Object,
      default: () => ({
        key: -1,
        label: ''
      })
    },
    isActive: {
      type: Boolean,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  height: 50px;

  border: solid 1px #f2f2f2;
  background-color: #f8f7fc;

  cursor: pointer;

  display: flex;
  align-items: center;
  padding: 0 20px 0 20px;
}

.arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  border-left: solid 2px #40356c;
  border-top: solid 2px #40356c;
  width: 8px;
  height: 8px;
  transform: translateY(-60%) rotate(-135deg);

  transition: transform 0.3s;

  &.opened {
    transform: translateY(-20%) rotate(45deg);
  }
}

.value {
  font-size: 14px;
  line-height: 1;
  color: #333;

  &.placeholder {
    color: #9d9d9d;
  }
}
</style>
