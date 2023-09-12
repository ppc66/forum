<template>

  <el-card style="width: 300px">
    <h3>个人信息页面 待开发</h3>
    <br/><br/><br/>
    <div style="padding:40px;width:600px;">

<!--  用户头像上传    -->
      <div style="text-align: center;margin: 10px 0px">
        <el-upload
            class="avatar-uploader"
            action="http://192.168.2.148:9090/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
        >
          <img v-if="infoForm.avatarUrl" :src="infoForm.avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon">+</i>
        </el-upload>
      </div>


      <el-form :label-position="right" label-width="80px" :model="infoForm">
        <el-form-item label="">
          <el-input type="hidden" v-model="infoForm.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input disabled v-model="infoForm.username"></el-input>
        </el-form-item>
<!--        <el-form-item label="邮箱">-->
<!--          <el-input v-model="infoForm.type"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="原始密码">-->
<!--          <el-input type="password" v-model="formLabelAlign.type"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="新密码">-->
<!--          <el-input type="password" v-model="formLabelAlign.type"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="再次输入">-->
<!--          <el-input type="password" show-password="false" v-model="formLabelAlign.type"></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <el-button type="primary" style="margin-left: 250px" @click="updateInfo">保存</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Info",
data() {
  return {
    infoForm: {
      id:'',
      username: '', // todo 这里要验证一下的
      // email: '',
      avatarUrl:'',
    },
  }
},
  mounted() {
    this.infoForm.username = this.$route.query.username
    this.infoForm.avatarUrl = this.$route.query.avatarUrl
    this.infoForm.id = this.$route.query.id
  },
  methods: {
    handleAvatarSuccess(res) {
      //res就是文件路径
      // this.imageUrl = URL.createObjectURL(file.raw);

      this.infoForm.avatarUrl = res.data

    },
/*    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      return isJPG && isLt10M;
    },*/
    updateInfo(){
      var user = JSON.parse(localStorage.getItem("access-admin"));
      if (user == null){
        this.$message.error("请登录后在进行后续操作!")
        return
      }
      this.axios.put("http://192.168.2.148:9090/user_sys/updateInfo",this.infoForm,
          {
            headers: {
              authorization: user.data.token
            }
          }
      ).then(
          (resp) => {
            this.$message.success("保存成功!")

            let item = JSON.parse(window.localStorage.getItem("access-admin"));
            item.data.avatarUrl = this.infoForm.avatarUrl;
            window.localStorage.setItem("access-admin",JSON.stringify(item));
            this.$store.commit("setUser",resp)
          }
      )
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>