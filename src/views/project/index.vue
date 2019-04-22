<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      
      <el-table-column label="序号" width="50" type='index' align="center">
      </el-table-column>

      <el-table-column label="项目名称"  >
        <template slot-scope="scope">
            {{scope.row.project_name}} ( {{scope.row.project_alias}} )
        </template>
      </el-table-column>
     
      <el-table-column label="服务项目"  width="200px" >
        <template slot-scope="scope">
          <span>{{scope.row.for_project}}</span>
        </template>
      </el-table-column>

      <el-table-column label="项目申请者" width="200" >
        <template slot-scope="scope">
          {{scope.row.applicant}}
        </template>
      </el-table-column>

      <el-table-column label="项目开发者" width="250px">
        <template slot-scope="scope">
          <el-tag style="margin-left: 10px;" v-for="developer_name, index in scope.row.developers.split(',')" :key="index" type="success">{{developer_name}}</el-tag>
        </template>
      </el-table-column>

       <el-table-column  label='发布时间' width="200">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>

      <el-table-column  label='蜘蛛类型' width="155">
        <template slot-scope="scope">
          <span  v-if="Number(scope.row.is_msd) == 0">
            单机
          </span>
          <span  v-else>
            分布式
          </span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="操作"  width="155">
        <template slot-scope="scope">
          <a style="color: #409EFF" :href="'#/project/info/' + scope.row.project_name">查看详情</a>
         
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getAllProject } from '@/api/project'

export default {
  name: 'dashboard',
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAllProject().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
