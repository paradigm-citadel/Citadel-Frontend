<template>
  <div class="container">
    <Block without-padding class="empty-data">
      <div class="div-img clipboard" />
      <p>This wallet doesn't have a history</p>
    </Block>
  </div>
</template>

<script>
import Block from '@/components/ui/Block'
export default {
  name: 'EmptyData',
  components: { Block }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;
}

.empty-data {
  width: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 30px 20px;
  border-radius: 8px;
  background-color: #eae7f5;
}

.clipboard {
  display: flex;
  width: 56px;
  height: 70px;
  background-image: url('~assets/ui/clipboard.svg');
}

p {
  margin-top: 20px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.43;
  text-align: center;
  color: #656565;
}
</style>
