<template>
  <a v-if="external" :href="link" rel="noopener noreferer" target="_blank" v-on="$listeners">
    <slot />
  </a>
  <nuxt-link v-else :to="link" :exact="exact" v-on="$listeners"><slot /></nuxt-link>
</template>

<script>
export default {
  name: 'Link',
  props: {
    link: {
      type: String,
      default: ''
    },
    external: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
}
</script>
