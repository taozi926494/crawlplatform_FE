<template>
  <div class="app-container"
    v-loading="loading"
    element-loading-text="上传项目中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)">
    <el-form ref="form" :model="form" :rules="formRules" label-width="200px">
      <el-form-item label="项目名称（英文）" prop="project_name">
        <el-input v-model="form.project_name"></el-input>
      </el-form-item>
      <el-form-item label="项目名称（中文）" prop="project_alias">
        <el-input v-model="form.project_alias"></el-input>
      </el-form-item>
      <el-form-item label="项目需要" prop="for_project">
        <el-input v-model="form.for_project"></el-input>
      </el-form-item>
      <el-form-item label="申请开发人" prop="applicant">
        <el-input v-model="form.applicant"></el-input>
      </el-form-item>
      
      <el-form-item label="项目开发人员" prop="developers">
        <el-checkbox-group v-model="form.developers">
          <el-checkbox label="谢红韬" name="谢红韬"></el-checkbox>
          <el-checkbox label="袁公萍" name="袁公萍"></el-checkbox>
          <el-checkbox label="陈林翠" name="陈林翠"></el-checkbox>
          <el-checkbox label="程培东" name="程培东"></el-checkbox>
          <el-checkbox label="杨泽华" name="杨泽华"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="主爬虫.egg文件">
        <input type="file" id="master_egg" name="master_egg">
        <div slot="tip" class="el-upload__tip">请使用 scrapyd-client 去生成egg文件, 生成语句为: scrapyd-deploy --build-egg output.egg</div>
      </el-form-item>

       <el-form-item label="从爬虫.egg文件">
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
      form: {
        project_name: null,
        project_alias: null,
        for_project: null,
        applicant: null,
        developers: []
      },
      formRules: {
        project_name: [{ required: true, trigger: 'blur', validator: validateProjName }],
        project_alias: [{ required: true, trigger: 'blur' }],
        for_project: [{ required: true, trigger: 'blur' }],
        applicant: [{ required: true, trigger: 'blur' }],
        developers: [{ required: true, trigger: 'blur' }],
        master_egg: [{ required: true, trigger: 'blur' }],
        slave_egg: [{ required: true, trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
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
          this.loading = true
          var formData = new FormData()
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
            console.log(formData.get('master_egg'))
            console.log(formData.get('slave_egg'))
            // 发起上传请求
          //   var _self = this
          //   upload.post('/addproject', formData).then((response) => {
          //     _self.loading = false
          //     if (response.status === 'success') {
          //       _self.$router.push({ path: '/project/all' })
          //     }
          //   }).catch(function(error) {
          //     _self.loading = false
          //     console.log(error)
          //   })
          // } else {
          //   this.loading = false
          //   this.$message({
          //     message: '请上传对应的.egg文件',
          //     type: 'warning'
          //   })
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
