<template>
  <div class="second-menu">
    <Link v-for="(item, index) in links" :key="index" :link="item.link" class="menu-item">
      <PollsIcon v-if="item.title === 'Polls'" class="svg-icon" />
      <div
        v-else
        class="icon div-img"
        :style="{ backgroundImage: `url('${item.icon || 'http://via.placeholder.com/24?text=C'}')` }"
      />
      <p class="text-link">{{ item.title }}</p>
    </Link>
  </div>
</template>

<script>
import PollsIcon from '@/assets/sidebar/polls-icon.vue'
import Link from '@/components/ui/Link'
export default {
  name: 'SecondMenu',
  components: { Link, PollsIcon },
  computed: {
    links() {
      return [
        {
          id: 1,
          link: '/currency/polls',
          title: 'Polls'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.second-menu {
  display: flex;
  flex-direction: column;
  width: 290px;
  margin-top: 21px;
}
.menu-item {
  display: flex;
  padding: 13px 10px 13px 43px;
  width: 100%;
  height: 100%;
  min-height: 52px;
  border-bottom: 1px solid #f6f5fa;
  border-top: 1px solid #f6f5fa;

  &.nuxt-link-active,
  &:hover {
    background-color: #524493;
    border-bottom: 1px solid #524493;
    border-top: 1px solid #524493;

    opacity: 1;

    svg {
      path {
        color: #fff;
      }
    }

    & .text-link {
      color: #fff;
    }
  }
}

.icon {
  display: flex;
  flex-shrink: 0;
  width: 18px;
  height: 24px;
  margin-right: 33px;
}

.text-link {
  display: flex;
  align-items: center;
  transition: 0.3s ease-in-out;
  color: #9d9d9d;
  font-size: 14px;
}
</style>

<style lang="scss">
.menu-item {
  &:hover {
    .svg-icon {
      path {
        color: #fff !important;
      }
    }
  }
}
</style>
