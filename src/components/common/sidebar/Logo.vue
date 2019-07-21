<template>
  <div class="logo">
    <Link :link="`/`" class="purple logo-text">Citadel</Link>
  </div>
</template>

<script>
import Link from '@/components/ui/Link'
export default {
  name: 'Logo',
  components: { Link }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/entry.scss';

.logo {
  text-align: center;
  padding: 20px 0;
  cursor: pointer;
  border-bottom: 1px solid #f6f5fa;
}
.logo-text {
  font-size: 24px;
  font-weight: bold;
  line-height: 0.58;
}

a:hover {
  opacity: 1;
}
</style>
