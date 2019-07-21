<template>
  <Block class="wrapper-list-polls">
    <div v-if="pollsCurrent.length" class="list-polls">
      <transition-group name="fade" mode="out-in">
        <ItemPolls v-for="item in pollsCurrent" :key="item.id" :poll="item" />
      </transition-group>
    </div>
    <Spinner v-if="isLoading" light />
    <p v-if="pollsCurrent.length === 0 && !isLoading" class="empty-text">Now your polls list is empty.</p>
  </Block>
</template>

<script>
import Block from '@/components/ui/Block'
import ItemPolls from './ItemPolls'
import Spinner from '@/components/ui/Spinner'
import { POLLS } from '@/store/types'

export default {
  name: 'ContentPolls',
  components: { Block, ItemPolls, Spinner },
  computed: {
    isLoading() {
      return this.$store.getters[POLLS.GETTER.GET_IS_LOADING]
    },
    pollsCurrent() {
      return this.$store.getters[POLLS.GETTER.GET_POLLS_FOR_LIST]
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-list-polls {
  position: relative;
  min-height: 232px;
}

.empty-text {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
