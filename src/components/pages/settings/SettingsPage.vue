<template>
  <div class="settings">
    <div class="content-settings">
      <h1 class="title-settings purple bold title">Account Settings</h1>
      <History />
      <Email />
      <Password />
    </div>
  </div>
</template>

<script>
import History from './History'
import Email from './Email'
import Password from './Password'
export default {
  name: 'SettingsPage',
  components: { History, Email, Password }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';
.settings {
  display: flex;
  margin: 120px auto 40px;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  max-width: 860px;
}

.content-settings {
  display: flex;
  flex-direction: column;
  @include between-children {
    margin-top: 30px;
  }
}
</style>
