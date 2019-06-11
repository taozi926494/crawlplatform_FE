<template>
    <div class='contener'>
        <div class="info">
            <div class='count_info'>
                <h4>错误量</h4>
                <div class="content">
                  <span>{{ this.total_number }}</span>
                  <span class="unit">条</span>
                </div>
               
            </div>
            <div class='count_info'>
                <h4>项目错误量</h4>
                <div class="content">
                  <span>{{ this.project_number }}</span>
                  <span class="unit">个</span>
                </div>
            </div>
            <div class='chart'>
                <h4>错误量分布图</h4>
                <div id="logPicture" style="width:100%; height: 90%;  margin: 1% 0% 2% 0%;"></div>
            </div>
        </div>
        <div class="table">
            <el-table :data="showmessages" element-loading-text="Loading" >
                <el-table-column 
                  label='序号' 
                  width="80" 
                  type="index">
                </el-table-column>

                <el-table-column label="地址"  width="150">
                  <template slot-scope="scope">
                    {{ scope.row.type }}
                  </template>
                </el-table-column>

                <el-table-column label="日期" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.time }}
                  </template>
                </el-table-column>
                
                <el-table-column label="名称" width="250">
                  <template slot-scope="scope">
                    {{ scope.row.project_name }}
                  </template>
                </el-table-column>
                <el-table-column label="信息">
                  <template slot-scope="scope">
                    <el-collapse v-model="activeNames">
                      <el-collapse-item :title="scope.row.messages.substr(0,200)" :name="scope.$index + 1"> 
                        {{ scope.row.messages }}
                      </el-collapse-item>
                    </el-collapse>
                  </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            background
            :page-size="pageSize"
            @current-change="handleCurrentChange"
            layout="prev, pager, next, jumper"
            :total="messages.length">
          </el-pagination>
        </div>
    </div>
</template>

<style  rel="stylesheet/scss" lang="scss">
.info {
    margin:0.6% 1% 0.6% 0.6%;
}
.count_info {
    float: left;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    margin: 0% 1.5% 0% 0%;
    width: 23.5%;
    height: 250px;
    align-items: center;
    h4 {
        margin-left: 30px;
        margin-bottom: 14%; 
    }
}
.content{
  font-size: 300%;
  text-align: center;
}
.unit {
  font-size: 45%;
}
.chart{
    float: left;
    margin: 0% 0% 1% 0%;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    width: 50%;
    height: 250px;
    h4 {
      margin-left: 30px;
    }
}
.table {
    margin: 0% 1% 0.6% 0.6%;
}
#logPicture{
  position: relative;
  top: -15%;
}

.el-table .warning-row {
    background:white;
}
.el-collapse-item__header{
  border: none;
}

.el-collapse {
  border-top: none;
  border-bottom: none;
}

</style>

<script>
import { apiLogMonitor } from '@/api/log'
import { drawChart } from './echarts'

export default {
  data() {
    return {
      activeNames: ['1'],
      messages: [],
      showmessages: [],
      loading: false,
      total_number: 0,
      project_number: 0,
      pageSize: 7
    }
  },
  mounted() {
    this.logMonitor()
  },
  methods: {
    handleCurrentChange(val) {
      var start = (val - 1) * this.pageSize
      this.showmessages = this.messages.slice(start, start + this.pageSize)
    },
    get_Axis(data) {
      const len = data.length
      var xAxis = []
      var yAxis = []
      for (var i = 0; i < len; i++) {
        xAxis.push(data[i]['key'])
        yAxis.push(data[i]['doc_count'])
      }
      return {
        x: xAxis,
        y: yAxis
      }
    },
    async logMonitor() {
      this.loading = true
      try {
        const res = await apiLogMonitor()
        this.messages = res.data.messages
        this.total_number = res.data.total
        this.project_number = res.data.project_group.length
        const axis = this.get_Axis(res.data.project_group)
        drawChart('logPicture', axis.x, axis.y)
        this.handleCurrentChange(1)
      } catch (e) {
        this.$message.error(e)
      }
      this.loading = false
    },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>
