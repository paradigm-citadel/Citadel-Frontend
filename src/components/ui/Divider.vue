<template>
  <ColorLine class="divider" color="#eeeeee" :height="1" />
</template>

<script>
import ColorLine from '@/components/ui/ColorLine'
export default {
  name: 'Divider',
  components: { ColorLine }
}
</script>

<style lang="scss" scoped>
.divider {
  margin: 20px 0 20px;
}
</style>
