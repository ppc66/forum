<template>
  <body id="poster">
  <el-form
      :model="ruleForm"
      status-icon :rules="rules"
      ref="ruleForm"
      label-width="0px"
      label-position="left"
      class="register-container">
    <h3 class="register_title">
      <b style="font-size: 200%">注册页面</b> &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="toLogin">点我登录</el-button>
    </h3>
    <el-form-item label="" prop="username">
      <el-input
          placeholder="请输入用户名"
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="" prop="email">
      <el-input
          placeholder="请输入邮箱"
          type="text"
          v-model="ruleForm.email"
          autocomplete="off"></el-input>
    </el-form-item>
    <el-button size="small" :disabled="!canClick" @click="sendCode">{{codeMsg}}</el-button>
    <el-form-item label="" prop="code">
      <el-input
          placeholder="请输入验证码,如果收到的话"
          type="text"
          v-model="ruleForm.code"
          autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
        label=""
        prop="password">
      <el-input
          placeholder="请输入密码"
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item

        label=""
        prop="checkPass">
      <el-input placeholder="确认密码" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      var regex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!regex.test(value)) {
        callback(new Error('邮箱格式不正确!'));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (this.ruleForm.username.trim().length >=16 || this.ruleForm.username.trim().length < 2 ) {
        callback(new Error('用户名长度要在2~16位之间'));
      } else {
        this.axios.get("http://192.168.2.148:9090/user_sys/isUserExist",{
          params:{
            username:this.ruleForm.username
          }
        }).then(
            resp => {
              if(!resp.data.data){
                callback()
              }else{
                callback(new Error("当前用户名已存在"));
                this.$message.error("当前用户名已存在 请重新输入！")
              }
            },
            error => {
              this.$message.error("服务器异常")
            }
        )
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        this.axios.get(`http://192.168.2.148:9090/user_sys/checkCode/${this.ruleForm.code}/${this.ruleForm.email}`).then(
            resp => {
              if(resp.data.data){
                callback()
              }else{
                callback(new Error("验证码不正确"));
                // this.$message.error("验证码错误！")
              }
            },
            error => {
              this.$message.error("服务器异常")
            }
        )
      }
    };

    return {
      ruleForm: {
        username:'',
        password: '',
        checkPass: '',
        email:'',
        code:''
      },
      rules: {
        username: [
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:2,max:16, message:'长度要在2~16之间',trigger:'blur'},
            {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          {validator: validateEmail , trigger: 'blur'}
        ],
        code:[{
          required:true,message:'请输入验证码',trigger:'blur'
        },
          {
            validator: validateCode ,trigger: 'blur'
          }]
      },
      codeMsg:'发送验证码',
      canClick:true,
      totalTime:120
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

        } else {
          return false;
        }
      });
        // this.$router.push({
        //   name:'Home'
        // })
      this.axios.post('http://192.168.2.148:9090/user_sys/register',this.ruleForm).then((resp) => {
        this.$message({
          message: '恭喜你，注册成功,请登录!',
          type: 'success'
        });
        this.$router.push({
          name:'login'
        })
        this.$store.commit("getUsername",resp.data.data.username)
        window.localStorage.setItem("access-admin",JSON.stringify(resp.data))
      },(error) => {
        this.$message.error("服务器异常")
      })
    },
    sendCode(){
      // console.log("发送验证码")
      var regex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (this.ruleForm.email == '' || !regex.test(this.ruleForm.email)){
        this.$message.warning("邮箱合适不正确")
        return
      }
      if (!this.canClick) return
      this.canClick = false
      this.codeMsg = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.codeMsg = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.codeMsg = '重新发送验证码'
          this.totalTime = 120
          this.canClick = true
        }
      },1000)


      this.axios.post(`http://192.168.2.148:9090/user_sys/sendCode/${this.ruleForm.email}`).then(
          resp => {
            if (!resp.data.success){
              this.$message.error(resp.data.errorMsg)
            }
            this.$message.success("发送成功!注意验证码五分钟内有效，请及时注册!")
          },
          error => {
            this.$message.error("服务器异常")
          }
      );
    }
    ,
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(){
      this.$router.push({
        name:"login"
      })
    }
  }
}
</script>

<style scoped>
.register_title{
  margin: 0px auto 40px auto;
  text-align: center;
  color: black;
}
#poster{
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.register-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 500px;
  padding: 35px 35px 15px 35px;
  background-color: #ffffff;
  border: 1px solid #7fe7cd;
  box-shadow: 0 0 25px #42b983;
}
</style>