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

    <el-form-item label="蜘蛛类型" prop="is_msd">
      <el-radio-group v-model="form.is_msd">
        <el-radio :label="1">分布式</el-radio>
        <el-radio :label="0">单机</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item v-if="form.is_msd=='0'" label="爬虫文件包">
      <input type="file" id="egg" name="egg">
      <div slot="tip" class="el-upload__tip"></div>
    </el-form-item>

    <el-form-item v-if="form.is_msd=='1'" label="主爬虫文件包">
      <input type="file" id="master_egg" name="master_egg">
      <div slot="tip" class="el-upload__tip">请使用 scrapyd-client 去生成egg文件, 生成语句为: scrapyd-deploy --build-egg output.egg</div>
    </el-form-item>

      <el-form-item   v-if="form.is_msd=='1'" label="从爬虫文件包">
      <input type="file" id="slave_egg" name="slave_egg">
      <div slot="tip" class="el-upload__tip">请使用 scrapyd-client 去生成egg文件, 生成语句为: scrapyd-deploy --build-egg output.egg</div>
    </el-form-item>

    <p>scrapyd-deploy -p 项目名称 --build-egg=自我命名项目.egg</p>

  </el-form>
    <el-button @click="addProject">添加</el-button>
  </div>
</template>

<script>
import upload from '@/utils/upload'
import { isvalidProjName } from '@/utils/validate'
import { apiListDevelopers } from '@/api/developers'

export default {
  data() {
    const validateProjName = (rule, value, callback) => {
      if (!isvalidProjName(value)) {
        callback(new Error('必须是英文加数字的组合'))
      } else {
        callback()
      }
    }

    return {
      developer_list: [],
      form: {
        project_name: null,
        project_alias: null,
        for_project: null,
        applicant: null,
        is_msd: 1,
        developers: []
      },
      formRules: {
        project_name: [{ required: true, trigger: 'blur', validator: validateProjName }],
        project_alias: [{ required: true, trigger: 'blur' }],
        for_project: [{ required: true, trigger: 'blur' }],
        applicant: [{ required: true, trigger: 'blur' }],
        developers: [{ required: true, trigger: 'blur' }],
        master_egg: [{ required: true, trigger: 'blur' }],
        slave_egg: [{ required: true, trigger: 'blur' }],
        egg: [{ required: true, trigger: 'blur' }]
      },
      loading: false
    }
  },

  // 拉取参数
  created() {
    this.listDevelopers()
  },

  methods: {
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
    validEgg: function(eggfile) {
      if (eggfile === undefined) {
        return false
      }
      var index = eggfile.name.lastIndexOf('.')
      var ext = eggfile.name.substr(index)
      if (ext !== '.egg') {
        return false
      }
      return true
    },
    addProject: function(event) {
      event.preventDefault()
      this.$refs.form.validate(valid => {
        if (valid) {
          // 单机爬虫格式
          var formData = new FormData()
          if (this.form.is_msd === 0) {
            this.loading = true
            formData.append('is_msd', this.form.is_msd)
            formData.append('project_name', this.form.project_name)
            formData.append('project_alias', this.form.project_alias)
            formData.append('for_project', this.form.for_project)
            formData.append('applicant', this.form.applicant)
            formData.append('developers', this.form.developers.join(','))
            var egg = document.getElementById('egg').files[0]
            if (this.validEgg(egg)) {
              formData.append('egg', egg)
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
              this.loading = false
              this.$message({
                message: '请上传对应的.egg文件',
                type: 'warning'
              })
            }
          } else {
            this.loading = true
            formData.append('is_msd', this.form.is_msd)
            formData.append('project_name', this.form.project_name)
            formData.append('project_alias', this.form.project_alias)
            formData.append('for_project', this.form.for_project)
            formData.append('applicant', this.form.applicant)
            formData.append('developers', this.form.developers.join(','))
            var master_egg = document.getElementById('master_egg').files[0]
            var slave_egg = document.getElementById('slave_egg').files[0]
            if (this.validEgg(master_egg) && this.validEgg(slave_egg)) {
              formData.append('master_egg', master_egg)
              formData.append('slave_egg', slave_egg)
              // 发起上传请求
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
            } else {
              this.loading = false
              this.$message({
                message: '请上传对应的.egg文件',
                type: 'warning'
              })
            }
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
