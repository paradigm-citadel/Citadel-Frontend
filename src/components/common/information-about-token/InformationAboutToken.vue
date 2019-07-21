<template>
  <Block class="container container-info">
    <transition-group name="fade" mode="out-in">
      <HeadInfo key="head" :info-token="infoToken" />
      <p v-if="infoToken.description" key="message" class="info-description opacity">
        {{ infoToken.description }}
      </p>
      <BottomInfo key="statistics" :statistics="infoToken.statistics" />
    </transition-group>
  </Block>
</template>

<script>
import Block from '@/components/ui/Block'
import HeadInfo from './HeadInfo'
import BottomInfo from './BottomInfo'

export default {
  name: 'InformationAboutToken',
  components: { Block, HeadInfo, BottomInfo },
  props: {
    infoToken: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';

.container-info {
  margin: 0 auto;
  margin-bottom: 20px;
  width: 100%;
  max-width: 860px;
  min-height: 120px;
  position: relative;
}

.opacity {
  font-size: 12px;
  font-weight: 300;
  line-height: 1.08;
  color: #656565;
}
//
.info-description {
  line-height: 1.71;
  margin-bottom: 30px;
  max-width: 95%;
  word-break: break-all;
}
</style>
