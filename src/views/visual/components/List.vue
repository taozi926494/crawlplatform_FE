<template>
  <!-- <div class="list xMarquee" id="listMaquee"> -->
    <div class="list">
    <div class="xMarquee" id="listMaquee">
    <!-- <div> -->
      <el-row v-for="onedata, onekey in listdata" :key="onekey">
        <el-col :span="10" class="border-col">
          {{onedata.project_alias}} ( {{onedata.project_name}} )
        </el-col>
        <el-col :span="5" class="border-col">
          {{onedata.spider_alias}} ( {{onedata.spider_name}} )
        </el-col>
        <el-col :span="9" class="border-col">
          {{onedata.last_runtime}}&nbsp&nbsp&nbsp&nbsp{{onedata.status}}
        </el-col>
      </el-row>
    </div>

  
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scope>
  .list {
    color: #69C0E6;
    height: 98%;
    padding: 5px 0;
    position: relative;
    overflow: hidden;

    .xMarquee {
      color: #69C0E6;
      height: 100%;
      padding: 5px 0;
      position: relative;
      overflow: hidden;
    }

    .el-row {
      font-size: 12px;
      .el-col {
         height: 38px;
      }

      .border-col {
        padding-left: 15px;
        border-left: 1px solid #2F546E;
       }

    }

    
  }
</style>

<script>
  import xMarquee from './marquee.js'
  export default {
    name: 'List',
    props: {
      listdata: { type: Array }
    },
    mounted: function() {
      xMarquee('listMaquee', 'up')
    }
  }
</script>