<template>
  <div class="container">
    <div class="filter">
      <span>项目负责人: </span>
      <el-select v-model="projectManager" placeholder="请选择">
        <el-option
          v-for="item in projectManagerOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
      <span class="lable">时间筛选: </span>
      <el-date-picker
        v-model="startDate"
        type="date"
        placeholder="起始日期">
      </el-date-picker>
      <span>-</span>
      <el-date-picker
        v-model="endDate"
        type="date"
        placeholder="终止日期">
      </el-date-picker>
      <el-button type="primary" class="submit" size="small" @click="fetchData">搜索</el-button>
    </div>
    <div class="content">
      <div class="item">
        <div class="item-content">
          <div class="title">
            <span>总项目数</span>
          </div>
          <div class="body">
            <div class="card_text">
              <b>{{ total_num }}</b>
              <span>个</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <div class="title">
            <span>数据量</span>
          </div>
          <div class="body">
            <div class="card_text">
              <b>{{ dataNum }}</b>
              <span>条</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <div class="title">
            <span>图像</span>
          </div>
          <div class="body">
            <div class="card_text">
              <b>{{ imageNum }}</b>
              <span>张</span>
            </div>
          </div>
          <div class="body">
            <div class="card_text">
              <b>{{ imageSize }}</b>
              <span>GB</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <div class="title">
            <span>视频</span>
          </div>
          <div class="body">
            <div class="card_text">
              <b>{{ videoNum }}</b>
              <span>个</span>
            </div>
          </div>
          <div class="body">
            <div class="card_text">
              <b>{{ videoSize }}</b>
              <span>GB</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <div class="title">
            <span>音频</span>
          </div>
          <div class="body">
            <div class="card_text">
              <b>{{ audioNum }}</b>
              <span>条</span>
            </div>
          </div>
          <div class="body">
            <div class="card_text">
              <b>{{ audioSize }}</b>
              <span>GB</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-content">
          <div class="title">
            <span>文件</span>
          </div>
          <div class="body">
            <div class="card_text">
              <b>{{ filesNum }}</b>
              <span>个</span>
            </div>
          </div>
          <div class="body">
            <div class="card_text">
              <b>{{ filesSize }}</b>
              <span>GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="itemdata">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="projectName"
          label="项目名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="存储地址"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dbName"
          label="数据库名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="tableName"
          label="数据表名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="image"
          label="图像(数量/容量KB)">
        </el-table-column>
        <el-table-column
          prop="video"
          label="视频(数量/容量KB)">
        </el-table-column>
        <el-table-column
          prop="audio"
          label="音频(数量/容量KB)">
        </el-table-column>
        <el-table-column
          prop="files"
          label="文件(数量/容量KB)">
        </el-table-column>
        <el-table-column
          prop="total"
          label="总量(数量)">
        </el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :total="total_num">
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss" >
.container{
  background-color: white;
  height: 100%;
  margin: 10px 10px 20px 10px;
  .filter{
    font-size: 14px;
    padding: 10px 10px 20px 10px;
    .lable{
      margin-left: 20px;
    }
    .submit{
      margin-left: 20px;
      height: 30px;
    }
    .el-input__inner{
      height: 30px;
      .el-input__icon {
        line-height: 30px;
      }
    }
   
  }
  .content{
     display: flex;
     flex-flow: wrap;
     margin: 10px 10px 20px 10px;
    .item{
      width: 14%;
      background-color: rgb(255, 255, 255);
      border-radius: 6px;
      padding: 20px;
      margin-bottom: 20px;
      margin-right: 35px;
      border-top: 3px solid #3080fe;
      .item-content{
        .title {
            font-size: 14px;
            font-weight: 28;
            span {
              position: relative;
             
            }
          }
        .body {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          .card_text{
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            b {
              font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
              font-size: 18px;
              color:rgb(70, 152, 245);
            }
            span {
              font-size: 12px;
              margin-left: 10px;
              color: black;
            }
          }
          }
      }
    }
  }
  .itemdata{
    height: 460px;
    border-bottom: solid 1px #e6e6e6;
    margin-bottom: 20px;

  }
  
}
  
</style>

<script>
import { apiListDevelopers } from '@/api/developers'
import { getCollectDataInfo } from '@/api/user'

export default {
  data() {
    return {
      projectManager: '所有人',
      projectManagerOptions: [],
      startDate: '2020-01-01',
      endDate: '',
      tableData: [],
      total_num: 0,
      pageIndex: 1,
      pageSize: 8,
      dataNum: 0,
      imageNum: 0,
      imageSize: 0,
      videoNum: 0,
      videoSize: 0,
      audioNum: 0,
      audioSize: 0,
      filesNum: 0,
      filesSize: 0

    }
  },
  created(){
    this.listDevelopers()
    this.getEndDate()
    this.fetchData()

  },
    methods:{
      getEndDate() {
        var d = new Date(); 
        this.endDate =  d.getFullYear() + '-' + d.getMonth()+1 + '-'+ d.getDate()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.fetchData()
      },
      async listDevelopers() {
        try {
          const res = await apiListDevelopers()
          const data_list = [{'value': '所有人', 'label': '所有人'}]
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].developer_status === '0'){
              data_list.push({
                'value': res.data[i].developer_name, 'label': res.data[i].developer_name
              })
            } 
          }
          this.projectManagerOptions = data_list
        } catch (e) {
          this.$message.error('开发人员列表获取错误 ' + e)
        }
      },
      dataFormat(dateStr){
        var d = new Date(dateStr); 
        let year =  d.getFullYear()
        let month = (d.getMonth() + 1)
        month = month > 10 ? month : '0' + month
        let dates = d.getDate()
        return year + '-' + month  + '-' + dates
      },
      kB2GBAndFormat(num){
        var value = (num / 1024 /1024).toFixed(2)
        if (value < 0.001) {
          return 0.0
        } else {
          return value
        }
        
      },
      computeDataNum(data){
        let num = 0
        let image_num = 0
        let image_size = 0
        let video_num = 0
        let video_size = 0
        let audio_num = 0
        let audio_size = 0
        let files_num = 0
        let files_size = 0
        for(let i = 0; i < data.length; i++){
          num += parseInt(data[i]['total'])
          let image = data[i]['image'].split('/')
          image_num += parseInt(image[0])
          image_size += parseInt(image[1])

          let video = data[i]['video'].split('/')
          video_num += parseInt(video[0])
          video_size += parseInt(video[1])

          let audio = data[i]['audio'].split('/')
          audio_num += parseInt(audio[0])
          audio_size += parseInt(audio[1])

          let files = data[i]['files'].split('/')
          files_num += parseInt(files[0])
          files_size += parseInt(files[1])
        }
        this.dataNum = num
        this.imageNum = image_num
        this.imageSize = this.kB2GBAndFormat(image_size)
        this.videoNum = video_num
        this.videoSize = this.kB2GBAndFormat(video_size)
        this.audioNum = audio_num
        this.audioSize = this.kB2GBAndFormat(audio_size)
        this.filesNum = files_num
        this.filesSize = this.kB2GBAndFormat(files_size)

      },
      fetchData() {
        var parms = {
          manager_person: this.projectManager,
          start_date: this.dataFormat(this.startDate),
          end_date: this.dataFormat(this.endDate),
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        getCollectDataInfo(parms).then(response => {
          this.tableData = response.data.data
          this.total_num = response.data.total_num
          this.computeDataNum(this.tableData)
        })
      }
    }
  }
</script>


