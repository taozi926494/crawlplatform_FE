import request from '@/utils/request'
const querystring = require('querystring')

export function getAllProject() {
  return request({
    url: '/allproject',
    method: 'get'
  })
}


export function apiGetProjectInfo(project_name) {
  return new Promise((resolve, reject) => {
    request({
      url: '/projectinfo',
      method: 'get',
      params: {
        project_name
      }
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}


export function delProject(project_name) {
  return request({
    url: 'delproject',
    method: 'post',
    data: querystring.stringify({
      project_name: project_name
    })
  })
}
