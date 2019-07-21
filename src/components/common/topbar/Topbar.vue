<template>
  <div class="top-bar">
    <div class="first-line">
      <div class="left">
        <div v-if="withBack" class="go-back" @click="$router.back()">
          <div class="arrow" />
          <span>Go Back</span>
        </div>
      </div>
      <Picker />
      <div class="right">
        <Link link="/settings" class="wrapper-link">
          <div class="icon div-img" />
        </Link>
        <Button class="logout" dashed @click="logout">Logout</Button>
      </div>
    </div>
    <div v-if="initializingWallets.length > 0" class="second-line">
      <div class="div-img clock" />
      <p class="second-line-text">
        Wallet {{ getFirstAddress }}
        {{ initializingWallets.length > 1 ? `and ${initializingWallets.length - 1} more` : '' }} information is loading…
      </p>
    </div>
  </div>
</template>

<script>
import Picker from '@/components/common/topbar/Picker'
import Button from '@/components/ui/Button'
import Link from '@/components/ui/Link'
import { AUTH, WALLET } from '@/store/types'

export default {
  name: 'Topbar',
  components: { Button, Picker, Link },
  props: {
    withBack: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    initializingWallets() {
      return this.$store.getters[WALLET.GETTER.GET_INITIALIZING]
    },
    getFirstAddress() {
      if (this.initializingWallets.length > 0) return this.initializingWallets[0].address
      return ''
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH.ACTION.LOGOUT)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  flex-direction: column;
  left: 0;
  width: 100%;
}

.first-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin-left: 290px;
  width: calc(100% - 290px);
  padding: 0 70px;
  background-color: #f6f5fa;
  border-bottom: 1px solid #ebe9f1;
}
.second-line {
  height: 54px;
  display: flex;
  align-items: center;
  padding: 0 110px;
  margin-left: 290px;
  width: calc(100% - 290px);
  background-color: #eae7f5;

  &-text {
    margin-left: 10px;
    font-size: 13px;
    font-weight: 300;
    line-height: 1.38;
    color: #222222;
  }
}

.clock {
  background-image: url('~assets/ui/clock.svg');
  background-size: 36px 34px;
  width: 36px;
  height: 34px;
}

.wrapper-link {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 24px;
  border-bottom: 3px solid rgba(#524493, 0);
  opacity: 0.7;
  margin-left: 20px;

  &:hover,
  &.nuxt-link-active {
    border-bottom: 3px solid #524493;
    opacity: 1;
  }

  &:first-of-type {
    margin-left: 0;
  }
}

.logout {
  padding: 4px 20px 5px;
  height: 24px;
  color: #40356c;
  margin-left: 20px;
}

.right {
  display: flex;
  height: 100%;
  align-items: center;
}

.go-back {
  cursor: pointer;
  display: flex;
  .arrow {
    width: 10px;
    height: 10px;
    border-left: #524493 2px solid;
    border-top: #524493 2px solid;
    transform: rotate(-45deg);
  }
  span {
    transform: translateY(-1px);
    margin-left: 10px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #40356c;
  }
}

.icon {
  display: flex;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background-image: url('~assets/ui/settings.svg');
}
</style>
