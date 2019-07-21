<template>
  <div class="wrapper-link">
    <Link
      :link="`${link}`"
      :class="{ 'menu-item': true, 'has-sub-items': !!subItems && subItems.length > 1 }"
      @click.native="$emit('select', currency)"
    >
      <OverallIcon v-if="title === 'Overall'" class="svg-icon" />
      <div
        v-else
        class="icon div-img"
        :style="{ backgroundImage: `url('${icon || 'http://via.placeholder.com/24?text=C'}')` }"
      />
      <p class="text-link">{{ title }}</p>
      <MenuItemArrow v-if="subItems && subItems.length > 1" :opened="isOpen" />
    </Link>
    <div v-if="isOpen && subItems && subItems.length > 1" class="sub-items">
      <SidebarMenuSubItem title="Overall" :link="`${link}`" />
      <SidebarMenuSubItem v-for="item in subItems" :key="item.pk" :title="item.title" :link="`${link}/${item.pk}`" />
    </div>
  </div>
</template>

<script>
import OverallIcon from '@/assets/sidebar/overall-icon.vue'
import Link from '@/components/ui/Link'
import SidebarMenuSubItem from './SidebarMenuSubItem.vue'
import MenuItemArrow from './MenuItemArrow.vue'

export default {
  name: 'SidebarMenuItem',
  components: { Link, OverallIcon, SidebarMenuSubItem, MenuItemArrow },
  props: {
    icon: {
      type: [String, Object],
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    subItems: {
      type: Array,
      default: () => null
    },
    currency: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
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
  flex-direction: column;
}
.menu-item {
  display: flex;
  padding: 13px 10px 13px 43px;
  width: 100%;
  height: 100%;
  min-height: 52px;
  border-bottom: 1px solid #f6f5fa;
  border-top: 1px solid #f6f5fa;
  align-items: center;

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

    & .arrow /deep/ path {
      fill: #fff;
    }
  }

  &.nuxt-link-active.has-sub-items {
    background-color: #fff;
    border-bottom: 1px solid #f6f5fa;
    border-top: 1px solid #f6f5fa;
    opacity: 1;

    & .text-link {
      color: #000;
    }

    & .arrow /deep/ path {
      fill: #40356c;
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
  flex: 1;
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
