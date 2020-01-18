<template>
  <div class="app-container"
    v-loading="loading"
    element-loading-text="上传项目中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)">
   
    <el-form ref="form" :model="form" :rules="formRules" label-width="150px" label-position="left">
      <el-form-item label="项目英文名称" prop="project_name"   >
        <el-input v-model="form.project_name"></el-input>
      </el-form-item>
      <el-form-item label="项目中文名称" prop="project_alias">
        <el-input v-model="form.project_alias"></el-input>
      </el-form-item>

      <el-form-item label="服务项目" prop="for_project" >
        <el-input v-model="form.for_project" ></el-input>
      </el-form-item>

      <el-form-item label="项目申请者" prop="applicant">
        <el-input v-model="form.applicant"></el-input>
      </el-form-item>
    
      <el-form-item label="项目开发者" prop="developers">
        <el-checkbox-group v-model="form.developers">
          <el-checkbox v-for="developer_name in this.developer_list" :label="developer_name" :key="developer_name" :name="developer_name" ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="项目类型" prop="pro_type">
        <el-radio-group v-model="form.pro_type">
          <el-radio :label="0">{{ this.project_type[0] }}</el-radio>
          <el-radio :label="1">{{ this.project_type[1] }}</el-radio>
          <el-radio :label="2">{{ this.project_type[2] }}</el-radio>
          <el-radio :label="3">{{ this.project_type[3] }}</el-radio>
          <el-radio :label="4">{{ this.project_type[4] }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="蜘蛛类型" prop="is_msd">
        <el-radio-group v-model="form.is_msd">
          <el-radio :label="1">分布式</el-radio>
          <el-radio :label="0">单机</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="form.is_msd=='0'" label="爬虫文件包" label-width="200px">
        <el-upload 
          action= '#'
          accept=".egg"
          :on-exceed="exceedFile"
          :on-change="fileChange1"
          :file-list="fileList"
          :limit="1"
          multiple
          drag>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>

      <el-form-item v-if="form.is_msd=='1'" label="爬虫文件包" label-width="200px" >
        <el-row>
          <el-col :span="4">
            <el-upload 
              action= '#'
              accept=".egg"
              :on-exceed="exceedFile"
              :on-change="fileChange2"
              :file-list="fileList"
              :limit="1"
              multiple
              drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><em>主爬虫</em>  文件上传处</div>
            </el-upload>
          </el-col>
          <el-col :span="4">
            <el-upload 
              action= '#'
              accept=".egg"
              :on-exceed="exceedFile"
              :on-change="fileChange3"
              :file-list="fileList"
              :limit="1"
              multiple
              drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><em>从爬虫</em>  文件上传处</div>
            </el-upload>
          </el-col>
        </el-row>
       
      </el-form-item>
      <el-form-item>
        <p>Tips: 项目打包命令 ( scrapyd-deploy -p 项目名称 --build-egg=自我命名项目.egg )</p>
       </el-form-item>
  </el-form>
  
  <el-button id="addprojectbtn" @click="addProject">添加</el-button>
  </div>
</template>

<script>
import upload from '@/utils/upload'
import { apiListDevelopers } from '@/api/developers'

export default {
  data() {
    return {
      fileList: [],
      developer_list: [],
      project_type: ['开放平台', '公文公告', '餐饮', '舆情', '其他'],
      form: {
        project_name: null,
        project_alias: null,
        for_project: null,
        applicant: null,
        pro_type: 1,
        is_msd: 1,
        developers: [],
        eggFile: null,
        masterEggFile: null,
        slaveEggFile: null

      },
      formRules: {
        project_name: [
          { required: true, message: '请输入项目英文名！', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9_]+$/, message: '不允许输入空格等特殊符号' }
        ],
        project_alias: [{ required: true, message: '请输入项目中文名！', trigger: 'blur' }],
        for_project: [{ required: true, message: '请输入服务项目字段信息！', trigger: 'blur' }],
        applicant: [{ required: true, message: '请输入项目申请者字段信息！', trigger: 'blur' }],
        developers: [{ required: true, message: '请输入项目开发者字段信息！', trigger: 'blur' }],
        masterEggFile: [{ required: true, message: '请输入项目主爬虫文件！', trigger: 'change' }],
        slaveEggFile: [{ required: true, message: '请输入项目从爬虫文件！', trigger: 'change' }],
        eggFile: [{ required: true, message: '请输入项目爬虫文件！', trigger: 'change' }]
      },
      loading: false
    }
  },

  // 拉取参数
  created() {
    this.listDevelopers()
  },

  methods: {
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.error('文件数量过多！')
    },

    fileChange1(file, fileList) {
      var flag = false
      for (const i of fileList) {
        if (i.name === file.raw.name) {
          flag = true
        }
      }
      if (!flag) {
        fileList.push({ name: file.raw.name })
      }
      this.form.eggFile = file.raw
    },
    fileChange2(file, fileList) {
      var flag = false
      for (const i of fileList) {
        if (i.name === file.raw.name) {
          flag = true
        }
      }
      if (!flag) {
        fileList.push({ name: file.raw.name })
      }
      this.form.masterEggFile = file.raw
    },
    fileChange3(file, fileList) {
      var flag = false
      for (const i of fileList) {
        if (i.name === file.raw.name) {
          flag = true
        }
      }
      if (!flag) {
        fileList.push({ name: file.raw.name })
      }
      this.form.slaveEggFile = file.raw
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
    addProject: function(event) {
      event.preventDefault()
      this.$refs.form.validate(valid => {
        if (valid) {
          // 单机爬虫格式
          const formData = new FormData()
          if (this.form.is_msd === 0) {
            if (!this.form.eggFile) {
              this.$message.error('请添加egg文件! ')
              return false
            }
            this.loading = true
            formData.append('is_msd', this.form.is_msd)
            formData.append('project_name', this.form.project_name)
            formData.append('project_alias', this.form.project_alias)
            formData.append('for_project', this.form.for_project)
            formData.append('applicant', this.form.applicant)
            formData.append('pro_type', this.project_type[this.form.pro_type])
            formData.append('developers', this.form.developers.join(','))
            formData.append('egg', this.form.eggFile)
            // 发起上传请求
            var _self = this
            upload.post('/addproject', formData).then((response) => {
              _self.loading = false
              if (response.status === 'success') {
                _self.$router.push({ path: '/project/all' })
              }
            }).catch(function(error) {
              _self.loading = false
              console.log(error)
            })
          } else {
            if (!this.form.masterEggFile) {
              this.$message.error('请添加主egg文件! ')
              return false
            }
            if (!this.form.slaveEggFile) {
              this.$message.error('请添加从egg文件! ')
              return false
            }
            this.loading = true
            formData.append('is_msd', this.form.is_msd)
            formData.append('project_name', this.form.project_name)
            formData.append('project_alias', this.form.project_alias)
            formData.append('for_project', this.form.for_project)
            formData.append('applicant', this.form.applicant)
            formData.append('pro_type', this.project_type[this.form.pro_type])
            formData.append('developers', this.form.developers.join(','))
            formData.append('master_egg', this.form.masterEggFile)
            formData.append('slave_egg', this.form.slaveEggFile)
            _self = this
            upload.post('/addproject', formData).then((response) => {
              _self.loading = false
              if (response.status === 'success') {
                _self.$router.push({ path: '/project/all' })
              }
            }).catch(function(error) {
              _self.loading = false
              console.log(error)
            })
          }
        } else {
          console.log('err submit')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;

}

</style>
<style>
.el-upload-dragger{
  position: absolute;
  left: -50px;
  background-color:#f6f6f6;
  width: 220px !important;
  height: 100px !important;
  position: relative;

}
.el-icon-upload{
  display: none;
}
.el-upload__text{
  padding-top: 15% 
}
.el-upload__tip{
  font-weight: bolder;
  position: relative;
  left: -50px;
}
.el-upload-list__item-name{
  color:dodgerblue;
}
.el-upload-list{
  position: relative;
  left: -50px;
  width: 20%;
}
.el-upload-list__item{
  width: 200px;
}
#addprojectbtn{
  width: 150px;
}
</style>
