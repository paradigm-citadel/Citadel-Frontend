<template>
  <div class="form-state">
    <ColorLine :color="status ? '#f27676' : '#5d4f9c'" />
    <SuccessState v-if="status === 'success'" @button-click="redirectToLoginPage" />
    <ErrorState v-else-if="status === 'failed'" @button-click="closeError" />
    <Form v-else />
  </div>
</template>

<script>
import ErrorState from '@/components/pages/recovery/form-states/ErrorState'
import Form from '@/components/pages/recovery/form-states/Form'
import SuccessState from '@/components/pages/recovery/form-states/SuccessState'
import ColorLine from '@/components/ui/ColorLine'
import { AUTH } from '@/store/types'

export default {
  components: { SuccessState, ErrorState, Form, ColorLine },
  computed: {
    status() {
      return this.$store.getters[AUTH.GETTER.FORGOT_STATUS]
    }
  },
  methods: {
    closeError() {
      this.$store.commit(AUTH.MUTATION.SET_FORGOT_STATUS, null)
    },
    redirectToLoginPage() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.form-state {
  width: 100%;
  display: flex;
  height: 220px;
  flex-direction: column;
}
</style>
