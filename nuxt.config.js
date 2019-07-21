process.env.BACKEND_URL = process.env.BACKEND_URL || 'http://207.154.207.71:8014'

module.exports = {
  mode: 'spa',
  dev: process.env.NODE_ENV !== 'production',
  srcDir: 'src',
  router: {
    middleware: 'check-auth'
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  },
  plugins: ['~/plugins/api.js', '~/plugins/hcharts.js', `~/plugins/check-wallets.js`, `~/plugins/pagination.js`],
  head: {
    title: 'Citadel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Cryptocurrency wallet data aggregation'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: 'https://fonts.googleapis.com/css?family=Roboto+Slab:700|Roboto:300,400,500',
        rel: 'stylesheet'
      }
    ]
    // Не надо полифилы, они уже встроенны в nuxt, версия обновилась. Теперь только по надобности
  },
  loading: { color: '#fff' },
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.devtool = process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'eval-source-map'
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
