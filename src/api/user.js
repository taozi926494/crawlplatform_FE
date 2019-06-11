import request from '@/utils/request'
const querystring = require('querystring')

export function regist(username, email, password) {
  return request({
    url: '/regist',
    method: 'post',
    data: querystring.stringify({
      username,
      email,
      password
    })
  })
}

export function login(username, password) {
  return request({
    url: '/sys/log',
    method: 'post',
    data: querystring.stringify({
      username,
      password
    })
  })
}

export function getInfo(token) {
  return request({
    url: '/userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
