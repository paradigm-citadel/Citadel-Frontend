<template>
  <Block ref="block" shadowed rounded class="tooltip" without-padding :style="calculateStyle()">
    <h3>{{ title }}</h3>
    <div class="volumes">
      <span>{{ volume }} {{ symbol }}</span>
      <span>{{ price }}</span>
    </div>
  </Block>
</template>

<script>
import Block from '@/components/ui/Block'
export default {
  name: 'Tooltip',
  components: { Block },
  props: {
    left: {
      type: Number,
      required: true
    },
    top: {
      type: Number,
      required: true
    },
    opacity: {
      type: Number,
      required: true
    },
    price: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    volume: {
      type: [Number, String],
      required: true
    },
    symbol: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$forceUpdate()
  },
  methods: {
    // don't move into computed!!!!!
    calculateStyle() {
      let position = { height: 0, width: 0 }
      if (this.$refs.block) {
        position = this.$refs.block.getBoundingClientRect()
      }

      const left = this.left - position.width / 2
      const top = this.top - position.height / 2

      return {
        left: `${left}px`,
        top: `${top}px`,
        opacity: this.opacity
      }
    }
  }
}
</script>

<style scoped lang="scss">
.tooltip {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  transition: opacity 300ms ease, left 200ms ease, top 200ms ease;
  padding: 10px;
  color: #fff;
  font-family: Roboto;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.08;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  width: 250px;

  &:before {
    content: ' ';
    position: absolute;
    bottom: -15px;
    left: 50%;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top: 9px solid rgba(0, 0, 0, 0.7);
    transform: translateX(-50%);
  }
}

h3 {
  font-weight: 500;
  font-style: normal;
}

.volumes {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  span {
    margin-left: 20px;

    &:first-of-type {
      margin-left: 0;
    }
  }
}
</style>
