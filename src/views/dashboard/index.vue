<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="序号" width="65" type="index" align="center">
      </el-table-column>

      <el-table-column label="项目名称">
        <template slot-scope="scope">
          {{scope.row.project_name}} {{scope.row.project_alias}}
        </template>
      </el-table-column>
     
      <el-table-column label="蜘蛛名称">
        <template slot-scope="scope">
          {{scope.row.spider_name}} {{scope.row.spider_alias}}
        </template>
      </el-table-column>

       <el-table-column align="center" label='项目类型' width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.is_msd=='1'">分布式</span>
          <span v-else>单机</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label='主题分类' width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.project_cate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="最近运行时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.last_run_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="运行状态" width="160" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.last_run_status}}</el-tag>
          <span v-show="false">{{scope.row.last_run_status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="日志" width="180" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_msd=='0' && scope.row.job_exec_id !== null" size="mini" @click="viewMasterLog(scope.row.project_id, scope.row.job_exec_id)">&nbsp;&nbsp;log&nbsp;</el-button>
          <el-button v-if="scope.row.is_msd=='1' && scope.row.job_exec_id !== null" size="mini" @click="viewMasterLog(scope.row.project_id, scope.row.job_exec_id)">主log</el-button>
          <el-button v-if="scope.row.is_msd=='1' && scope.row.job_exec_id !== null" size="mini" @click="viewSlaveLog(scope.row.project_id, scope.row.job_exec_id)">从log</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :page-size=12
        :total="total_num">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <p class="dispalyLog" v-for="log_line in log" :key="log_line">{{log_line}}</p>
    </el-dialog>
  </div>
</template>

<script>
import { getAllSpider } from '@/api/spider'
import { runOnce, apiCancelspider } from '@/api/spider'
import { getMasterLog, getSlaveLog } from '@/api/spider'

export default {
  name: 'dashboard',
  data() {
    return {
      list: null,
      listLoading: true,
      log: [],
      dialogVisible: false,
      pageIndex: 1,
      pageSzie: 12,
      total_num: null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCurrentChange(val) {
      this.pageIndex = val
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getAllSpider(this.pageIndex, this.pageSzie).then(response => {
        this.list = response.data.data
        this.total_num = response.data.total_num
        this.listLoading = false
      })
    },

    // 取消爬虫
    async cancelspider(project_id, project_name, excute_job_index) {
      try {
        this.loading = true
        await apiCancelspider(project_id, project_name, excute_job_index)
        this.loading = false
      } catch (e) {
        this.$message.error('取消爬虫错误 ' + e)
      }
    },

    // 单次运行爬虫
    runOnce: function(project_id, spider_name) {
      this.listLoading = true
      runOnce(project_id, spider_name).then(response => {
        if (response.status === 'success') {
          this.fetchData()
        } else {
          this.listLoading = false
          alert('Error')
        }
      })
    },

    // 查看主爬虫日志
    viewMasterLog: function(project_id, job_exec_id) {
      this.dialogVisible = true
      this.log = []
      getMasterLog(project_id, job_exec_id).then((response) => {
        this.log = response.log
      })
    },

    // 查看从爬虫日志
    viewSlaveLog: function(project_id, job_exec_id) {
      this.dialogVisible = true
      this.log = []
      getSlaveLog(project_id, job_exec_id).then((response) => {
        this.log = response.log
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination{
  margin-top: 50px;
}
.dispalyLog{
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}

</style>
