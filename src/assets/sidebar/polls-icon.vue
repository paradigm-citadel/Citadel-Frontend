<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24">
    <path
      ref="path"
      fill="currentColor"
      fill-rule="nonzero"
      d="M.638 10.777h5.82c.353 0 .638.285.638.637v11.907a.637.637 0 0 1-.637.638H.638A.637.637 0 0 1 0 23.32V11.414c0-.352.285-.637.638-.637zM9.108.637A.64.64 0 0 1 9.74 0h5.826c.353 0 .638.285.638.638V23.32a.637.637 0 0 1-.638.638h-5.82a.637.637 0 0 1-.638-.638V.638zm15.56 23.316v.006h-5.82a.637.637 0 0 1-.638-.638V8.04c0-.353.285-.638.638-.638h5.82c.353 0 .638.285.638.638v15.276a.637.637 0 0 1-.637.637z"
    />
  </svg>
</template>

<script>
export default {
  computed: {
    routing() {
      return this.$route.path
    }
  },
  watch: {
    routing() {
      this.activeIcon()
    }
  },
  mounted() {
    this.activeIcon()
  },
  methods: {
    activeIcon() {
      if (this.routing === '/currency/polls' || this.routing === '/currency/polls/') {
        return (this.$refs.path.style.color = '#fff')
      }
      this.$refs.path.style.color = 'rgb(82, 68, 147)'
    }
  }
}
</script>

<style lang="scss">
svg {
  margin-right: 33px !important;
}

path {
  transition: 0.3s ease-in-out;
}
</style>
