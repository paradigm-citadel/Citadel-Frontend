<template>
  <div class="wrapper">
    <ColorLine :color="error ? '#f27676' : '#5d4f9c'" />
    <form v-if="!error" class="form" @submit.prevent="submit">
      <FormInput
        v-for="item in formInputs"
        :key="item.id"
        v-model="fields[item.name]"
        :disabled="isLoading"
        :placeholder="item.placeholder"
        :type="item.type"
        :error="errors[item.name]"
        @focus="errors[item.name] = ''"
      />
      <Button :disabled="hasError || isLoading" type="submit">Sign Up</Button>
    </form>
    <ErrorState v-else @back="hideError" />
  </div>
</template>
<script>
import ColorLine from '@/components/ui/ColorLine'
import Button from '@/components/ui/Button'
import FormInput from './FormInput'
import ErrorState from './ErrorState'
import { AUTH } from '@/store/types'

export default {
  name: 'FormState',
  components: { ColorLine, ErrorState, Button, FormInput },
  data: () => ({
    fields: {
      email: '',
      password: '',
      repassword: ''
    },
    errors: {
      email: '',
      password: '',
      repassword: ''
    }
  }),
  computed: {
    formInputs() {
      return [
        {
          name: 'email',
          placeholder: 'E-mail',
          type: 'text',
          id: 0
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          id: 1
        },
        {
          name: 'repassword',
          placeholder: 'Confirm Password',
          type: 'password',
          id: 2
        }
      ]
    },
    hasError() {
      const { email, password, repassword } = this.errors
      return email || password || repassword
    },
    error() {
      return this.$store.getters[AUTH.GETTER.REGISTRATION_ERROR]
    },
    isLoading() {
      return this.$store.getters[AUTH.GETTER.REGISTRATION_IS_LOADING]
    }
  },
  methods: {
    validateFields() {
      const { email, password, repassword } = this.fields
      let isInvalid = false
      if (!email.match(`^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`)) {
        this.errors.email = 'Enter correct email'
        isInvalid = true
      }
      if (password.length < 8) {
        this.errors.password = 'This field is required'
        isInvalid = true
      }
      if (!password.length) {
        this.errors.repassword = 'This field is required'
        isInvalid = true
      }
      if (password !== repassword) {
        this.errors.repassword = `Passwords don't match`
        isInvalid = true
      }
      return isInvalid
    },
    submit() {
      if (this.validateFields()) return
      const { email, password } = this.fields
      this.$store.commit(AUTH.MUTATION.CHANGE_FIELD_REGISTRATION, {
        field: 'email',
        value: email
      })
      this.$store.commit(AUTH.MUTATION.CHANGE_FIELD_REGISTRATION, {
        field: 'password',
        value: password
      })
      this.$store.dispatch(AUTH.ACTION.SUBMIT_REGISTRATION)
    },
    hideError() {
      this.$store.commit(AUTH.MUTATION.SET_ERROR_REGISTRATION, null)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  margin: 50px 0 0;
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
