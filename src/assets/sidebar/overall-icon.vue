<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24">
    <path
      ref="path"
      fill="currentColor"
      fill-rule="nonzero"
      d="
        M5.538 6.375v1.114a187.9 187.9 0 0 1-.426.43C2.48 10.563 0 13.076 0 17.625c0 2.42.94 4.17 2.793 5.2C4.236 23.627 6.208 24 9 24s4.764-.373 6.207-1.175c1.853-1.03 2.793-2.78 2.793-5.2 0-4.408-2.288-6.876-5.082-9.678l-.456-.458v-.405l1.662 1.26a.685.685 0 0 0 .97-.142.71.71 0 0 0-.141-.984l-2.04-1.546h3.01a.698.698 0 0 0 .692-.703.698.698 0 0 0-.692-.703H11.83l1.524-2.67a.713.713 0 0 0 .044-.614.697.697 0 0 0-.45-.413A13.934 13.934 0 0 0 9 0C7.658 0 6.33.191 5.052.569a.696.696 0 0 0-.45.413c-.078.201-.062.428.045.615L6.4 4.667a2.118 2.118 0 0 0-.862 1.708zm.767-4.678a12.604 12.604 0 0 1 5.39 0l-1.467 2.569H7.772l-1.467-2.57zm4.772 4.678v.703H6.923v-.703c0-.388.31-.703.692-.703h2.77a.7.7 0 0 1 .692.703zm-4.56 2.11h4.966l.462.463c2.506 2.512 4.67 4.682 4.67 8.677 0 1.92-.658 3.18-2.073 3.967-1.23.683-2.991 1.002-5.542 1.002-2.55 0-4.312-.319-5.542-1.002-1.415-.786-2.073-2.047-2.073-3.967 0-3.985 2.178-6.173 4.7-8.706l.432-.435z
      "
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
      if (this.routing === '/currency/overall' || this.routing === '/currency/overall/') {
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
