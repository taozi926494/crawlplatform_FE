import request from '@/utils/request_ip'
const querystring = require('querystring')

// 查询
export function apiListAgency() {
  return new Promise((resolve, reject) => {
    request({
      url: 'list_proxy_provider',
      method: 'get'
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

// 添加
export function apiAddAgency(pms) {
  var temp = []
  const len = pms.params.length
  for (var i = 0; i < len; i++) {
    var key = pms.params[i]['name']
    var value = pms.params[i]['value']
    var _dict = {}
    _dict[key] = value
    temp.push(_dict)
  }
  return new Promise((resolve, reject) => {
    request({
      url: 'add_proxy_provider',
      method: 'post',
      data: querystring.stringify({
        ip_provider: pms.ip_provider,
        conf_url: pms.conf_url,
        method: pms.method,
        ip_num: pms.ip_num,
        obtain_num: pms.obtain_num,
        live_time: pms.live_time,
        params: JSON.stringify(temp)
      })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

// 编辑
export function apiEditAgency(pms) {
  var temp = []
  const len = pms.params.length
  for (var i = 0; i < len; i++) {
    var key = pms.params[i]['name']
    var value = pms.params[i]['value']
    var _dict = {}
    _dict[key] = value
    temp.push(_dict)
  }
  return new Promise((resolve, reject) => {
    request({
      url: 'edit_proxy_provider',
      method: 'post',
      data: querystring.stringify({
        id: pms.id,
        ip_provider: pms.ip_provider,
        conf_url: pms.conf_url,
        method: pms.method,
        ip_num: pms.ip_num,
        obtain_num: pms.obtain_num,
        live_time: pms.live_time,
        params: JSON.stringify(temp)
      })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}
// 删除
export function apiDelAgency(id) {
  console.log(id)
  return new Promise((resolve, reject) => {
    request({
      url: 'delete_proxy_provider',
      method: 'get',
      params: {
        id: id
      }
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}
