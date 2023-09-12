<template>
  <body id="poster">
  <el-form :model="loginForm" status-icon :rules="rules"  label-position="left" ref="ruleForm" label-width="0px" class="login-container">
    <h3 class="login_title">
      <b style="font-size: 200%">登录页面</b> &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="toRegister">点我注册</el-button>
    </h3>
    <el-form-item label="" prop="pass">
      <el-input placeholder="请输入用户名" type="text" v-model="loginForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="" prop="pass">
      <el-input placeholder="请输入密码" type="password" v-model="loginForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="login" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username:'',
        password: '',
      },
    }
  },
  methods: {
    toRegister(){
      this.$router.push({
        name:'register'
      })
    },

    login(){
      this.axios.post('http://192.168.2.148:9090/user_sys/login',this.loginForm).then((resp) => {
        if (!resp.data.success){
          this.$message.error('用户名或密码错误');
          return;
        }
        // this.$store.commit("getUsername",resp.data.data.username)
        window.localStorage.setItem("access-admin",JSON.stringify(resp.data))
        console.log("store",this.$store.state.user)
        this.$store.commit("setUser",resp)
        this.$message({
          message: '恭喜你，登陆成功!',
          type: 'success'
        });
        this.$router.replace({
          name:'Home',
        })
        location.replace('http://192.168.2.148:8080')
      },(error) => {
        this.$message.error('服务器异常!');
      })
    }
  },

}
</script>

<style scoped>

.login_title{
  margin: 0px auto 40px auto;
  text-align: center;
  color: black;
}
.login-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 500px;
  padding: 35px 35px 15px 35px;
  background-color: #ffffff;
  border: 1px solid #7fe7cd;
  box-shadow: 0 0 25px #42b983;
}
#poster{
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
</style>