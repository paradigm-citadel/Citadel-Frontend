<template>
  <Block class="block" shadowed without-padding>
    <FormState />
    <Divider />
    <Link class="signin-link" link="/login">Sign in</Link>
    <div class="wrapper-text">
      <AuthFooter />
    </div>
  </Block>
</template>

<script>
import FormState from '@/components/pages/registration/FormState'
import AuthFooter from '@/components/common/auth/AuthFooter'
import Block from '@/components/ui/Block'
import Divider from '@/components/ui/Divider'
import Link from '@/components/ui/Link'

export default {
  name: 'LoginPage',
  components: { AuthFooter, FormState, Link, Divider, Block }
}
</script>

<style lang="scss" scoped>
.block {
  width: 420px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signin-link {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.17;
  color: #000000;
}

.wrapper-text {
  width: 100%;
  padding: 0 20px;
}
</style>
