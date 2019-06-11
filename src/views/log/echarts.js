var echarts = require('echarts')
var drawChart = function(id, date, data_count) {
  const dom = document.getElementById(id)
  var chart = echarts.init(dom)
  var option = {
    tooltip: { // 提示框信息
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: { color: 'black' }
      },
      name: '项目名称',
      data: date
    },
    yAxis: {
      name: '数量',
      type: 'value',
      axisLine: {
        lineStyle: { color: 'black' }
      },
      splitLine: {
        lineStyle: { color: 'white' }
      }
    },
    series: [{
      data: data_count,
      type: 'line',
      smooth: true,
      // symbol: 'circle',
      symbolSize: 7,
      itemStyle: {
        normal: { color: 'red' } // 坐标圆点的颜色
      },
      lineStyle: {
        normal: { color: 'rgb(31, 120, 193)' } // 线条的颜色及宽度
      }
      //   label: {//线条上的数字提示信息
      //     normal: {
      //         show: true,
      //         position: 'top'
      //     }
      // }
    }]
  }
  chart.setOption(option)
}

export { drawChart }
