<template>
  <Modal :show="isOpen" title="Confirmation" @close="deny">
    <p>{{ message }}</p>
    <div class="container">
      <Button class="controller" @click="confirm">Yes</Button>
      <Button class="controller no" @click="deny">No</Button>
    </div>
    <Spinner v-if="isLoading" />
  </Modal>
</template>

<script>
import Spinner from '@/components/ui/Spinner'
import { UI } from '@/store/types'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
export default {
  components: { Spinner, Modal, Button },
  computed: {
    isLoading() {
      return this.$store.getters[UI.GETTER.CONFIRM_IS_LOADING]
    },
    message() {
      return this.$store.getters[UI.GETTER.GET_CONFIRM_MESSAGE]
    },
    isOpen() {
      return this.$store.getters[UI.GETTER.CONFIRM_DELETE]
    }
  },
  methods: {
    deny() {
      this.$store.commit(UI.MUTATION.SET_CONFIRM_FUNCTION, null)
      this.$store.commit(UI.MUTATION.SET_CONFIRM_IS_OPEN, false)
    },
    confirm() {
      this.$store.dispatch(UI.ACTION.CONFIRM)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';
.container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  @include between-children {
    margin-left: 50px;
  }
}
.controller {
  margin: 20px 0;

  &.no {
    background-color: #f27676;
  }
}

p {
  text-align: center;
}
</style>
