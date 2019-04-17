<template>
  <div class="app-container"
    v-loading="loading"
    element-loading-text="添加调度中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{project_info.project_name}}  {{project_info.project_alias}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">编辑项目信息</el-button>
      </div>

      <el-row>
        <el-col :span="12"><strong>创建时间: </strong>{{project_info.create_time}}</el-col>
        <el-col :span="12"><strong>开发人员: </strong><el-tag style="margin-left: 5px;" v-for="developer_name, index in project_info.developers.split(',')" :key="index" type="success">{{developer_name}}</el-tag></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>需求项目: </strong>{{project_info.for_project}}</el-col>
        <el-col :span="12"><strong>申请开发人: </strong>{{project_info.applicant}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16"><el-button type="danger" @click="delProject"><i class="el-icon-delete el-icon--left"></i>删除项目</el-button></el-col>
      </el-row>
    </el-card>

    <el-card class="box-card spider">
      <div slot="header" class="clearfix">
        <span>爬虫运行情况</span>
        <el-button style="float: right; padding: 3px 0" type="text">编辑项目信息</el-button>
      </div>

      <el-table :data="project_info.spiders" element-loading-text="Loading" border fit highlight-current-row>
        
        <el-table-column align="center" label='蜘蛛id' width="65">
          <template slot-scope="scope">
            {{scope.row.spider_id}}
          </template>
        </el-table-column>
        <el-table-column label="蜘蛛名称（英文）">
          <template slot-scope="scope">
            {{scope.row.spider_name}}
          </template>
        </el-table-column><el-table-column label="蜘蛛名称（中文）">
          <template slot-scope="scope">
            {{scope.row.spider_alias}}
          </template>
        </el-table-column>
        </el-table-column><el-table-column label="调度类型">
          <template slot-scope="scope">
            <span>{{scope.row.circle_type}}</span>
            <el-button size="mini" v-if="scope.row.circle_type != 'periodic'" @click="showSchedulerForm(scope.row.spider_name)">添加调度</el-button>
          </template>
        </el-table-column>
        <el-table-column label="最近运行时间" width="155" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.last_run_time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="最近运行状态" width="110" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.circle_type != null">{{scope.row.last_run_status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="runOnce(project_info.project_id, scope.row.spider_name)">运行</el-button>
              <el-button v-if="scope.row.job_exec_id !== null" size="mini" @click="viewMasterLog(project_info.project_id, scope.row.job_exec_id)">主log</el-button>
              <el-button v-if="scope.row.job_exec_id !== null" size="mini" @click="viewSlaveLog(project_info.project_id, scope.row.job_exec_id)">从log</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="添加调度" :visible.sync="dialogFormVisible">
      <el-form :model="schedulerForm">
        <el-form-item label="工程id" :label-width="formLabelWidth">
          <el-input v-model="schedulerForm.project_id" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="蜘蛛英文名称" :label-width="formLabelWidth">
          <el-input v-model="schedulerForm.spider_name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="启动参数" :label-width="formLabelWidth">
          <el-input v-model="schedulerForm.spider_arguments" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="优先级" :label-width="formLabelWidth">
          <select v-model="schedulerForm.priority">
            <option label="Low" value="-1">Low</option>
            <option label="Normal" value="0" selected="selected">Normal</option>
            <option label="High" value="1">High</option>
            <option label="Highest" value="2">Highest</option>
          </select>
        </el-form-item>

        <el-form-item label="运行服务器" :label-width="formLabelWidth">
          <el-input v-model="schedulerForm.daemon" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        
        <el-form-item label="选择月份" :label-width="formLabelWidth">
          <select name="cron_month" v-model="schedulerForm.cron_month">
            <option value="*" selected="selected">Every Month</option>
            
            <option value="1">1</option>
            
            <option value="2">2</option>
            
            <option value="3">3</option>
            
            <option value="4">4</option>
            
            <option value="5">5</option>
            
            <option value="6">6</option>
            
            <option value="7">7</option>
            
            <option value="8">8</option>
            
            <option value="9">9</option>
            
            <option value="10">10</option>
            
            <option value="11">11</option>
            
            <option value="12">12</option>
            
        </select>
        </el-form-item>
        
        <el-form-item label="选择周几运行" :label-width="formLabelWidth">
          <select name="cron_day_of_week" v-model="schedulerForm.cron_day_of_week">
              <option value="*" selected="selected">Every day</option>
              <option value="0">Monday</option>
              <option value="1">Tuesday</option>
              <option value="2">Wednesday</option>
              <option value="3">Thursday</option>
              <option value="4">Friday</option>
              <option value="5">Saturday</option>
              <option value="6">Sunday</option>
          </select>
        </el-form-item>

        <el-form-item label="选择每月几号运行" :label-width="formLabelWidth">
          <select name="cron_day_of_month" v-model="schedulerForm.cron_day_of_month">
            <option value="*" selected="selected">Every day</option>
            
            <option value="1">1</option>
            
            <option value="2">2</option>
            
            <option value="3">3</option>
            
            <option value="4">4</option>
            
            <option value="5">5</option>
            
            <option value="6">6</option>
            
            <option value="7">7</option>
            
            <option value="8">8</option>
            
            <option value="9">9</option>
            
            <option value="10">10</option>
            
            <option value="11">11</option>
            
            <option value="12">12</option>
            
            <option value="13">13</option>
            
            <option value="14">14</option>
            
            <option value="15">15</option>
            
            <option value="16">16</option>
            
            <option value="17">17</option>
            
            <option value="18">18</option>
            
            <option value="19">19</option>
            
            <option value="20">20</option>
            
            <option value="21">21</option>
            
            <option value="22">22</option>
            
            <option value="23">23</option>
            
            <option value="24">24</option>
            
            <option value="25">25</option>
            
            <option value="26">26</option>
            
            <option value="27">27</option>
            
            <option value="28">28</option>
            
            <option value="29">29</option>
            
            <option value="30">30</option>
            
            <option value="31">31</option>
            
        </select>
        </el-form-item>

        <el-form-item label="选择小时" :label-width="formLabelWidth">
          <select name="cron_hour" v-model="schedulerForm.cron_hour">
            <option value="*" selected="selected">Every Hour</option>
            
            <option value="0">0</option>
            
            <option value="1">1</option>
            
            <option value="2">2</option>
            
            <option value="3">3</option>
            
            <option value="4">4</option>
            
            <option value="5">5</option>
            
            <option value="6">6</option>
            
            <option value="7">7</option>
            
            <option value="8">8</option>
            
            <option value="9">9</option>
            
            <option value="10">10</option>
            
            <option value="11">11</option>
            
            <option value="12">12</option>
            
            <option value="13">13</option>
            
            <option value="14">14</option>
            
            <option value="15">15</option>
            
            <option value="16">16</option>
            
            <option value="17">17</option>
            
            <option value="18">18</option>
            
            <option value="19">19</option>
            
            <option value="20">20</option>
            
            <option value="21">21</option>
            
            <option value="22">22</option>
            
            <option value="23">23</option>
            
        </select>
        </el-form-item>

        <el-form-item label="选择分钟" :label-width="formLabelWidth">
          <select name="cron_minutes" v-model="schedulerForm.cron_minutes">
              <option value="0" selected="selected">0</option>
              
              <option value="5">5</option>
              
              <option value="10">10</option>
              
              <option value="15">15</option>
              
              <option value="20">20</option>
              
              <option value="25">25</option>
              
              <option value="30">30</option>
              
              <option value="35">35</option>
              
              <option value="40">40</option>
              
              <option value="45">45</option>
              
              <option value="50">50</option>
              
              <option value="55">55</option>
              
              <option value="60">60</option>
              
              <option value="*">Every minute</option>
              <option value="*/2">Every 2 minute</option>
              <option value="*/3">Every 3 minute</option>
              <option value="*/4">Every 4 minute</option>
              <option value="*/5">Every 5 minute</option>
              <option value="*/10">Every 10 minute</option>
              <option value="*/15">Every 15 minute</option>
              <option value="*/30">Every 30 minute</option>
          </select>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addScheduler">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogLogVisible">
      <p v-for="log_line in log">{{log_line}}</p>
    </el-dialog>

  </div>
</template>

<style scope lang="scss">
  .el-row {
    padding-top: 20px;
    &:nth-child(1){
      padding-top: 0;
    }
    .el-button {
      float: right;
    }
  }
  .spider {
    margin-top: 20px;
  }
</style>

<script>
  import { getProjectInfo, delProject } from '@/api/project'
  import { addScheduler } from '@/api/spider'
  import { runOnce } from '@/api/spider'
  import { getMasterLog, getSlaveLog } from '@/api/spider'

  export default {
    data() {
      return {
        project_info: {
          project_id: null,
          project_name: null,
          project_alias: null,
          create_time: null,
          developers: '',
          for_project: null,
          applicant: null,
          spiders: []
        },
        schedulerForm: {
          project_id: null,
          spider_name: null,
          spider_arguments: null,
          priority: null,
          daemon: 'auto',
          cron_month: '*',
          cron_day_of_month: '*',
          cron_day_of_week: '*',
          cron_hour: '*',
          cron_minutes: 0
        },
        log: [],
        dialogFormVisible: false,
        dialogLogVisible: false,
        formLabelWidth: '200',
        loading: false
      }
    },
    mounted: function() {
      this.getProjectInfo()
    },
    methods: {
      // 获取工程信息
      getProjectInfo: function() {
        getProjectInfo(this.$route.params.name).then(response => {
          this.project_info = response.data
          this.schedulerForm.project_id = response.data.project_id
        })
      },
      // 弹出调度窗口
      showSchedulerForm: function(spider_name) {
        this.schedulerForm.spider_name = spider_name
        this.dialogFormVisible = true
      },
      // 添加调度
      addScheduler: function() {
        this.dialogFormVisible = false
        this.loading = true
        addScheduler(this.schedulerForm).then((response) => {
          this.loading = false
          this.$message('添加调度成功')
          // 重新再获取一次工程信息
          getProjectInfo(this.$route.params.name).then(response => {
            this.project_info = response.data
            this.schedulerForm.project_id = response.data.project_id
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        })
      },
      // 单次运行
      runOnce: function(project_id, spider_name) {
        this.loading = true
        runOnce(project_id, spider_name).then(response => {
          if (response.status === 'success') {
            this.loading = false
            this.getProjectInfo()
          } else {
            this.listLoading = false
            alert('Error')
          }
        })
      },
      // 查看主爬虫log
      viewMasterLog: function(project_id, job_exec_id) {
        this.dialogLogVisible = true
        this.log = []
        getMasterLog(project_id, job_exec_id).then((response) => {
          this.log = response.log
        })
      },
      // 查看从爬虫log
      viewSlaveLog: function(project_id, job_exec_id) {
        this.dialogLogVisible = true
        this.log = []
        getSlaveLog(project_id, job_exec_id).then((response) => {
          this.log = response.log
        })
      },
      // 删除项目
      delProject: function() {
        this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delProject(this.project_info.project_name).then(response => {
            if (response.status === 'success') {
              this.$message('删除项目成功')
              this.$router.push({ path: '/project/all' })
            }
          })
        })
      }
    }
  }

</script>
