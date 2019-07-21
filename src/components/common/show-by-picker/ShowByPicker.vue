<template>
  <div class="picker" @click.stop>
    <div class="wrapper" :class="{ open: isOpen }">
      <div class="selected" @click="isOpen = !isOpen">
        Show by {{ showBy }}
        <div class="arrow" />
      </div>
      <div class="list">
        <p @click="select(10)">Show by 10</p>
        <p @click="select(25)">Show by 25</p>
        <p @click="select(50)">Show by 50</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showBy: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    isOpen: false
  }),
  mounted() {
    document.addEventListener('click', this.close)
  },
  methods: {
    close() {
      this.isOpen = false
    },
    select(value) {
      this.$emit('changed', value)
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.picker {
  position: relative;
  width: 140px;
  height: 20px;
}

.wrapper {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 30px;

  &.open {
    height: 135px;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(164, 164, 164, 0.37);
    background-color: #ffffff;

    & .selected {
      cursor: default;
    }

    & .arrow {
      margin-top: 5px;
      transform: rotate(45deg);
    }
  }
}

.selected {
  font-family: Roboto;
  font-size: 14px;
  line-height: 1;
  color: #40356c;
  padding: 12px 20px 0;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.arrow {
  width: 10px;
  height: 10px;
  border-top: 1px solid #40356c;
  border-left: 1px solid #40356c;
  margin-top: -2px;
  transform: rotate(-135deg);
}

.list {
  margin-top: 10px;

  p {
    font-family: Roboto;
    font-size: 14px;
    line-height: 1;
    color: #40356c;
    padding: 10px 20px;
    cursor: pointer;

    &:hover {
      background-color: #edeef4;
    }
  }
}
</style>
