var spider_list = [{
  project_name: 'opendata_cd',
  project_alias: '共享开放平台-成都市',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 18:30:40',
  status: 'SUCCESS'
},
{
  project_name: 'gwgg_gzsrmzf',
  project_alias: '公文公告-贵州省人民政府',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 22:11:55',
  status: 'SUCCESS'
},
{
  project_name: 'gwgg_gzskjt',
  project_alias: '公文公告-贵州省科技厅',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 23:12:12',
  status: 'SUCCESS'
},
{
  project_name: 'gwgg_gzsfgw',
  project_alias: '公文公告-贵州省发改委',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 16:21:05',
  status: 'SUCCESS'
},
{
  project_name: 'opendata_cd',
  project_alias: '公文公告-贵州省教育厅',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 16:24:33',
  status: 'SUCCESS'
},
{
  project_name: 'opendata_cd',
  project_alias: '共享开放平台-成都市',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 18:30:40',
  status: 'SUCCESS'
},
{
  project_name: 'gwgg_gzsrmzf',
  project_alias: '公文公告-贵州省人民政府',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 22:11:55',
  status: 'SUCCESS'
},
{
  project_name: 'gwgg_gzskjt',
  project_alias: '公文公告-贵州省科技厅',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 23:12:12',
  status: 'SUCCESS'
},
{
  project_name: 'gwgg_gzsfgw',
  project_alias: '公文公告-贵州省发改委',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 16:21:05',
  status: 'SUCCESS'
},
{
  project_name: 'opendata_cd',
  project_alias: '公文公告-贵州省教育厅',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 16:24:33',
  status: 'SUCCESS'
},
{
  project_name: 'opendata_cd',
  project_alias: '共享开放平台-成都市',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 18:30:40',
  status: 'SUCCESS'
},
{
  project_name: 'gwgg_gzsrmzf',
  project_alias: '公文公告-贵州省人民政府',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 22:11:55',
  status: 'SUCCESS'
},
{
  project_name: 'gwgg_gzskjt',
  project_alias: '公文公告-贵州省科技厅',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 23:12:12',
  status: 'SUCCESS'
},
{
  project_name: 'gwgg_gzsfgw',
  project_alias: '公文公告-贵州省发改委',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 16:21:05',
  status: 'SUCCESS'
},
{
  project_name: 'opendata_cd',
  project_alias: '公文公告-贵州省教育厅',
  spider_name: 'main',
  spider_alias: '主爬虫',
  last_runtime: '2018-10-12 16:24:33',
  status: 'SUCCESS'
}
]

var hot_hours = ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

function near7Days() {
  const days = []
  for (let i = 7; i > 0; i--) {
    const myDate = new Date(new Date() - i * 60 * 60 * 24 * 1000)
    days.push(Number(myDate.getMonth() + 1) + '/' + myDate.getDate())
  }
  return days
}

function formatDate(date, fmt) { // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))}
  for (var k in o)
  {
 if (new RegExp('(' + k + ')').test(fmt))
    {fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));}
 }
  return fmt
}

function genRunTimeData() {
  spider_list.map((ele) => {
    const myDate = new Date(new Date() - Math.random() * 60 * 60 * 24 * 1000)
    ele.last_runtime = formatDate(myDate, 'MM-dd hh:mm:ss')
  })
  return spider_list
}

