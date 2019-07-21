<template>
  <div class="picker" @click.stop>
    <div class="wrapper" :class="{ open: isOpen }">
      <div class="selected" @click="isOpen = !isOpen">
        {{ selectedTitle }}
        <div class="arrow" />
      </div>
      <div class="list">
        <p v-for="item in toggleItems" :key="item.value" @click="select(item.value)">{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { TOPBAR } from '@/store/types'

export default {
  name: 'Picker',
  data: () => ({
    selection: 'reward',
    isOpen: false
  }),
  computed: {
    currentSelection() {
      return this.$store.getters[TOPBAR.GETTER.GET_TYPE]
    },
    currentItems() {
      return this.$store.getters[TOPBAR.GETTER.GET_TYPE_LIST]
    },
    selectedTitle() {
      return this.currentItems.find(item => item.value === this.currentSelection).label
    },
    toggleItems() {
      return this.currentItems.filter(item => item.value !== this.currentSelection)
    }
  },
  mounted() {
    document.addEventListener('click', this.close)
  },
  methods: {
    close() {
      this.isOpen = false
    },
    select(value) {
      this.$store.dispatch(TOPBAR.ACTION.SET_TYPE_AND_RELOAD_DATA, value)
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.picker {
  position: relative;
  width: 160px;
  height: 36px;
}

.wrapper {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 36px;

  &.open {
    height: 80px;
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
  font-size: 16px;
  font-weight: bold;
  line-height: 0.88;
  color: #40356c;
  padding: 15px 20px 0;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.arrow {
  width: 10px;
  height: 10px;
  border-top: 1px solid #40356c;
  border-left: 1px solid #40356c;
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
