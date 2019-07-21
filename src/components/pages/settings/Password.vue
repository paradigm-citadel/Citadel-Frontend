<template>
  <Block>
    <form class="form" @submit.prevent="submit">
      <FromInputFeedback
        v-for="(item, index) in fields"
        :id="item.id"
        :key="index"
        v-model="item.value"
        :disabled="isLoading"
        :label-text="item.labeltext"
        :type="item.type"
        class="input"
        :error="index ? errors.password : errors.oldPassword"
        :feed-back-position="item.posFeedback"
        @focus="clearFieldError(index)"
      />
      <transition name="fade">
        <p v-if="formMessage" class="form-message grey text">{{ formMessage }}</p>
      </transition>
      <div class="controller">
        <Button :disabled="hasError || isLoading" type="submit" class="button">Save</Button>
        <div class="buttons">
          <Button class="delete-account" @click.prevent="deleteProfile">Delete Your Account</Button>
        </div>
      </div>
    </form>
  </Block>
</template>

<script>
import Button from '@/components/ui/Button'
import FromInputFeedback from '@/components/ui/FromInputFeedback'
import Block from '@/components/ui/Block'
import { PROFILE, UI } from '@/store/types'

export default {
  name: 'Password',
  components: { Block, Button, FromInputFeedback },
  data: () => ({
    fields: [
      {
        value: '',
        type: 'password',
        labeltext: 'Old password',
        id: 'old-settings-password',
        posFeedback: false
      },
      {
        value: '',
        type: 'password',
        labeltext: 'Password',
        id: 'new-settings-password',
        posFeedback: true
      }
    ],
    errors: {
      oldPassword: '',
      password: ''
    },
    isLoading: false,
    formMessage: ''
  }),
  computed: {
    hasError() {
      const { oldPassword, password } = this.errors
      return oldPassword || password
    }
  },
  methods: {
    deleteProfile() {
      this.$store.commit(UI.MUTATION.SET_CONFIRM_MESSAGE, 'Please confirm account deletion')
      this.$store.commit(UI.MUTATION.SET_CONFIRM_FUNCTION, async () => {
        await this.$store.dispatch(PROFILE.ACTION.DELETE_PROFILE)
      })
      this.$store.commit(UI.MUTATION.SET_CONFIRM_IS_OPEN, true)
    },
    clearFieldError(index) {
      index ? (this.errors.password = '') : (this.errors.oldPassword = '')
    },
    validateFields() {
      let isInvalid = false
      if (this.fields[0].value.length < 8) {
        this.errors.oldPassword = 'This field is too short. It must contain at least 8 characters.'
        isInvalid = true
      }
      if (this.fields[1].value.length < 8) {
        this.errors.password = 'This field is too short. It must contain at least 8 characters.'
        isInvalid = true
      }
      if (!this.fields[0].value.length) {
        this.errors.oldPassword = 'This field is required.'
        isInvalid = true
      }
      if (!this.fields[1].value.length) {
        this.errors.password = 'This field is required.'
        isInvalid = true
      }
      return isInvalid
    },
    resetErrors() {
      this.errors = {
        oldPassword: '',
        password: ''
      }
    },
    resetFields() {
      this.fields.forEach(item => {
        item.value = ''
      })
    },
    async submit() {
      this.isLoading = true
      this.formMessage = null
      this.resetErrors()
      try {
        if (this.validateFields()) return

        await this.$store.dispatch(PROFILE.ACTION.CHANGE_PASSWORD, {
          old_password: this.fields[0].value,
          new_password: this.fields[1].value
        })

        this.formMessage = 'Your password changed successfully'
        this.resetFields()
      } catch (err) {
        this.formMessage =
          err.response.data.detail === 'wrong old_password'
            ? `Sorry your password hasn't been changed. Wrong old password.`
            : `Sorry your password hasn't been changed. Try again later`
      } finally {
        this.isLoading = false
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
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  @include between-children {
    margin-top: 25px;
  }
}

.input {
  width: 50%;
}

.controller {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.button {
  width: 90px;
}

.delete-account {
  width: 200px;
  background-color: #f27676;
}

.form-message {
  margin-top: 12px;
}
</style>
