import request from '@/utils/request'
const querystring = require('querystring')

export function getAllProject() {
  return request({
    url: '/allproject',
    method: 'get'
  })
}

export function getProjectInfo(project_name) {
  return request({
    url: '/projectinfo',
    method: 'get',
    params: {
      project_name
    }
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
