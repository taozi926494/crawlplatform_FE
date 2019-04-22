import request from '@/utils/request'
const querystring = require('querystring')


// 获取所有开发人员列表
export function apiListDevelopers() {
  return new Promise((resolve, reject) => {
    request({
      url: 'listdeveloper',
      method: 'get'
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

// 添加开发人员
export function apiAddDevelopers(developer) {
  return new Promise((resolve, reject) => {
    request({
      url: 'adddeveloper',
      method: 'post',
      data: querystring.stringify({
        developer_name: developer.developer_name,
        developer_role: developer.developer_role,
        developer_status: developer.developer_status
      })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

// 删除人员
export function apiDelDeveloper(developer_name) {
  return new Promise((resolve, reject) => {
    request({
      url: 'deldeveloper',
      method: 'get',
      params: {
        developer_name
      }
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}



// 编辑开发人员
export function apiEditDeveloper(developer) {
  return new Promise((resolve, reject) => {
    request({
      url: 'updatedeveloper',
      method: 'get',
      params: {
        'id': developer.id,
        'developer_name': developer.developer_name,
        'developer_role': developer.developer_role,
        'developer_status': developer.developer_status,
      }
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}



