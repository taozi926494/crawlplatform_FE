import request from '@/utils/request'
const querystring = require('querystring')

export function getAllProject(pageIndex, pageSzie) {
  return request({
    url: '/allproject',
    method: 'get',
    params: {pageIndex, pageSzie}
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

export function apiEditProjectInfo(form) {
  return new Promise((resolve, reject) => {
    request({
      url: 'editproject',
      method: 'post',
      data: querystring.stringify(form)
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}

export function apiFasterScrapy(form) {
  return request({
    url: 'fasterscrapy',
    method: 'post',
    data: querystring.stringify({
        projectName: form['projectName'],
        spiderName: form['spiderName'],
        dbAddress: form['dbAddress'],
        dbName: form['dbName'],
        dbUserName: form['dbUserName'],
        dbPassword: form['dbPassword'],
        bdTableName: form['bdTableName'],
        bdTableComment: form['bdTableComment'],
        dataType: form['dataType'],
        items: JSON.stringify(form['items'])
    })
  })
}
