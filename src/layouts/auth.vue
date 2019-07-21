<template>
  <div class="wrapper">
    <div class="auth-layout">
      <div class="center">
        <h1>Citadel</h1>
        <nuxt />
      </div>
      <Footer class="footer" />
    </div>
  </div>
</template>

<script>
import Footer from '@/components/common/footer/Footer'
export default {
  name: 'AuthLayout',
  components: {
    Footer
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/styles/entry.scss';

.wrapper {
  background-color: #f6f5fa;
  background-image: url('~assets/auth/bg.svg');
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: contain;
}

.auth-layout {
  margin: 0 auto;
  max-width: 1440px;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
}

h1 {
  font-family: 'Roboto Slab', sans-serif;
  font-size: 24px;
  font-weight: bold;
  line-height: 0.58;
  color: #40356c;
  margin-bottom: 20px;
}

.footer {
  margin-top: auto;
}
</style>
