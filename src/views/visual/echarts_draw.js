var echarts = require('echarts')

// 爬虫分类饼状图
var draw_crawl_class = function(id, class_data) {
  var crawl_class_chart = echarts.init(document.getElementById(id))
  var option = option = {
    title: {
      text: '爬虫分类',
      left: 'center',
      top: 20,
      textStyle: { color: '#1DE5BB' }
    },
    color: ['red', 'green', 'yellow', 'blueviolet', 'white'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: { colorLightness: [0, 1] }
    },
    series: [
      {
        name: '爬虫分类',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: class_data.sort(function(a, b) { return a.value - b.value }),
        roseType: 'radius',
        labelLine: {
          normal: {
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function(idx) {
          return Math.random() * 200
        }
      }
    ]
  }
  crawl_class_chart.setOption(option)
}

// 热力图
var draw_hot = function(id, hot_hours, hot_days, _hot_data) {
  var crawl_hot_chart = echarts.init(document.getElementById(id))
  var hot_data = _hot_data.map(function(item) {
    return [item[1], item[0], item[2]]
  })
  var option = {
    tooltip: { position: 'top' },
    animation: false,
    grid: {
      height: '65%',
      y: '15%'
    },
    xAxis: {
      type: 'category',
      data: hot_hours,
      splitArea: { show: true },
      axisLabel: { color: '#7CB7D9' }
    },
    yAxis: {
      type: 'category',
      data: hot_days,
      splitArea: { show: true },
      axisLabel: { color: '#7CB7D9' }
    },
    visualMap: {
      min: 0,
      max: 10,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      inRange: {
        color: ['#000', '#1DE5BB']
      }
    },
    series: [{
      name: '爬虫调度热力图',
      type: 'heatmap',
      data: hot_data,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
  crawl_hot_chart.setOption(option)
}

var draw_rutime = function(id, date) {
  var runtime_chart = echarts.init(document.getElementById(id))
  var option = {
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: { color: '#7CB7D9' }
      },
      data: date
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: { color: '#7CB7D9' }
      },
      splitLine: {
        lineStyle: { color: '#333' }
      }
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  }
  runtime_chart.setOption(option)
}

var draw_rank = function(id) {
  var rank = echarts.init(document.getElementById(id))
  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    barWidth: '30px',
    itemStyle: { color: '#7CB7D9' },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: { color: '#7CB7D9' }
      },
      splitLine: {
        lineStyle: { color: '#333' }
      },
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['公文公告-贵州省人民政府', '共享开放平台-成都市', '公文公告-贵州省科技厅', '公文公告-贵州省教育厅', '公文公告-贵州省发改委', '公文公告-贵阳市人民政府', '共享开放平台-贵阳市', '公文公告-贵阳市科技厅', '公文公告-贵阳市教育厅', '公文公告-贵阳市发改委'],
      axisLine: {
        lineStyle: { color: '#7CB7D9' }
      }
    },
    series: [
      {
        type: 'bar',
        data: [19325, 19325, 23438, 23438, 31000, 31000, 121594, 121594, 134141, 381807]
      }
    ]
  }
  rank.setOption(option)
}

export {
  draw_rutime,
  draw_crawl_class,
  draw_hot,
  draw_rank
}
