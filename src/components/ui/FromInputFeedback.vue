<template>
  <div class="wrapper-input">
    <label v-if="labelText.length" :for="id">
      <p class="text grey">{{ labelText }}</p>
      <FormInput
        :id="id"
        :value="value"
        :class="{ error: error.length }"
        :disabled="disabled"
        :placeholder="placeholder"
        :type="type"
        class="input-feedback"
        @input="$emit('input', $event)"
        @focus="$emit('focus')"
      />
      <transition name="fade">
        <p v-if="error.length" :class="{ long: feedBackPosition, short: !feedBackPosition }">
          {{ error }}
        </p>
      </transition>
    </label>
  </div>
</template>

<script>
import FormInput from './FormInput'
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
    },
    feedBackPosition: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/styles/entry.scss';

.wrapper-input {
  display: flex;
  flex-direction: column;
  @include between-children {
    margin-top: 10px;
  }
}

label {
  position: relative;
}

.input-feedback {
  transition: 0.3s ease-in-out;
  border-bottom: 4px solid rgba(#f27676, 0);
  margin-top: 10px;
}

// validation
.error {
  border-bottom: 4px solid #f27676;
}

.short {
  font-size: 10px;
  position: absolute;
  right: 0;
  bottom: -20px;
  color: #f27676;
}

.long {
  font-size: 13px;
  position: absolute;
  right: calc(-50% - 20px);
  top: calc(50% + 5px);
  color: #656565;
  line-height: 1.54;
  font-weight: 300;
  width: 50%;
}
</style>
