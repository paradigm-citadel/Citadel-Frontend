<template>
  <div class="polls">
    <div class="content-polls">
      <h1 class="title-settings purple bold title">Polls</h1>
      <ContentPolls />
    </div>
  </div>
</template>

<script>
import ContentPolls from './ContentPolls'
export default {
  name: 'PollsPage',
  components: { ContentPolls }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';
.polls {
  display: flex;
  margin: 120px auto 40px;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  max-width: 860px;
}

.content-polls {
  display: flex;
  flex-direction: column;
  @include between-children {
    margin-top: 30px;
  }
}
</style>
