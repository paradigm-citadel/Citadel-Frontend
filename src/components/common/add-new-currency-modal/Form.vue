<template>
  <form class="wallet-form" @submit.prevent="submit">
    <div class="types">
      <FormInput v-model="address" placeholder="Address" />
      <SelectBox v-model="currency" :items="networks" class="select-box" placeholder="Select network" />
    </div>
    <Button :disabled="!address.length || currency === -1" type="submit" class="add-address-button">Add address</Button>
  </form>
</template>

<script>
import { ADD_NEW_ADDRESS, NETWORK } from '@/store/types'
import FormInput from '@/components/ui/FormInput'
import SelectBox from '@/components/ui/SelectBox'
import Button from '@/components/ui/Button'

export default {
  name: 'Form',
  components: { FormInput, SelectBox, Button },
  computed: {
    networks() {
      return this.$store.getters[NETWORK.GETTER.LIST_FOR_ADD_MODAL]
    },
    fields() {
      return this.$store.getters[ADD_NEW_ADDRESS.GETTER.GET_FIELDS]
    },
    currency: {
      set(value) {
        this.changeField('currency', value)
      },
      get() {
        return this.fields.currency
      }
    },
    address: {
      set(value) {
        this.changeField('address', value)
      },
      get() {
        return this.fields.address
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch(ADD_NEW_ADDRESS.ACTION.SUBMIT)
    },
    changeField(fieldName, value) {
      this.$store.commit(ADD_NEW_ADDRESS.MUTATION.CHANGE_FIELD, { field: fieldName, value })
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-form {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.types {
  display: flex;
  width: 100%;
  margin-bottom: 20px;

  & > .select-box {
    margin-left: 20px;
    width: 70%;
  }
}

.add-address-button {
  margin: 20px 0;
}
</style>
