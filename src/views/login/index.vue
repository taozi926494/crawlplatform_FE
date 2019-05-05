<template>
  
 <div class="login-container" v-loading.body="loading" element-loading-text="Loading">
    <div id="login_box">
       <h3 class="title">爬虫调度管理平台</h3>
       <el-tabs v-model="activename">
        <el-tab-pane label="登录" name="login">
            <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
              <el-form-item prop="username">
                <span class="svg-container svg-container_login">
                  <svg-icon icon-class="user" />
                </span>
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
              </el-form-item>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password"></svg-icon>
                </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                  placeholder="password"></el-input>
                  <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                  登录
                </el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane>

        <el-tab-pane label="注册" name="regist">
          <el-form class="login-form" autoComplete="off" :model="registForm" :rules="registRules" ref="registForm" label-position="left">
            <el-form-item>
              <span class="svg-container svg-container_login">
                <svg-icon icon-class="user" />
              </span>
              <el-input name="username" type="text" v-model="registForm.username" autoComplete="off" placeholder="用户名" />
            </el-form-item>

            <el-form-item prop="email">
              <span class="svg-container svg-container_login">
                <svg-icon icon-class="email" />
              </span>
              <el-input name="email" type="email" v-model="registForm.email" autoComplete="off" placeholder="邮箱" />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password"></svg-icon>
              </span>
              <el-input name="password" :type="pwdType" @keyup.enter.native="handleRegist" v-model="registForm.password" autoComplete="off"
                placeholder="password"></el-input>
                <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleRegist">
                注册
              </el-button>
            </el-form-item>
          </el-form>
      </el-tab-pane>
     
    </el-tabs>
  </div>
 </div>
 
</template>

<script>
import { isvalidUsername, isvalidEmail } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('用户名不合法'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!isvalidEmail(value)) {
        callback(new Error('邮箱格式不合法'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      registForm: {
        username: null,
        email: null,
        password: null
      },
      activename: 'login',
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      registRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegist() {
      console.log('注册事件')
      this.$refs.registForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Regist', this.registForm).then((resolv) => {
            this.loading = false
            if (resolv === 'existed') {
              this.$message('该用户名已经被注册，请重新输入用户名')
            } else {
              this.$router.push({ path: '/' })
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scope>
$bg:#2d3a4b;
$light_gray:#888;

/* reset element-ui css */

#login_box {
  width: 600px;
  margin: 130px auto;
  padding: 20px;
  border: 1px solid #999;
  border-radius: 5px;
  background: #fff;
  h3 {
    margin-bottom: 10px;
    color: #555;
  }
  
  .el-input {
    display: inline-block;
    background: rgba(0, 0, 0, 0.1);
    height: 47px;
    width: 85%;
    input {
      border: 0px;
      -webkit-appearance: none;
      border: 1px solid #eee;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: $light_gray !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url('../../assets/bg.jpg');
  .login-form {
    left: 0;
    right: 0;
    width: 520px;
    padding: 0 10px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