var hot_data = [
  [0, 0, 5],
  [0, 1, 1],
  [0, 2, 0],
  [0, 3, 0],
  [0, 4, 0],
  [0, 5, 0],
  [0, 6, 0],
  [0, 7, 0],
  [0, 8, 0],
  [0, 9, 0],
  [0, 10, 0],
  [0, 11, 2],
  [0, 12, 4],
  [0, 13, 1],
  [0, 14, 1],
  [0, 15, 3],
  [0, 16, 4],
  [0, 17, 6],
  [0, 18, 4],
  [0, 19, 4],
  [0, 20, 3],
  [0, 21, 3],
  [0, 22, 2],
  [0, 23, 5],
  [1, 0, 7],
  [1, 1, 0],
  [1, 2, 0],
  [1, 3, 0],
  [1, 4, 0],
  [1, 5, 0],
  [1, 6, 0],
  [1, 7, 0],
  [1, 8, 0],
  [1, 9, 0],
  [1, 10, 5],
  [1, 11, 2],
  [1, 12, 2],
  [1, 13, 6],
  [1, 14, 9],
  [1, 15, 11],
  [1, 16, 6],
  [1, 17, 7],
  [1, 18, 8],
  [1, 19, 12],
  [1, 20, 5],
  [1, 21, 5],
  [1, 22, 7],
  [1, 23, 2],
  [2, 0, 1],
  [2, 1, 1],
  [2, 2, 0],
  [2, 3, 0],
  [2, 4, 0],
  [2, 5, 0],
  [2, 6, 0],
  [2, 7, 0],
  [2, 8, 0],
  [2, 9, 0],
  [2, 10, 3],
  [2, 11, 2],
  [2, 12, 1],
  [2, 13, 9],
  [2, 14, 8],
  [2, 15, 10],
  [2, 16, 6],
  [2, 17, 5],
  [2, 18, 5],
  [2, 19, 5],
  [2, 20, 7],
  [2, 21, 4],
  [2, 22, 2],
  [2, 23, 4],
  [3, 0, 7],
  [3, 1, 3],
  [3, 2, 0],
  [3, 3, 0],
  [3, 4, 0],
  [3, 5, 0],
  [3, 6, 0],
  [3, 7, 0],
  [3, 8, 1],
  [3, 9, 0],
  [3, 10, 5],
  [3, 11, 4],
  [3, 12, 7],
  [3, 13, 14],
  [3, 14, 13],
  [3, 15, 12],
  [3, 16, 9],
  [3, 17, 5],
  [3, 18, 5],
  [3, 19, 10],
  [3, 20, 6],
  [3, 21, 4],
  [3, 22, 4],
  [3, 23, 1],
  [4, 0, 1],
  [4, 1, 3],
  [4, 2, 0],
  [4, 3, 0],
  [4, 4, 0],
  [4, 5, 1],
  [4, 6, 0],
  [4, 7, 0],
  [4, 8, 0],
  [4, 9, 2],
  [4, 10, 4],
  [4, 11, 4],
  [4, 12, 2],
  [4, 13, 4],
  [4, 14, 4],
  [4, 15, 14],
  [4, 16, 12],
  [4, 17, 1],
  [4, 18, 8],
  [4, 19, 5],
  [4, 20, 3],
  [4, 21, 7],
  [4, 22, 3],
  [4, 23, 0],
  [5, 0, 2],
  [5, 1, 1],
  [5, 2, 0],
  [5, 3, 3],
  [5, 4, 0],
  [5, 5, 0],
  [5, 6, 0],
  [5, 7, 0],
  [5, 8, 2],
  [5, 9, 0],
  [5, 10, 4],
  [5, 11, 1],
  [5, 12, 5],
  [5, 13, 10],
  [5, 14, 5],
  [5, 15, 7],
  [5, 16, 11],
  [5, 17, 6],
  [5, 18, 0],
  [5, 19, 5],
  [5, 20, 3],
  [5, 21, 4],
  [5, 22, 2],
  [5, 23, 0],
  [6, 0, 1],
  [6, 1, 0],
  [6, 2, 0],
  [6, 3, 0],
  [6, 4, 0],
  [6, 5, 0],
  [6, 6, 0],
  [6, 7, 0],
  [6, 8, 0],
  [6, 9, 0],
  [6, 10, 1],
  [6, 11, 0],
  [6, 12, 2],
  [6, 13, 1],
  [6, 14, 3],
  [6, 15, 4],
  [6, 16, 0],
  [6, 17, 0],
  [6, 18, 0],
  [6, 19, 0],
  [6, 20, 1],
  [6, 21, 2],
  [6, 22, 2],
  [6, 23, 6]
]
var class_data = [{
  value: 335,
  name: '政府公文公告',
  itemStyle: {
    color: '#7CB7D9'
  }
},
{
  value: 310,
  name: '政府数据开放平台',
  itemStyle: {
    color: '#7CB7D9'
  }
},
{
  value: 274,
  name: '互联网主题-餐饮',
  itemStyle: {
    color: '#7CB7D9'
  }
},
{
  value: 235,
  name: '互联网主题-休闲',
  itemStyle: {
    color: '#7CB7D9'
  }
},
{
  value: 400,
  name: '其他',
  itemStyle: {
    color: '#7CB7D9'
  }
}
]

export {
  spider_list,
  hot_hours,
  hot_data,
  class_data,
  near7Days,
  genRunTimeData
}
