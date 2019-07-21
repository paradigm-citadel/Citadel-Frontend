<template>
  <div class="wrapper-link">
    <Link :link="link" class="menu-item" exact>
      <p class="text-link">{{ title }}</p>
    </Link>
  </div>
</template>

<script>
import Link from '@/components/ui/Link'

export default {
  name: 'SidebarMenuItem',
  components: { Link },
  props: {
    link: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';
.wrapper-link {
  display: flex;
  width: 100%;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}
.menu-item {
  background: #fff;
  display: flex;
  padding: 13px 10px 13px 92px;
  width: 100%;
  height: 100%;
  min-height: 52px;

  &.nuxt-link-active,
  &:hover {
    background-color: #524493;
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

.text-link {
  display: flex;
  align-items: center;
  transition: 0.3s ease-in-out;
  color: #9d9d9d;
  font-size: 14px;
}
</style>
