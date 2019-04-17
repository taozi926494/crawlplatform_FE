<template>
  <div class="app-container">
   <el-card class="userinfo-card">
     <img :src="infoCardHeader" class="head-bg">
     <img :src="avatar" class="avatar">
     <div class="left">
       <p style="font-family: STLiti; font-size: 28px;">{{name}}</p>
       <p>Email: {{email}}</p>
       <div>
         角色：
         <el-tag v-for="(role, index) in roles" :key="index">
           {{role}}
         </el-tag>
       </div>
     </div>
   </el-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import infoCardHeader from '@/assets/infoCardHeader.jpg'
  export default {
    data() {
      return {
        infoCardHeader
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'roles',
        'email',
        'avatar'
      ])
    }
  }
</script>

<style lang="scss">
  .userinfo-card{
    position: relative;
    width: 340px;
    height: 360px;
    .el-card__body {
      padding: 0;
    }
    .head-bg {
      width:100%;
      height: 100px;
    }
    .avatar {
      width: 100px;
      height: 100px;
      border: 4px solid #fff;
      border-radius: 100px;
      position: absolute;
      top: 50px;
      left: 20px;
    }
    .left {
      padding-top: 50px;
      padding-left: 30px;
    }
    .el-tag {
      margin-left: 10px;
    }
  }
</style>
