<template>
  <LoginPage />
</template>

<script>
import LoginPage from '@/components/pages/login/LoginPage'
import { AUTH } from '@/store/types'

export default {
  name: 'LoginEntry',
  layout: 'auth',
  components: { LoginPage },
  mounted() {
    this.$store.commit(AUTH.MUTATION.RESET_SIGN_IN)
  },
  middleware: 'guest'
}
</script>
