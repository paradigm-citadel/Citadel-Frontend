<template>
  <div class="success">
    <p class="success-text">
      We couldn’t find an account matching the email you entered. Please check your email and try again.
    </p>
    <Button class="success-button" @click="$emit('button-click')">Go to sign in</Button>
  </div>
</template>

<script>
import Button from '@/components/ui/Button'
export default {
  components: { Button }
}
</script>

<style lang="scss" scoped>
.success {
  width: 100%;
  padding: 30px 47px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-text {
  font-size: 14px;
  line-height: 1.71;
  text-align: center;
  color: #28a745;
  margin: 54px 0 0;
}

.success-button {
  margin-top: 35px;
  background-color: #28a745;
  color: #ffffff;
}
</style>
