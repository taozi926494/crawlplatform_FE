import request from '@/utils/request'

// 日志分析接口
export function apiLogMonitor() {
  return new Promise((resolve, reject) => {
    request({
      url: 'logmanage',
      method: 'get'
    }).then((res) => {
      resolve(res)
    }).catch((e) => {
      reject(e)
    })
  })
}
