<template>
  <div class="error-box">
    <p class="error-text">This address already exists</p>
    <Button class="add-address-button" @click="resetError">Back</Button>
  </div>
</template>

<script>
import Button from '@/components/ui/Button'
import { ADD_NEW_ADDRESS } from '@/store/types'

export default {
  name: 'Feedback',
  components: { Button },
  methods: {
    resetError() {
      this.$store.commit(ADD_NEW_ADDRESS.MUTATION.SET_IS_ERROR, false)
    }
  }
}
</script>

<style lang="scss" scoped>
.add-address-button {
  margin: 20px 0;
}

.error-box {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.error-text {
  font-size: 14px;
  line-height: 1.71;
  text-align: center;
  color: #f27676;
}
</style>
