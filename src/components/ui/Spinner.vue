<template>
  <div class="spinner-container" :class="{ light, 'without-overlay': withoutOverlay }">
    <div class="spinner" />
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    light: {
      type: Boolean,
      default: false
    },
    withoutOverlay: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.3);

  &.light {
    background-color: rgba(255, 255, 255, 0.5);
  }

  &.without-overlay {
    background-color: transparent;
  }
}

.spinner {
  background-image: url('~assets/ui/loader.svg');
  background-size: contain;
  background-repeat: no-repeat;
  user-select: none;
  width: 100px;
  height: 100px;
}
</style>
