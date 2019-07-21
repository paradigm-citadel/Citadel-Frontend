<template>
  <div class="wrapper">
    <ColorLine :color="error ? '#f27676' : '#5d4f9c'" />
    <form v-if="!error" class="form" @submit.prevent="submit">
      <FormInput v-model="email" :disabled="isLoading" class="input" placeholder="E-mail" />
      <FormInput v-model="password" :disabled="isLoading" class="input" placeholder="Password" type="password" />
      <Button :disabled="isLoading" type="submit">Sign in</Button>
    </form>
    <ErrorState v-else @back="hideError" />
  </div>
</template>
<script>
import ColorLine from '@/components/ui/ColorLine'
import ErrorState from './ErrorState'
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import { AUTH } from '@/store/types'

export default {
  name: 'FormState',
  components: { ColorLine, ErrorState, Button, FormInput },
  computed: {
    fields() {
      return this.$store.getters[AUTH.GETTER.SIGN_IN_FIELDS]
    },
    email: {
      get() {
        return this.fields.email
      },
      set(value) {
        return this.$store.commit(AUTH.MUTATION.CHANGE_FIELD_SIGN_IN, {
          field: 'email',
          value
        })
      }
    },
    password: {
      get() {
        return this.fields.password
      },
      set(value) {
        return this.$store.commit(AUTH.MUTATION.CHANGE_FIELD_SIGN_IN, {
          field: 'password',
          value
        })
      }
    },
    error() {
      return this.$store.getters[AUTH.GETTER.SIGN_IN_ERROR]
    },
    isLoading() {
      return this.$store.getters[AUTH.GETTER.SIGN_IN_IS_LOADING]
    }
  },
  methods: {
    submit() {
      this.$store.dispatch(AUTH.ACTION.SUBMIT_SIGN_IN)
    },
    hideError() {
      this.$store.commit(AUTH.MUTATION.SET_ERROR_SIGN_IN, null)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 244px;
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

.input {
  margin-bottom: 20px;
}
</style>
