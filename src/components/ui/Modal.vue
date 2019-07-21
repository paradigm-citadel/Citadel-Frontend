<template>
  <transition name="fade">
    <div v-if="show" class="overlay" @click="$emit('close')">
      <Block rounded without-padding class="modal" @click.stop>
        <div class="header">
          <slot name="header">
            <h1>{{ title }}</h1>
            <div class="close" @click="$emit('close')" />
          </slot>
        </div>
        <Divider />
        <div class="content">
          <slot />
        </div>
      </Block>
    </div>
  </transition>
</template>

<script>
import Block from '@/components/ui/Block'
import Divider from '@/components/ui/Divider'

export default {
  components: { Divider, Block },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(24, 24, 24, 0.6);
}

.modal {
  position: relative;
  min-width: 460px;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0;
}

h1 {
  font-size: 16px;
  font-weight: bold;
  line-height: 0.88;
  color: #40356c;
  margin-right: 20px;
}

.close {
  width: 14px;
  height: 14px;
  background-image: url('~assets/modal/close.svg');
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.content {
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
