<template>
  <div class="app-container"
    v-loading.loading="false"
    element-loading-text="正在添加开发人员..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
    >
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="序号" width="150" type='index'>
      </el-table-column>

      <el-table-column label="姓名"  width="350">
        <template slot-scope="scope">
          {{scope.row.developer_name}}
        </template>
      </el-table-column>

       <el-table-column label="性质"  width="350">
        <template slot-scope="scope">
          <span style="font-weight: 700;" v-if="Number(scope.row.developer_role) == 0">
            正式员工
          </span>
          <span style="color: #555555;" v-else-if="Number(scope.row.developer_role) == 1">
            实习生
          </span>
          <span style="color: #777777;" v-else-if="Number(scope.row.developer_role) == 2">
            借调人员
          </span>
          <span style="color: #999999;" v-else>
            其他
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label='状态' width="350">
        <template slot-scope="scope">
          <span style="font-weight: 700;" v-if="Number(scope.row.developer_status) == 0">
            在职
          </span>
          <span style="color: #999999;" v-else>
            离职
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <el-button size="mini"  @click="editdeveloperForm = scope.row; dialogVisible = true;">编辑</el-button>
            <el-button  slot="reference" size="mini" @click="delDevelopers(scope.row.developer_name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button id="add_server" type="primary" @click="dialogFormVisible = true">添加人员</el-button>



    <el-dialog title="添加人员" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="developerForm" :rules="machineRules" ref="developerForm">

          <el-form-item label="人员姓名" label-width="50" prop="developer_name">
            <el-input name="developer_name" v-model="developerForm.developer_name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="员工性质" label-width="50">
            <select v-model="developerForm.developer_role" name="developer_role">
              <option label="正式员工" value="0" selected="selected">正式员工</option>
              <option label="实习生" value="1">实习生</option>
              <option label="借调人员" value="2">借调人员</option>
              <option label="其他" value="3" >其他</option>
            </select>
          </el-form-item>

          <el-form-item label="员工状态" label-width="50">
            <select v-model="developerForm.developer_status" name="developer_status">
              <option label="在职" value="0">在职</option>
              <option label="离职" value="1" selected="selected">离职</option>
            </select>
          </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDevelopers">添加</el-button>
        </div>
    </el-dialog>


    <el-dialog title="开发人员信息编辑" :visible.sync="dialogVisible" width="600px">
      <el-form>
          <el-form-item label="姓名" label-width="50" prop="developer_name">
            <el-input name="developer_name" v-model="editdeveloperForm.developer_name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="员工性质" label-width="50">
            <select v-model="editdeveloperForm.developer_role" name="developer_role">
              <option label="正式员工" value="0" selected="selected">正式员工</option>
              <option label="实习生" value="1">实习生</option>
              <option label="借调人员" value="2">借调人员</option>
              <option label="其他" value="3" >其他</option>
            </select>
          </el-form-item>

          <el-form-item label="员工状态" label-width="50">
            <select v-model="editdeveloperForm.developer_status" name="developer_status">
              <option label="在职" value="0">在职</option>
              <option label="离职" value="1" selected="selected">离职</option>
            </select>
          </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit">提交</el-button>
        </div>
     </el-dialog>

  </div>
</template>

<style rel="stylesheet/scss" lang="scss">
  #add_server {
    margin-top: 20px;

  }
  
</style>

<script>
  //
  import { apiListDevelopers, apiAddDevelopers, apiDelDeveloper,apiEditDeveloper } from '@/api/developers'
  export default {
    data() {
      return {
        visible2: false,
        list: [],
        developerForm: {
          developer_name: null,
          developer_role: '0',
          developer_status: '0'
        },
        editdeveloperForm: {},
        machineRules: {
          developer_name: [{ required: true, trigger: 'blur' }]
        },
        loading: false,
        listLoading: false,
        dialogFormVisible: false,
        dialogVisible: false
      }
    },
    created() {
      this.listDevelopers()
    },
    methods: {
      // 获取开发人员列表
      async listDevelopers() {
        this.listLoading = true
        try {
          let res = await apiListDevelopers()
          this.list = res.data
        } catch (e) {
          this.$message.error('开发人员列表获取错误 ' + e)
        }
        this.listLoading = false;
      },

      // 添加函数
      async addDevelopers() {
       this.$refs.developerForm.validate(valid => {
        if (valid){
          this.loading = true
          try {
            let res = apiAddDevelopers(this.developerForm)
            this.listDevelopers()
          } catch (e) {
            this.$message.error('开发人员列表获取错误 ' + e)
          }
          this.loading = false
          this.dialogFormVisible = false
        }else{
          console.log('err submit')
          return false
        }     
       })
      },

      async delDevelopers(param) {
        this.listLoading = false
        try {
          let res = await this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).catch(() => {
             this.$message.error('已取消操作！ ')
        })
        if (res === "confirm"){
          const res = await apiDelDeveloper(param)
          this.listDevelopers()
        } 
        } catch (e) {
          this.$message.error('开发人员删除获取错误 ' + e)
        }
        this.listLoading = false;
      },


       // 编辑开发人员
      async submitEdit() {
        this.listLoading = true;
        try {
          const res = await apiEditDeveloper(this.editdeveloperForm)
          this.listDevelopers()
        } catch (e) {
          this.$message.error('编辑开发人员出错 ' + e)
        }
        this.listLoading = false;
        this.dialogVisible = false;
      },

    }
  }
</script>