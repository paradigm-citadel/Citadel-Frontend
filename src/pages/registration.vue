<template>
  <RegistrationPage />
</template>

<script>
import RegistrationPage from '@/components/pages/registration/RegistrationPage'

export default {
  name: 'RegistrationEntry',
  layout: 'auth',
  components: { RegistrationPage },
  middleware: 'guest'
}
</script>
