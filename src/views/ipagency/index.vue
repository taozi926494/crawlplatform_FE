<template>
    <div id="Agency">
      <el-button type="primary" @click="addFormdialog = true" class="addBtn">添加代理<i class="el-icon-plus el-icon--right"></i></el-button>
      <div class="table">
        <el-table :data="datalists" element-loading-text="Loading" >
          <el-table-column  label='序号' width="50" type="index" align="center">
          </el-table-column>

          <el-table-column label="代理名称"  width="150" align="center">
            <template slot-scope="scope">
              {{ scope.row.ip_provider }}
            </template>
          </el-table-column>

          <el-table-column label="请求类型" width="140" align="center">
            <template slot-scope="scope">
              {{ scope.row.method }}
            </template>
          </el-table-column>

          <el-table-column label="最大IP量 (天)" width="140" align="center">
            <template slot-scope="scope">
              {{ scope.row.ip_num }}
            </template>
          </el-table-column>

          <el-table-column label="存活时间 (分钟)" width="140" align="center">
            <template slot-scope="scope">
              {{ scope.row.live_time }}
            </template>
          </el-table-column>

          <el-table-column label="IP带宽（个 / 次）" width="140" align="center">
            <template slot-scope="scope">
              {{ scope.row.obtain_num }}
            </template>
          </el-table-column>

          <el-table-column label="" width="30">
          </el-table-column>

          <el-table-column label="代理URL" width="450" >
            <template slot-scope="scope">
              {{ scope.row.conf_url }}
            </template>
          </el-table-column>
              
          <el-table-column label="请求参数" >
            <template slot-scope="scope">
              {{ scope.row.params.length > 0 ? scope.row.params:null  }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200" >
            <template slot-scope="scope">
              <el-button size="mini"  @click="edit(scope.row)">编辑</el-button>
              <el-button  slot="reference" size="mini" @click="delAgency(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
       
      </div>
      
      <el-dialog title="添加代理" :visible.sync="addFormdialog" width="800px" top="3%">
        <el-form :model="Form" ref="Form">

          <el-form-item label-width="50" prop="ip_provider">
            <el-col :span="4"> <span>代理名称</span></el-col>
            <el-col :span="13"><el-input name="ip_provider" v-model="Form.ip_provider" ></el-input></el-col>
          </el-form-item>

           <el-form-item label-width="50" prop="conf_url">
              <el-col :span="4"> <span>代理URL</span></el-col>
              <el-col :span="13"><el-input name="conf_url" v-model="Form.conf_url"></el-input></el-col>
          </el-form-item>

          <el-form-item label-width="50" prop="ip_num">
              <el-col :span="4"> <span>最大IP量&nbsp&nbsp&nbsp（天）</span></el-col>
              <el-col :span="13"><el-input name="ip_num" v-model="Form.ip_num"></el-input></el-col>
          </el-form-item>

          <el-form-item label-width="50" prop="live_time">
              <el-col :span="4"> <span>IP存活时长（分）</span></el-col>
              <el-col :span="13"><el-input name="live_time" v-model="Form.live_time"></el-input></el-col>
          </el-form-item>

          <el-form-item label-width="50" prop="obtain_num">
              <el-col :span="4"> <span>IP带宽（个 / 次）</span></el-col>
              <el-col :span="13"><el-input name="obtain_num" v-model="Form.obtain_num"></el-input></el-col>
          </el-form-item>

          <el-form-item label-width="50">
            <el-col :span="4"> <span>请求类型</span></el-col>
             <el-col :span="10">
              <el-select v-model="Form.method" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item
            v-for="(param, index) in Form.params"
            :key="param.key"
            :prop="'params.' + index + '.value'"
          > 
            <el-col :span="4" v-if="index === 0"><span>请求参数</span></el-col>
            <el-col :span="4" v-else><span>&nbsp</span></el-col>
            <el-col :span="4"><el-input v-model="param.name" placeholder="请输出参数名"></el-input></el-col>
            <el-col :span="1" class="blank"><span>-</span></el-col>
            <el-col :span="5"><el-input v-model="param.value" placeholder="请输出参数值"></el-input></el-col>
            <el-col :span="2" class="delbnt"> <el-button @click.prevent="removeDomain(Form, param)">删除</el-button></el-col>
          </el-form-item>

          <el-form-item>
            <el-button @click="addDomain(Form)">新增参数</el-button>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormdialog = false">取 消</el-button>
          <el-button type="primary" @click="addAgency">添加</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改信息" :visible.sync="editDialog" width="800px" top="3%">
        <el-form :model="editForm" ref="editForm">

          <el-form-item label-width="50" prop="ip_provider">
            <el-col :span="4"> <span>代理名称</span></el-col>
            <el-col :span="13"><el-input name="ip_provider" v-model="editForm.ip_provider" ></el-input></el-col>
          </el-form-item>

           <el-form-item label-width="50" prop="conf_url">
            <el-col :span="4"> <span>代理URL</span></el-col>
            <el-col :span="13"><el-input name="conf_url" v-model="editForm.conf_url"></el-input></el-col>
          </el-form-item>

          <el-form-item label-width="50" prop="ip_num">
            <el-col :span="4"> <span>最大IP量&nbsp&nbsp&nbsp（天）</span></el-col>
            <el-col :span="13"><el-input name="ip_num" v-model="editForm.ip_num"></el-input></el-col>
          </el-form-item>

          <el-form-item label-width="50" prop="live_time">
            <el-col :span="4"> <span>IP存活时长（分）</span></el-col>
            <el-col :span="13"><el-input name="live_time" v-model="editForm.live_time"></el-input></el-col>
          </el-form-item>

          <el-form-item label-width="50" prop="obtain_num">
            <el-col :span="4"> <span>IP带宽（个 / 次）</span></el-col>
            <el-col :span="13"><el-input name="obtain_num" v-model="editForm.obtain_num"></el-input></el-col>
          </el-form-item>

          <el-form-item label-width="50">
            <el-col :span="4"> <span>请求类型</span></el-col>
             <el-col :span="10">
              <el-select v-model="editForm.method" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item
            v-for="(param, index) in editForm.params"
            :key="param.key"
            :prop="'params.' + index + '.value'"
          > 
            <el-col :span="4" v-if="index === 0"><span>请求参数</span></el-col>
            <el-col :span="4" v-else><span>&nbsp</span></el-col>
            <el-col :span="4"><el-input v-model="param.name" placeholder="请输出参数名"></el-input></el-col>
            <el-col :span="1" class="blank"><span>-</span></el-col>
            <el-col :span="5"><el-input v-model="param.value" placeholder="请输出参数值"></el-input></el-col>
            <el-col :span="2" class="delbnt"> <el-button @click.prevent="removeDomain(editForm, param)">删除</el-button></el-col>
          </el-form-item>

          <el-form-item>
            <el-button @click="addDomain(editForm)">新增参数</el-button>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary" @click="editAgency">修改</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<style>
.blank {
  text-align: center;
}
.delbnt {
  margin-left: 3.5%; 
}
.addBtn {
  /* background-color:darkgrey;
  border: none; */
  margin: 0.5% 0% 0.5% 0.6%; 
}
.table {
  margin:  0.1% 0.6%; 
}

</style>

<script>
import { apiDelAgency, apiAddAgency, apiListAgency, apiEditAgency } from '@/api/agency'
import * as deepcopy from 'deepcopy'
export default {
  data() {
    return {
      addFormdialog: false,
      editDialog: false,
      options: [{ value: 'GET', label: 'GET' }, { value: 'POST', label: 'POST' }, { value: 'PUT', label: 'PUT' }],
      Form: {
        ip_provider: null,
        conf_url: null,
        method: 'GET',
        ip_num: null,
        obtain_num: null,
        live_time: null,
        params: []
      },
      editForm: {
        ip_provider: null,
        conf_url: null,
        method: null,
        ip_num: null,
        obtain_num: null,
        live_time: null,
        params: []
      },
      datalists: []
    }
  },
  mounted() {
    this.listAgency()
  },
  methods: {
    edit(params) {
      this.editDialog = true
      for (var key in params) {
        if (key === 'params') {
          const len = params.params.length
          var temp = []
          for (var i = 0; i < len; i++) {
            for (var key_sub in params.params[i]) {
              temp.push({ 'name': key_sub, 'value': params.params[i][key_sub] })
            }
          }
          this.editForm[key] = temp
        } else {
          this.editForm[key] = params[key]
        }
      }
    },
    // 删除表单参数子选项
    removeDomain(selfForm, item) {
      var index = selfForm.params.indexOf(item)
      if (index !== -1) {
        selfForm.params.splice(index, 1)
      }
    },
    // 添加表单参数子选项
    addDomain(selfForm) {
      selfForm.params.push({
        name: '',
        value: ''
      })
    },

    // 代理商
    async listAgency() {
      try {
        // 向后端发起请求, 请求完成且成功后
        const res = await apiListAgency()
        this.datalists = res.data
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 添加代理商
    async addAgency() {
      try {
        // 向后端发起请求, 请求完成且成功后
        const submitForm = deepcopy(this.Form)
        submitForm.live_time *= 60
        const res = await apiAddAgency(submitForm)
        if (res.code === 200) {
          // 设置对话框为不可见状态
          this.addFormdialog = false
          // 刷新列表
          this.listAgency()
        } else {
          this.addFormdialog = false
          this.$message.error('添加错误，请重试！')
        }
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 编辑
    async editAgency() {
      // 向后端发起请求, 请求完成且成功
      const submitForm = deepcopy(this.editForm)
      submitForm.live_time *= 60
      const res = await apiEditAgency(submitForm)
      if (res.code === 200) {
        // 设置对话框为不可见状态
        this.editDialog = false
        // 刷新列表
        this.listAgency()
      } else {
        this.editDialog = false
        // this.$message.error('错误，请重试！')
      }
    },
    // 删除代理商
    async delAgency(param) {
      try {
        const res = await this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(() => {
          this.$message.error('已取消操作！ ')
        })
        if (res === 'confirm') {
          const res = await apiDelAgency(param)
          if (res.code === 200) {
            this.listAgency()
          } else {
            this.$message.error('删除错误')
          }
        }
      } catch (e) {
        this.$message.error('删除获取错误 ' + e)
      }
    }
  }
}
</script>
