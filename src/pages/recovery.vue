<template>
  <ForgotPage />
</template>

<script>
import ForgotPage from '@/components/pages/recovery/RecoveryPage'
import { AUTH } from '@/store/types'

export default {
  name: 'ForgotEntry',
  layout: 'auth',
  components: { ForgotPage },
  mounted() {
    this.$store.commit(AUTH.MUTATION.RESET_FORGOT)
  },
  middleware: 'guest'
}
</script>
