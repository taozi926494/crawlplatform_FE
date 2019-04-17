<template>
  <div class="visual-container">

  <el-container>
    <el-header class="header">
        <h3>
          <img :src="img_logo"> 爬虫调度管理平台
        </h3>
    </el-header>

    <el-header class="summary">
      <el-row>
        <el-col :span="4">
          <rotate-circle title="部署爬虫总数">47个</rotate-circle>
        </el-col>
        <el-col :span="4">
          <message-panel title="今日获取数据量" data="12万3387条"></message-panel>
        </el-col>
        <el-col :span="4">
          <message-panel title="本周获取数据量" data="345万7769条"></message-panel>
        </el-col>
         <el-col :span="4">
          <message-panel title="本月数据需求" data="12个"></message-panel>
        </el-col>
         <el-col :span="4">
          <message-panel title="本月部署爬虫" data="12个"></message-panel>
        </el-col>
        <el-col :span="4">
          <div class="rotate-circle-box">
            <rotate-circle title="获取数据总量" orien="right">1亿6234万7998条</rotate-circle>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main class="chart-container">
      <el-row class="chart-container-row">

        <el-col :span="6" class="side-col">
          <div class="half">
            <chart-panel id="crawl_class">
            </chart-panel>
          </div>

          <div class="half half-bottom">
            <div class="panel-header">
              本周爬虫调度热力图
            </div>
            <chart-panel id="hot">
            </chart-panel>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="middle-half">

            <chart-panel id="spider_list">
              <div class="panel-header">
                <span>
                  爬虫运行情况
                </span>
              </div>
              <list :listdata="spider_list"></list>
                <div class="shadow-top"></div>
                <div class="shadow-bottom"></div>
            </chart-panel>
            
          </div>
          
          <div id="runtime_box">
            <div class="panel-header">
              <span>
                本周爬虫获取数据量
              </span>
            </div>
            <chart-panel id="runtime">
              
            </chart-panel>
          </div>
        </el-col>

        <el-col :span="6">
          <div id="rank_box">
            <div class="panel-header">
              <span>
                爬虫获取数据排名
              </span>
            </div>
            <chart-panel id="rank">
            
            </chart-panel>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</div>
</template>



<style rel="stylesheet/scss" lang="scss" scoped>
  .visual-container {
    width: 100%;
    min-width: 1640px;
    height: 100%;
    padding: 20px;
    color: #1DE5BB;
    background: url('../../assets/bg.png') left center no-repeat;
    background-size: 100% 100%;
    // background: #000;

    .el-container {
      height: 100%;
    }

    .header {
      margin: 0 auto;
      width: 100%;
      height: 42px !important;
      overflow: hidden;
      background: url(../../assets/header-left.png) left center no-repeat, 
        url(../../assets/header-right.png) right center no-repeat;
      background-size: 43% 80%, 43% 80%;
      text-align: center;
      line-height: 1.15;
      h3 {
        margin: 0;
        padding: 0;
        line-height: 42px;
        text-align: center;
        font-size: 24px;

        img {
          width: 35px; height:35px; vertical-align: middle;
        }
      }
    }

    .summary {
      height: 160px !important;
      .el-col {
        padding: 40px;
        .rotate-circle-box {
          float: right;
        }
      }
    }

    .el-main {
      padding: 0;
    }
    .el-header {
      padding: 0;
    }

    .chart-container{
      position: relative;
      overflow: hidden;

      .chart-container-row {
        position: absolute;
        width: 100%;
        height: 100%;

        .el-col {
          height: 100%;
        }

        .side-col {
          padding-top: 60px;
          .half {
            height: 50%;
            padding: 10px;
          }
          .half-bottom {
            padding-bottom: 0;
            padding-top: 0;
            position: relative;

            .panel-header {
              width: 100%;
              text-align: center;
              font-size: 18px;
              font-weight: 900;
            }
          }
        }
      }
    }

    .panel-header {
      height: 20px;
      position: absolute;
      z-index:10;
      top: 9px;
      left: 2px;
      
      span {
        background: url('../../assets/panelheader.png') no-repeat;
        background-size: 100% 100%;
        padding: 5px 30px 5px 16px;
        font-size: 17px;
        font-weight: 900;
      } 
    }

    .middle-half {
      height: 70%;
      padding-bottom: 20px;
      position: relative;

      .shadow-bottom {
        width: 99.5%;
        height: 80px;
        background: linear-gradient(rgba(0, 0, 0, 0.1), rgb(0, 0, 0));
        position: absolute;
        bottom: 2px;
        left: 3px;
      }

      .shadow-top {
        width: 99.5%;
        height: 80px;
        background: linear-gradient(rgb(0, 0, 0), rgba(0, 0, 0, 0.1));
        position: absolute;
        top: 2px;
        left: 3px;
      }

      #spider_list {
        overflow: hidden;
        height: 100%;
        padding: 2px 15px;
        
        .list {
          width: 90%;
          margin: 0 auto;
        }
      }
    }

    #runtime_box {
      width: 100%;
      height: 30%;
      position: relative;
    }

    #rank_box {
      width: 100%;
      height: 100%;
      position: relative;
      padding: 60px 10px 0 10px;

      .panel-header {
        top: 69px;
        left: 10px;
      }
    }
  }
</style>

<script>
  import RotateCircle from './components/RotateCircle'
  import MessagePanel from './components/MessagePanel'
  import ChartPanel from './components/ChartPanel'
  import List from './components/List'
  import VueMarquee from 'vue-marquee'

  import { spider_list, hot_hours, hot_data, class_data, near7Days, genRunTimeData } from './data.js'
  import { draw_crawl_class, draw_hot, draw_rutime, draw_rank } from './echarts_draw.js'

  import img_logo from '@/assets/logo.png'

  export default {
    components: {
      RotateCircle,
      MessagePanel,
      ChartPanel,
      List,
      VueMarquee
    },
    data() {
      return {
        img_logo: img_logo,
        spider_list: null,
        hot_hours: hot_hours,
        hot_data: hot_data,
        class_data: class_data
      }
    },
    mounted: function() {
      let hotDays = near7Days()
      this.spider_list = genRunTimeData()
      draw_crawl_class('crawl_class', class_data)
      draw_hot('hot', hot_hours, hotDays, hot_data)
      console.log('hotDays', hotDays)
      draw_rutime('runtime', hotDays)
      draw_rank('rank')
    }
  }
</script>
