<template>
  <Block class="block" shadowed without-padding>
    <FormState />
    <Link class="sign-in-link" link="/login">Sign in</Link>
    <Divider />
    <div class="wrapper-text">
      <AuthFooter />
    </div>
  </Block>
</template>

<script>
import AuthFooter from '@/components/common/auth/AuthFooter'
import FormState from '@/components/pages/recovery/FormState'
import Block from '@/components/ui/Block'
import Divider from '@/components/ui/Divider'
import Link from '@/components/ui/Link'

export default {
  name: 'RecoveryPage',
  components: { FormState, AuthFooter, Divider, Link, Block }
}
</script>

<style lang="scss" scoped>
.block {
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
}

.sign-in-link {
  font-size: 13px;
  line-height: 1.08;
  text-decoration: underline;
  margin-bottom: 30px;
  margin-top: 20px;
  color: #40356c;
}

.wrapper-text {
  width: 100%;
  padding: 0 20px;
}
</style>
