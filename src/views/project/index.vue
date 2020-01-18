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

      <el-table-column label="项目开发者" width="170px">
        <template slot-scope="scope">
          <el-tag style="margin-left: 10px;" v-for="developer_name, index in scope.row.developers.split(',')" :key="index" type="success">{{developer_name}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="主题分类" width="160px">
        <template slot-scope="scope">
          {{ scope.row.project_cate }}
        </template>
      </el-table-column>

      <el-table-column  label='项目类型' width="155">
        <template slot-scope="scope">
          <span  v-if="Number(scope.row.is_msd) == 0">
            单机
          </span>
          <span  v-else>
            分布式
          </span>
        </template>
      </el-table-column>

      <el-table-column  label='发布时间' width="170">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作"  width="155">
        <template slot-scope="scope">
          <a style="color: #409EFF" :href="'#/project/info/' + scope.row.project_name">查看详情</a>
         
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :page-size="pageSzie"
        :total="total_num">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllProject } from '@/api/project'

export default {
  name: 'dashboard',
  data() {
    return {
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSzie: 8,
      total_num: null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCurrentChange(val) {
      this.pageIndex = val
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getAllProject(this.pageIndex, this.pageSzie).then(response => {
        this.total_num = response.data.total_num
        this.list = response.data.data
        console.log(this.list)
        this.listLoading = false
      })
    }
  }
}
</script>
</script>
<style lang="scss" scoped>
.pagination{
  margin-top: 50px;
}

</style>
