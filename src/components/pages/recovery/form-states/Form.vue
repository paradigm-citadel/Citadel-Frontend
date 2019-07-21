<template>
  <form :disabled="isLoading" novalidate @submit.prevent="submit">
    <h2>Forgot Password?</h2>
    <FormInput v-model="email" :disabled="isLoading" class="input" type="email" placeholder="E-mail" />
    <Button :disabled="isLoading" type="submit">Reset password</Button>
  </form>
</template>

<script>
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import { AUTH } from '@/store/types'

export default {
  components: { Button, FormInput },
  computed: {
    isLoading() {
      return this.$store.getters[AUTH.GETTER.FORGOT_IS_LOADING]
    },
    email: {
      set(value) {
        this.$store.commit(AUTH.MUTATION.CHANGE_FIELD_FORGOT, { field: 'email', value })
      },
      get() {
        return this.$store.getters[AUTH.GETTER.FORGOT_FIELDS].email
      }
    }
  },
  methods: {
    submit() {
      console.log(1212)
      this.$store.dispatch(AUTH.ACTION.SUBMIT_PASSWORD_RECOVERY)
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  width: 240px;
  height: 200px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-top: 46px;
  font-size: 12px;
  text-align: center;
  font-weight: 500;
  line-height: 1.17;
  color: #000000;
}

.input {
  margin: 20px 0;
}
</style>
