<template>
  <Block>
    <form class="form" @submit.prevent="submit">
      <FromInputFeedback
        :id="`settings-email`"
        v-model="email"
        :disabled="isLoading"
        :label-text="`Email`"
        class="input"
        :error="errorEmail"
        @focus="errorEmail = ''"
      />
      <transition name="fade">
        <p v-if="formMessage" class="form-message grey text">{{ formMessage }}</p>
      </transition>
      <Button :disabled="errorEmail || isLoading" type="submit" class="button">Save</Button>
    </form>
  </Block>
</template>

<script>
import Button from '@/components/ui/Button'
import FromInputFeedback from '@/components/ui/FromInputFeedback'
import Block from '@/components/ui/Block'
import { PROFILE } from '@/store/types'

export default {
  name: 'Email',
  components: { Block, Button, FromInputFeedback },
  data: () => ({
    isLoading: false,
    errorEmail: '',
    email: '',
    formMessage: ''
  }),
  computed: {
    userInfo() {
      return this.$store.getters[PROFILE.GETTER.USER]
    }
  },
  mounted() {
    this.email = this.userInfo.email
  },
  methods: {
    validateEmail() {
      let isInvalid = false
      if (
        !this.email.match(
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
        )
      ) {
        this.errorEmail = 'This field must be Email'
        isInvalid = true
      }
      if (!this.email.length) {
        this.errorEmail = 'This field is required.'
        isInvalid = true
      }
      return isInvalid
    },
    async submit() {
      this.isLoading = true
      try {
        if (this.validateEmail()) return

        const user = {
          user: {
            first_name: this.userInfo.firstName,
            last_name: this.userInfo.lastName,
            email: this.email
          }
        }

        await this.$store.dispatch(PROFILE.ACTION.CHANGE_PROFILE_DATA, user)

        this.formMessage = 'Your email changed successfully'
        this.email = ''
      } catch (err) {
        this.formMessage =
          err.response.data.email[0] === 'This field must be unique.'
            ? err.response.data.email[0]
            : `Sorry your password hasn't been changed. Try again later`
      } finally {
        this.isLoading = false
        this.email = this.userInfo.email
        setTimeout(() => {
          this.formMessage = ''
        }, 5000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';

.form {
  width: 50%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  @include between-children {
    margin-top: 20px;
  }
}

.button {
  width: 90px;
}

.form-message {
  margin-top: 12px;
}
</style>
