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
      <el-table-column align="center" label='创建时间' width="155">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>
      <el-table-column label="开发人员">
        <template slot-scope="scope">
          <el-tag style="margin-left: 10px;" v-for="developer_name, index in scope.row.developers.split(',')" :key="index" type="success">{{developer_name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="需求项目" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.for_project}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请开发人" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.applicant}}
        </template>
      </el-table-column>
      <el-table-column label="运行服务器" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.run_on}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" align="center">
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
