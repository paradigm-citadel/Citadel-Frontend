<template>
  <div class="footer">
    <div class="links">
      <Link class="link" link="https://google.com" external>Rules service</Link>
      <Link class="link" link="https://google.com" external>
        Privacy Policy Service
      </Link>
    </div>
    <p class="copyright">Citadel © 2019</p>
  </div>
</template>

<script>
import Link from '@/components/ui/Link'
export default {
  name: 'Footer',
  components: { Link }
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 0 70px 30px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.copyright {
  font-size: 12px;
  line-height: 0.83;
  color: #656565;
}

.link {
  font-size: 12px;
  line-height: 0.83;
  text-decoration: none;
  color: #40356c;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
}
</style>
