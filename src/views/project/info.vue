<template>
  <div class="app-container"
    v-loading="loading"
    element-loading-text="添加调度中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{project_info.project_name}} - {{project_info.project_alias}}</span>
        <el-button @click="clickEditInfo" style="float: right; padding: 3px 0" type="text">编辑项目信息</el-button>
      </div>

      <el-row>
        <el-col :span="12"><strong>更新时间: </strong>{{project_info.create_time}}</el-col>
        <el-col :span="12"><strong>开发人员: </strong><el-tag style="margin-left: 5px;" v-for="developer_name, index in project_info.developers.split(',')" :key="index" type="success">{{developer_name}}</el-tag></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>需求项目: </strong>{{project_info.for_project}}</el-col>
        <el-col :span="12"><strong>申请开发人: </strong>{{project_info.applicant}}</el-col>
      </el-row>
       <el-row>
        <el-col :span="12"><strong>主题分类: </strong>{{ project_info.project_cate }}</el-col>
        <el-col :span="12"><strong>蜘蛛类型: </strong>{{ projectTpye[project_info.is_msd] }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16"><el-button type="danger" @click="delProject"><i class="el-icon-delete el-icon--left"></i>删除项目</el-button></el-col>
      </el-row>
    </el-card>

    <el-card class="box-card spider">
      <div slot="header" class="clearfix">
        <span>爬虫运行情况</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>

      <el-table :data="project_info.spiders" element-loading-text="Loading" border fit highlight-current-row>
        
        <el-table-column align="center" label='序号' width="65" type="index">
        </el-table-column>

        <el-table-column label="蜘蛛名称" >
          <template slot-scope="scope">
            {{scope.row.spider_name}}
          </template>
        </el-table-column>

        <el-table-column label="调度类型"  width="250" >
          <template slot-scope="scope">
            <span>{{scope.row.circle_type}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-button size="mini" v-if="scope.row.circle_type != 'periodic'" @click="showSchedulerForm(scope.row.spider_name)">添加调度</el-button>
          </template>
        </el-table-column>

        <el-table-column label="cron表达式" :render-header="renderHeader">
          <template slot-scope="scope">
            <span v-if="scope.row.circle_type === 'periodic'">{{ scope.row.cron }}</span>
            <span v-else>无</span>
          </template>
        </el-table-column>

        <el-table-column label="最近运行时间" width="250" >
          <template slot-scope="scope">
            <span>{{scope.row.last_run_time}}</span>
          </template>
        </el-table-column>

        <el-table-column label="最近运行状态" width="150" >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.circle_type != null">{{scope.row.last_run_status}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button size="mini" @click="runOnce(project_info.project_id, scope.row.spider_name)">运行</el-button>
            <el-button v-if="scope.row.last_run_status=='RUNNING'" size="mini" @click="cancelspider(project_info.project_id, project_info.project_name, scope.row.job_instance_id)">取消</el-button>
            <el-button v-if="project_info.is_msd=='0' && scope.row.job_exec_id !== null" size="mini" @click="viewMasterLog(project_info.project_id, scope.row.job_exec_id)">&nbsp;&nbsp;log&nbsp;</el-button>
            <el-button v-if="project_info.is_msd=='1' && scope.row.job_exec_id !== null" size="mini" @click="viewMasterLog(project_info.project_id, scope.row.job_exec_id)">主log</el-button>
            <el-button v-if="project_info.is_msd=='1' && scope.row.job_exec_id !== null" size="mini" @click="viewSlaveLog(project_info.project_id, scope.row.job_exec_id)">从log</el-button>
            <el-button type="danger" size="mini" v-if="scope.row.circle_type == 'periodic'" @click="del_scheduler(scope.row.job_instance_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="编辑项目" :visible.sync="editProjectInfodialog">
      <el-form :model="editProjectIinfoForm" :rules="formRules">
        <el-form-item label="项目英文名称" :label-width="formLabelWidth" prop="project_name">
          <el-input v-model="editProjectIinfoForm.project_name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="项目中文名称" :label-width="formLabelWidth" prop="project_alias">
          <el-input v-model="editProjectIinfoForm.project_alias" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="服务项目" :label-width="formLabelWidth" prop="for_project">
          <el-input v-model="editProjectIinfoForm.for_project" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="项目申请者" :label-width="formLabelWidth" prop="applicant">
          <el-input v-model="editProjectIinfoForm.applicant" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="项目开发者" :label-width="formLabelWidth" prop="developers">
          <br/>
          <el-checkbox-group v-model="editProjectIinfoForm.developers">
            <el-checkbox v-for="developer_name in this.developer_list" :label="developer_name" :key="developer_name" :name="developer_name" ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="主题分类" :label-width="formLabelWidth" prop="project_cate">
          <br/>
          <el-radio-group v-model="editProjectIinfoForm.project_cate">
            <el-radio :label="this.project_type[0]">{{ this.project_type[0] }}</el-radio>
            <el-radio :label="this.project_type[1]">{{ this.project_type[1] }}</el-radio>
            <el-radio :label="this.project_type[2]">{{ this.project_type[2] }}</el-radio>
            <el-radio :label="this.project_type[3]">{{ this.project_type[3] }}</el-radio>
            <el-radio :label="this.project_type[4]">{{ this.project_type[4] }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editProjectInfodialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEditProjectInfoForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogLogVisible">
      <p class="dispalyLog" v-for="log_line in log" :key="log_line">{{log_line}}</p>
    </el-dialog>
    <el-dialog title="添加调度" :visible.sync="dialogFormVisible">
      <div class="tip">优先级</div>
      <div class="sub">
          <el-radio-group v-model="schedulerForm.priority">
              <el-radio :label="-1">较低</el-radio>
              <el-radio :label="0">常规</el-radio>
              <el-radio :label="1">较高</el-radio>
              <el-radio :label="2">最高</el-radio>
          </el-radio-group>
      </div>
      <div class="tip">时间参数</div>
      <div class="sub">
        <el-tabs type="border-card">
            <el-tab-pane label="月份选择">
                <el-checkbox-group v-model="schedulerForm.selectedmonths">
                    <el-checkbox v-for="month in 12" :label="month" :key="month">{{ month >= 10 ? month:'0'+String(month)  }}</el-checkbox>
                </el-checkbox-group>
            </el-tab-pane>
            <el-tab-pane label="天选择">
                <el-checkbox-group v-model="schedulerForm.selecteddays">
                    <el-checkbox v-for="day in 31" :label="day" :key="day">{{  day >= 10 ? day:'0'+String(day)   }}</el-checkbox>
                </el-checkbox-group>
            </el-tab-pane>
            <el-tab-pane label="小时选择">
                <el-checkbox-group v-model="schedulerForm.selectedhours">
                    <el-checkbox v-for="hour in 24" :label="hour-1" :key="hour-1">{{ hour-1 >= 10 ? hour-1:'0'+String(hour-1) }}</el-checkbox>
                </el-checkbox-group>
            </el-tab-pane>
            <el-tab-pane label="分钟选择">
                <el-checkbox-group v-model="schedulerForm.selectedminutes">
                    <el-checkbox v-for="minute in 60" :label="minute-1" :key="minute-1">{{ minute-1 >= 10 ? minute-1:'0'+String(minute-1)  }}</el-checkbox>
                </el-checkbox-group>
            </el-tab-pane>
          </el-tabs>     
      </div>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addScheduler">确 定</el-button>
      </div>
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
  .dispalyLog{
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
  #el-icon-info{
    margin-left: 5px;
  }
  .tip{
    font-size: 16px;
    padding-left: 10px;
    border-left: 2px solid steelblue;
    margin: 10px 0px 0px 0px;
}
.sub{
    margin: 10px 0px 25px 20px;
}
.el-checkbox {
    margin-left: 10px; 
}
.el-checkbox:first-child {
    margin-left: 30px; 
}
</style>

<script>
  import { apiListDevelopers } from '@/api/developers'
  import { apiGetProjectInfo, delProject, apiEditProjectInfo } from '@/api/project'
  import { addScheduler, delScheduler } from '@/api/spider'
  import { runOnce, apiCancelspider } from '@/api/spider'
  import { getMasterLog, getSlaveLog } from '@/api/spider'

  export default {
    data() {
      return {
        selectedmonths: [],
        selecteddays: [],
        selectedhours: [],
        selectedminutes: [],
        selectedseconds: [],
        developer_list: [],
        project_type: ['开放平台', '公文公告', '餐饮', '舆情', '其他'],
        formRules: {
          project_name: [
            { required: true, message: '请输入项目英文名！', trigger: 'blur' },
            { pattern: /^[A-Za-z0-9_]+$/, message: '不允许输入空格等特殊符号' }
          ],
          project_alias: [{ required: true, message: '请输入项目中文名！', trigger: 'blur' }],
          for_project: [{ required: true, message: '请输入服务项目字段信息！', trigger: 'blur' }],
          applicant: [{ required: true, message: '请输入项目申请者字段信息！', trigger: 'blur' }],
          developers: [{ required: true, message: '请输入项目开发者字段信息！', trigger: 'blur' }],
          project_cate: [{ required: true, message: '请输入主题分类字段信息！', trigger: 'blur' }]
        },
        projectTpye: {
          0: '单机',
          1: '分布式'
        },
        editProjectIinfoForm: {},
        project_info: {
          is_msd: null,
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
          selectedmonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          selecteddays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
          selectedhours: [0],
          selectedminutes: [0],
          priority: 0
        },
        log: [],
        editProjectInfodialog: false,
        dialogFormVisible: false,
        dialogLogVisible: false,
        formLabelWidth: '200',
        loading: false
      }
    },
    mounted: function() {
      this.getProjectInfo()
      this.listDevelopers()
    },
    methods: {
      async del_scheduler(job_instance_id) {
        const res = await delScheduler(job_instance_id)
        if (res.code === 200) {
          this.getProjectInfo()
        } else {
          this.$message.error('信息更新出错')
          return false
        }
      },
      clickEditInfo() {
        this.editProjectIinfoForm = JSON.parse(JSON.stringify(this.project_info))
        this.editProjectIinfoForm.developers = this.editProjectIinfoForm.developers.split(',')
        this.editProjectInfodialog = true
      },
      async listDevelopers() {
        try {
          const res = await apiListDevelopers()
          const data_list = []
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].developer_status === '0') data_list.push(res.data[i].developer_name)
          }
          this.developer_list = data_list
        } catch (e) {
          this.$message.error('开发人员列表获取错误 ' + e)
        }
      },
      renderHeader(h) {
        return (
          <a href='https://blog.csdn.net/weixin_38296752/article/details/79715337' target='_blank' >cron表达式<i id='el-icon-info' class='el-icon-info'></i></a>
        )
      },
      // 获取工程信息
      async getProjectInfo() {
        try {
          const res = await apiGetProjectInfo(this.$route.params.name)
          this.project_info = res.data
          this.schedulerForm.project_id = res.data.project_id
        } catch (e) {
          this.$message.error('获取信息错误 ' + e)
        }
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
          this.getProjectInfo(this.$route.params.name).then(response => {
            this.project_info = response.data
            this.schedulerForm.project_id = response.data.project_id
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        })
      },
      // 修改工程基础信息
      async submitEditProjectInfoForm() {
        this.editProjectIinfoForm.developers = this.editProjectIinfoForm.developers.join(',')
        const res = await apiEditProjectInfo(this.editProjectIinfoForm)
        if (res.code === 200) {
          this.editProjectInfodialog = false
          this.$message.success('信息更新成功！')
          this.getProjectInfo()
        } else {
          this.$message.error('信息更新出错')
          return false
        }
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

      // 取消爬虫
      async cancelspider(project_id, project_name, job_instance_id) {
        try {
          this.loading = true
          await apiCancelspider(project_id, project_name, job_instance_id)
          this.loading = false
          this.getProjectInfo()
        } catch (e) {
          this.$message.error('取消爬虫错误 ' + e)
        }
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
