'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://172.16.13.21:5000"',
  BACKEND_URL: '"http://172.16.13.21:5000"',
  IP_AGENCY_URL:'"http://172.16.13.21:5100"'
})
