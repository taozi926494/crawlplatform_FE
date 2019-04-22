import request from '@/utils/request'
const querystring = require('querystring')

// 获取所有蜘蛛运行情况
export function getAllSpider() {
  return request({
    url: '/allspider',
    method: 'get'
  })
}

export function addScheduler(spider) {
  return request({
    url: '/addscheduler',
    method: 'post',
    data: querystring.stringify({
      project_id: spider.project_id,
      spider_name: spider.spider_name,
      spider_arguments: spider.spider_arguments,
      priority: spider.priority,
      daemon: spider.daemon,
      cron_month: spider.cron_month,
      cron_day_of_month: spider.cron_day_of_month,
      cron_day_of_week: spider.cron_day_of_week,
      cron_hour: spider.cron_hour,
      cron_minutes: spider.cron_minutes,
      run_type: 'periodic'
    })
  })
}

export function runOnce(project_id, spider_name) {
  return request({
    url: '/runonce',
    method: 'post',
    data: querystring.stringify({
      project_id: project_id,
      spider_name: spider_name,
      spider_arguments: '',
      daemon: 'auto',
      priority: 0
    })
  })
}

export function apiCancelspider(project_id, project_name,index) {
  return new Promise((resolve, reject) => {
    request({
      url: '/cancelspider',
      method: 'post',
      data: querystring.stringify({
        project_id: project_id,
        project_name: project_name,
        index:index
        
        
      })
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}



export function getMasterLog(project_id, job_exec_id) {
  return request({
    url: '/masterlog',
    method: 'get',
    params: {
      project_id,
      job_exec_id
    }
  })
}

export function getSlaveLog(project_id, job_exec_id) {
  return request({
    url: '/slavelog',
    method: 'get',
    params: {
      project_id,
      job_exec_id
    }
  })
}
