const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: prod ? false : true,
    runtimeCaching,
  },
})