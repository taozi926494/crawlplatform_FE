<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="项目id" width="65">
        <template slot-scope="scope">
          {{scope.row.project_id}}
        </template>
      </el-table-column>
      <el-table-column label="项目名称">
        <template slot-scope="scope">
          {{scope.row.project_name}} {{scope.row.project_alias}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='蜘蛛id' width="65">
        <template slot-scope="scope">
          {{scope.row.spider_id}}
        </template>
      </el-table-column>
      <el-table-column label="蜘蛛名称">
        <template slot-scope="scope">
          {{scope.row.spider_name}} {{scope.row.spider_alias}}
        </template>
      </el-table-column>
      <el-table-column label="最近运行时间" width="155" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.last_run_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近运行状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.last_run_status}}</el-tag>
          <span v-show="false">{{scope.row.last_run_status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="runOnce(scope.row.project_id, scope.row.spider_name)">运行</el-button>
          <el-button v-if="scope.row.job_exec_id !== null" size="mini" @click="viewMasterLog(scope.row.project_id, scope.row.job_exec_id)">主log</el-button>
          <el-button v-if="scope.row.job_exec_id !== null" size="mini" @click="viewSlaveLog(scope.row.project_id, scope.row.job_exec_id)">从log</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible">
      <p v-for="log_line in log">{{log_line}}</p>
    </el-dialog>
  </div>
</template>

<script>
import { getAllSpider } from '@/api/spider'
import { runOnce } from '@/api/spider'
import { getMasterLog, getSlaveLog } from '@/api/spider'

export default {
  name: 'dashboard',
  data() {
    return {
      list: null,
      listLoading: true,
      log: [],
      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAllSpider().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
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
    viewMasterLog: function(project_id, job_exec_id) {
      this.dialogVisible = true
      this.log = []
      getMasterLog(project_id, job_exec_id).then((response) => {
        this.log = response.log
      })
    },
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
