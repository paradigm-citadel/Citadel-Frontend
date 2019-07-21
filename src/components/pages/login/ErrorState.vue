<template>
  <div class="error">
    <div class="warning-icon" />
    <p class="error-text">
      We couldn’t find an account matching the username and password you entered. Please check your username and
      password and try again.
    </p>
    <Button class="error-button" @click="$emit('back')">Back</Button>
  </div>
</template>

<script>
import Button from '@/components/ui/Button'
export default {
  name: 'ErrorState',
  components: { Button }
}
</script>

<style lang="scss" scoped>
.error {
  width: 100%;
  padding: 30px 47px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.warning-icon {
  width: 38px;
  height: 34px;
  background: url('~assets/auth/warning.svg');
}

.error-text {
  font-size: 14px;
  line-height: 1.71;
  text-align: center;
  color: #f27676;
  margin: 20px 0 0;
}

.error-button {
  margin-top: 35px;
  background-color: #f27676;
  color: #ffffff;
}
</style>
