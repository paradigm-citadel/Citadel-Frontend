<template>
  <div class="empty">
    <p class="title-empty purple bold">Your dashboard</p>
    <div class="empty-image div-img" />
    <Block without-padding class="initializing">
      <div class="div-img clock" />
      <p class="initializing-text">We are loading data from your wallet ...</p>
    </Block>
    <p class="description-empty grey text light">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur mus.
    </p>
    <Button class="controller" @click="openModal">Add address</Button>
  </div>
</template>

<script>
import Block from '@/components/ui/Block'
import Button from '@/components/ui/Button'
import { ADD_NEW_ADDRESS } from '@/store/types'

export default {
  components: { Block, Button },
  methods: {
    openModal() {
      this.$store.commit(ADD_NEW_ADDRESS.MUTATION.SET_MODAL_OPEN, true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 420px;
  height: 100%;
  margin: 0 auto;
  @include between-children {
    margin-top: 30px;
  }
}
.title-empty {
  font-size: 16px;
  line-height: 0.88;
  text-align: center;
  width: 100%;
}
.description-empty {
  font-size: 13px;
  line-height: 1.54;
  text-align: center;
  width: 100%;
}
.empty-image {
  width: 100%;
  height: 254px;
  background-image: url('~assets/overall/empty.png');
}

.initializing {
  padding: 10px 25px;
  border-radius: 8px;
  background-color: #eae7f5;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  &-text {
    font-size: 13px;
    font-weight: 300;
    line-height: 1.54;
    text-align: center;
    color: #656565;
  }
}

.clock {
  width: 42px;
  height: 40px;
  margin-right: 10px;
  background-image: url('~assets/ui/clock.svg');
}
</style>
