<template>
  <Block class="block" shadowed without-padding>
    <FormState />
    <Link class="forgot-link" link="/recovery">Forgot Password?</Link>
    <Divider />
    <Link class="signup-link" link="/registration">Sign up</Link>
    <div class="wrapper-text">
      <AuthFooter />
    </div>
  </Block>
</template>

<script>
import FormState from '@/components/pages/login/FormState'
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
}

.forgot-link {
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 13px;
  line-height: 1.08;
  color: #40356c;
  text-decoration: underline;
}

.signup-link {
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
