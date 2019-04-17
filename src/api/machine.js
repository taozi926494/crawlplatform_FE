import request from '@/utils/request'
const querystring = require('querystring')

export function listmachine() {
  return request({
    url: 'listmachine',
    method: 'get'
  })
}

export function addmachine(machine) {
  return request({
    url: 'addmachine',
    method: 'post',
    data: querystring.stringify({
      server_ip: machine.server_ip,
      server_status: machine.server_status,
      is_master: machine.is_master
    })
  })
}
