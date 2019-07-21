<template>
  <PollsPage />
</template>

<script>
import PollsPage from '@/components/pages/polls/PollsPage'
import { POLLS } from '@/store/types'
export default {
  name: 'PollsEntry',
  layout: 'default-with-back-button',
  components: { PollsPage },
  mounted() {
    this.$store.dispatch(POLLS.ACTION.LOAD_POLLS)
  }
}
</script>
