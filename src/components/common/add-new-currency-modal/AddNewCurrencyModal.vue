<template>
  <Modal :show="isOpen" title="Add wallet address" @close="hide">
    <component :is="currentComponent" />
    <Spinner v-if="isLoading" />
  </Modal>
</template>

<script>
import Modal from '@/components/ui/Modal'
import Spinner from '@/components/ui/Spinner'
import Feedback from './Feedback'
import Form from './Form'
import { ADD_NEW_ADDRESS } from '@/store/types'

export default {
  components: { Spinner, Modal, Feedback, Form },
  computed: {
    isLoading() {
      return this.$store.getters[ADD_NEW_ADDRESS.GETTER.IS_LOADING]
    },
    isOpen() {
      return this.$store.getters[ADD_NEW_ADDRESS.GETTER.IS_OPEN]
    },
    isError() {
      return this.$store.getters[ADD_NEW_ADDRESS.GETTER.IS_ERROR]
    },
    currentComponent() {
      return this.isError ? 'Feedback' : 'Form'
    }
  },
  methods: {
    hide() {
      this.$store.commit(ADD_NEW_ADDRESS.MUTATION.CHANGE_FIELD, { field: 'currency', value: -1 })
      this.$store.commit(ADD_NEW_ADDRESS.MUTATION.CHANGE_FIELD, { field: 'address', value: '' })
      this.$store.commit(ADD_NEW_ADDRESS.MUTATION.SET_IS_ERROR, false)
      this.$store.commit(ADD_NEW_ADDRESS.MUTATION.SET_MODAL_OPEN, false)
    }
  }
}
</script>
