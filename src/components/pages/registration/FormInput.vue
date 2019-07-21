<template>
  <div class="wrapper-input" @click="$emit('focus')">
    <FormInput
      :id="id"
      :value="value"
      :class="{ error: error.length }"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      class="input-feedback"
      @input="$emit('input', $event)"
    />
    <transition name="fade">
      <p v-if="error.length" class="error-text">
        {{ error }}
      </p>
    </transition>
  </div>
</template>

<script>
import FormInput from '@/components/ui/FormInput'
export default {
  name: 'FromInputFeedback',
  components: { FormInput },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelText: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/styles/entry.scss';

.wrapper-input {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  @include between-children {
    margin-top: 10px;
  }
}

.input-feedback {
  transition: 0.3s ease-in-out;
  border-bottom: 4px solid rgba(#f27676, 0);
}

// validation
.error {
  border-bottom: 4px solid #f27676;
}

.error-text {
  font-size: 10px;
  position: absolute;
  right: 0;
  bottom: -20px;
  color: #f27676;
}
</style>
