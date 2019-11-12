<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" :rules="loginRules" class="login-form">

      <h4 class="title">{{title}}</h4>

      <el-form-item prop="username">
        <el-input v-model="form.username"  prefix-icon="iconfont myIcon-user" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" prefix-icon="iconfont myIcon-password" placeholder="密码" :type="passwordType"><i slot="suffix" class="iconfont myIcon-eye" @click="showPwd"></i></el-input>
      </el-form-item>

      <div class="login">
        <el-button type="primary" @click="login" class="login-btn" :loading="isloading">登录</el-button>
      </div>
      <p class="userinfo"><span>账号:</span>ruiwei88888@163.com<span>密码:</span>123456</p>
      
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request';
import { isvalidUsername } from "@/utils/validate"
export default {
  name: "login-page",
  data: function() {
      // 判断账号是否合法
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的账号'))
        } else {
          callback()
        }
      }
      //判断密码是否合法
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
    return {
      title:"vue+mongod+nodejs构建项目后台",
      loginUrl:"./login",
      form: {
        username: "",
        password: ""
      },
      loginRules:{
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      passwordType:"password",
      isloading:false
    };
  },
  methods: {
    // 登录
    login() {
        var $this = this;
        this.$refs.form.validate(valid => {
              if (valid) {
                this.isloading = true;
                request({
                  url:this.loginUrl,
                  method:"post",
                  data:this.form,
              })
              .then(response => {
                  //模拟异步请求时间
                  setTimeout(function(){
                    $this.isloading = false;
                    $this.$router.push({path:"/list"})
                  },3000)

              })
              .catch((error) => {
                  console.log(error)
              });
          } else {
            console.log("不请求")
          }
      })

        
    },
    // 切换密码框
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },

  },
  mounted: function() {

  }
};
</script>



<style lang="scss" rel="stylesheet/scss">

.login-container{
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/loginBg.jpg");
  background-repeat:no-repeat;
  background-size: cover;
  position: fixed;
  color: #fff;
    .title{
      font-size: 20px;
      margin: 0;
      padding: 40px 0;
    }
    .el-input__inner{
      padding-left: 40px;
    }
    .el-form-item{
      margin-bottom:40px;
    }
    .el-input{
      width: 84%;
      input{
        background: transparent;
        color: #fff;
        height: 50px;
      }
    }
    .login-form{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom:0;
      width: 620px;
      padding: 35px 50px 15px;
      margin: 120px auto;
  }
  .title,.login{
    text-align: center;
  }
  .login-btn{
    width: 150px;
  }
  .userinfo{
    text-align: center;
    font-style: italic;
    span{
      padding:0 10px;
    }
  }
} 

</style>


